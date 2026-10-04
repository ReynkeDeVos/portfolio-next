import { useRef } from 'react';
import type { CSSProperties } from 'react';

import { useSectionNavigation } from '@/components/section-navigation';
import { contentFor } from '@/content/content';
import { cookiePath, lobes } from '@/lib/cookie';
import { defaultLocale } from '@/lib/locale';
import type { Locale } from '@/lib/locale';
import { startViewTransition } from '@/lib/view-transition';
import { uiText } from '@/ui-text/ui-text';

import { morphFrames } from './morph-shape';
import { PortraitViewer } from './viewer';

const stepDegrees = 360 / lobes;

const clipId = 'portrait-cookie';

// The cookie in bounding-box units, so one path fits every portrait size.
// Peaks touch the inscribed circle. The path is centred on the origin so CSS
// can rotate and scale it in place; a 0.5px translate (bounding-box units)
// moves it back to the centre.
const clipPath = cookiePath(0.5);

// The hint runs along the lower inner rim on a sage band, in a
// 100-unit box. Its middle baseline sits on a radius-38 arc, so text
// clears the lobe valleys (44) while its 1.6em band reaches past them and
// takes the scalloped edge as its outer contour. textLength fixes the line
// at its target width, so the band fits the words, emoji included.
const hintRadius = 38;

const hintArc = `M${50 - hintRadius} 50A${hintRadius} ${hintRadius} 0 0 0 ${50 + hintRadius} 50`;

const hintEm = { en: 5.2, de: 6 } satisfies Record<Locale, number>;

// One dash, centred on the arc, as long as the hint's text.
function hintBand(em: number) {
  const arcLength = Math.PI * hintRadius;

  return {
    dash: `${em}em ${arcLength.toFixed(2)}`,
    offset: `calc(${em / 2}em - ${(arcLength / 2).toFixed(2)}px)`,
  };
}

// The photo is the same file in every Locale.
const fullPortraitSrc = contentFor(defaultLocale).profile.fullPortrait.src;

let fullPortraitWarmed = false;

// Starts the larger photo's download at the first sign of interest; the HTTP
// cache keeps it for the Portrait viewer in every Locale.
function warmFullPortrait() {
  if (!fullPortraitWarmed) {
    fullPortraitWarmed = true;
    new Image().src = fullPortraitSrc;
  }
}

// Opening and closing run as a same-document view transition: a plain surface
// leaves the frame as its cookie, turns one lobe while its lobes smooth out
// into the photo panel's corners, and gathers back into the cookie on closing.
// The thumbnail never moves and the large photo fades in place at its final
// size. With reduced motion the Portrait viewer cross-fades in place instead,
// without travel. The transition types scope the morph names and keyframes,
// in portrait.css, to this one moment; the shape's clip follows the morph's
// own timing from there.
async function morphPortrait(open: boolean, viewer: HTMLDialogElement, update: () => void) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startViewTransition(update, ['morph-fade']);

    return;
  }

  // The panel is measured while it is open: after opening, before closing.
  let panel = viewer.getBoundingClientRect();

  const transition = startViewTransition(() => {
    update();

    if (open) {
      panel = viewer.getBoundingClientRect();
    }
  }, ['morph', open ? 'morph-open' : 'morph-close']);

  try {
    await transition?.ready;
  } catch {
    return;
  }

  const travel = document
    .getAnimations()
    .find(
      ({ effect }) =>
        effect instanceof KeyframeEffect &&
        effect.pseudoElement === '::view-transition-group(morph)',
    );

  if (!transition || !travel?.effect) {
    return;
  }

  const { duration, delay } = travel.effect.getTiming();
  // getComputedStyle always reports the corner radius in px.
  // oxlint-disable-next-line unicorn/prefer-number-coercion
  const radius = Number.parseFloat(getComputedStyle(viewer).borderTopLeftRadius);
  const frames = morphFrames(panel.width, panel.height, radius);

  document.documentElement.animate(open ? frames : frames.toReversed(), {
    duration,
    delay,
    easing: getComputedStyle(document.documentElement).getPropertyValue('--ease-emphasized'),
    fill: 'both',
    pseudoElement: '::view-transition-image-pair(morph)',
  });
}

// The frame turns one lobe per Section the visitor picks, the way the tabs
// went. Only the clip shape rotates and grows; the photo itself never
// transforms while animating, so the browser repaints it at full resolution
// instead of resampling a cached layer.
// The thumbnail opens the owner's selected larger portrait. Grown lobe tips,
// overshoot included, reach about 4% past the box (6px at the largest size),
// so the focus ring sits 8px out and never touches the frame.
function Portrait({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { turns } = useSectionNavigation();
  const angle = turns * stepDegrees;
  const rotation: CSSProperties = { '--portrait-angle': `${angle}deg` };
  const { portrait } = contentFor(locale).profile;
  const viewer = useRef<HTMLDialogElement>(null);
  const band = hintBand(hintEm[locale]);

  return (
    <>
      <button
        type='button'
        aria-haspopup='dialog'
        aria-label={`${portrait.alt}: ${t.photoOpen}`}
        title={t.photoOpen}
        onPointerEnter={warmFullPortrait}
        onPointerDown={warmFullPortrait}
        onFocus={warmFullPortrait}
        onClick={() => {
          if (viewer.current) {
            void morphPortrait(true, viewer.current, () => {
              viewer.current?.showModal();
            });
          }
        }}
        className='group relative size-24 shrink-0 cursor-pointer rounded-full [--focus-ring-offset:8px] sm:size-32 lg:size-28 xl:size-36'
        style={rotation}
      >
        {/* An empty stand-in marks where the morph starts, so the thumbnail
            itself stays in the page instead of being lifted into the
            transition. It carries the name only while the viewer is closed. */}
        <span aria-hidden className='view-transition-morph-origin absolute inset-0' />
        <svg aria-hidden className='absolute size-0'>
          <clipPath id={clipId} clipPathUnits='objectBoundingBox'>
            <path
              d={clipPath}
              className='ease-spatial [translate:0.5px_0.5px] rotate-(--portrait-angle) transition-transform duration-500 group-hover:scale-[1.08] group-focus-visible:scale-[1.08]'
            />
          </clipPath>
        </svg>
        {/* On hover or focus the frame grows to 1.08 while the photo holds
            its size. The 1.09 overscan keeps the grown lobe tips, spring
            overshoot included, on the image. */}
        <span className='bg-primary-container relative block size-full [clip-path:url(#portrait-cookie)]'>
          <img
            src={portrait.src}
            alt=''
            width={portrait.width}
            height={portrait.height}
            fetchPriority='high'
            className='size-full scale-[1.09] object-cover'
          />
          {/* The hint peeks up from the rim on the zoom's curve and drops
              back quickly. It grows with the frame, so it reads as a
              label inside it. Without hover it peeks once by itself. */}
          <svg
            aria-hidden
            viewBox='0 0 100 100'
            className='portrait-hint-peek ease-effects-fast group-hover:ease-spatial group-focus-visible:ease-spatial type-portrait-hint transition-portrait-hint absolute inset-0 size-full translate-y-[15%] font-medium opacity-0 duration-150 group-hover:translate-y-0 group-hover:scale-[1.08] group-hover:opacity-100 group-hover:duration-500 group-focus-visible:translate-y-0 group-focus-visible:scale-[1.08] group-focus-visible:opacity-100 group-focus-visible:duration-500'
          >
            <path
              id='portrait-hint'
              d={hintArc}
              fill='none'
              strokeWidth='1.6em'
              strokeLinecap='round'
              className='stroke-primary-container portrait-hint-band'
              style={{ '--hint-dash': band.dash, '--hint-offset': band.offset }}
            />
            <text
              textLength={`${hintEm[locale]}em`}
              lengthAdjust='spacing'
              textAnchor='middle'
              dominantBaseline='middle'
              className='fill-on-primary-container'
            >
              <textPath href='#portrait-hint' startOffset='50%'>
                {t.photoHint}
              </textPath>
            </text>
          </svg>
        </span>
      </button>
      <PortraitViewer
        ref={viewer}
        locale={locale}
        onDismiss={() => {
          if (viewer.current) {
            void morphPortrait(false, viewer.current, () => {
              viewer.current?.close();
            });
          }
        }}
      />
    </>
  );
}

export { Portrait };
