import { cn } from 'cn';
import { useState } from 'react';
import type { CSSProperties } from 'react';
import { flushSync } from 'react-dom';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { contentFor } from '@/content/content';
import { defaultLocale } from '@/lib/locale';
import type { Locale } from '@/lib/locale';

import { copy } from './copy';

const lobes = 12;

const stepDegrees = 360 / lobes;

// A twelve-lobe "cookie" from the Expressive shape set, in bounding-box units
// so one path fits every portrait size. Peaks touch the inscribed circle.
// The path is centred on the origin so CSS can rotate and scale it in place;
// a 0.5px translate (bounding-box units) moves it back to the centre.
function cookiePath() {
  const points = lobes * 16;
  let path = '';

  for (let index = 0; index < points; index += 1) {
    const angle = (index / points) * Math.PI * 2;
    const radius = 0.47 + 0.03 * Math.cos(lobes * angle);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    path += `${index === 0 ? 'M' : 'L'}${x.toFixed(4)} ${y.toFixed(4)}`;
  }

  return `${path}Z`;
}

const clipId = 'portrait-cookie';

const clipPath = cookiePath();

// The hint runs along the lower inner rim on a sage band, in a
// 100-unit box. The action line's middle baseline sits on a radius-38 arc,
// so text clears the lobe valleys (44) while its 1.6em band reaches past
// them and takes the scalloped edge as its outer contour. textLength fixes
// the line at its target width, so the band fits the words, emoji included.
const hintLines = [{ key: 'action', id: 'portrait-hint-action', radius: 38 }] as const;

const hintEm = {
  en: { action: 5.2 },
  de: { action: 6 },
} satisfies Record<Locale, Record<(typeof hintLines)[number]['key'], number>>;

function hintArc(radius: number) {
  return `M${50 - radius} 50A${radius} ${radius} 0 0 0 ${50 + radius} 50`;
}

// One dash, centred on the arc, as long as the line's text.
function hintBand(radius: number, em: number) {
  const arcLength = Math.PI * radius;

  return {
    dash: `${em}em ${arcLength.toFixed(2)}`,
    offset: `calc(${em / 2}em - ${(arcLength / 2).toFixed(2)}px)`,
  };
}

// Keep the preloaded Image alive across route remounts when switching languages,
// so the browser can reuse its image data when the dialog opens again.
let fullPortraitImage: HTMLImageElement | null = null;

// The photo is the same file in every Locale.
const fullPortraitSrc = contentFor(defaultLocale).profile.fullPortrait.src;

function warmFullPortrait() {
  if (fullPortraitImage) {
    return;
  }

  fullPortraitImage = new Image();
  fullPortraitImage.decoding = 'async';
  fullPortraitImage.addEventListener(
    'error',
    () => {
      fullPortraitImage = null;
    },
    { once: true },
  );

  fullPortraitImage.src = fullPortraitSrc;
}

// Opening and closing run as a same-document view transition: a plain surface
// grows out of the frame into the photo panel and shrinks back into it. The
// thumbnail never moves and the large photo fades in place at its final size.
// With reduced motion the viewer cross-fades in place instead, without travel.
// The transition types scope the morph names and keyframes to this one moment.
function morphPortrait(open: boolean, commit: () => void) {
  const reduceMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const morphTypes = ['morph', open ? 'morph-open' : 'morph-close'];
  const types = reduceMotion ? ['morph-fade'] : morphTypes;

  document.startViewTransition({
    update: () => {
      flushSync(commit);
    },
    types,
  });
}

// `ticks` advances the frame one lobe per section change. Only the clip shape
// rotates and grows; the photo itself never transforms while animating, so the
// browser repaints it at full resolution instead of resampling a cached layer.
// The thumbnail opens the owner's selected larger portrait. Grown lobe tips,
// overshoot included, reach about 4% past the box (6px at the largest size),
// so the focus ring sits 8px out and never touches the frame.
function Portrait({ locale, ticks }: { locale: Locale; ticks: number }) {
  const t = copy[locale];
  const angle = ticks * stepDegrees;
  const rotation: CSSProperties = { '--portrait-angle': `${angle}deg` };
  const { portrait, fullPortrait } = contentFor(locale).profile;
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        morphPortrait(next, () => {
          setOpen(next);
        });
      }}
    >
      <DialogTrigger asChild>
        <button
          type='button'
          aria-label={`${portrait.alt}: ${t.photoOpen}`}
          title={t.photoOpen}
          onPointerEnter={warmFullPortrait}
          onPointerDown={warmFullPortrait}
          onFocus={warmFullPortrait}
          className='group focus-visible:focus-ring relative size-24 shrink-0 cursor-pointer rounded-full outline-none [--focus-ring-offset:8px] sm:size-32 lg:size-28 xl:size-36'
          style={rotation}
        >
          {/* An empty stand-in marks where the morph starts, so the thumbnail
              itself stays in the page instead of being lifted into the
              transition. Only one end carries the name at a time. */}
          <span aria-hidden className={cn('absolute inset-0', !open && 'view-transition-morph')} />
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
                label inside it. */}
            <svg
              aria-hidden
              viewBox='0 0 100 100'
              className='ease-effects-fast group-hover:ease-spatial group-focus-visible:ease-spatial type-portrait-hint transition-portrait-hint absolute inset-0 size-full translate-y-[15%] font-medium opacity-0 duration-150 group-hover:translate-y-0 group-hover:scale-[1.08] group-hover:opacity-100 group-hover:duration-500 group-focus-visible:translate-y-0 group-focus-visible:scale-[1.08] group-focus-visible:opacity-100 group-focus-visible:duration-500'
            >
              {hintLines.map((line) => {
                const band = hintBand(line.radius, hintEm[locale][line.key]);

                return (
                  <path
                    key={line.id}
                    id={line.id}
                    d={hintArc(line.radius)}
                    fill='none'
                    strokeWidth='1.6em'
                    strokeLinecap='round'
                    className='stroke-primary-container portrait-hint-band'
                    style={{ '--hint-dash': band.dash, '--hint-offset': band.offset }}
                  />
                );
              })}
              {hintLines.map((line) => (
                <text
                  key={line.id}
                  textLength={`${hintEm[locale][line.key]}em`}
                  lengthAdjust='spacing'
                  textAnchor='middle'
                  dominantBaseline='middle'
                  className='fill-on-primary-container'
                >
                  <textPath href={`#${line.id}`} startOffset='50%'>
                    {t.photoHint[line.key]}
                  </textPath>
                </text>
              ))}
            </svg>
          </span>
        </button>
      </DialogTrigger>

      {/* Content mounts only while open, so the large image loads on demand. */}
      <DialogContent closeLabel={t.photoClose} aria-describedby={undefined} morph>
        <DialogTitle className='sr-only'>{portrait.alt}</DialogTitle>
        {/* Both viewport axes bound the photo without another display crop.
            The height budget covers viewport margin, padding and the close row. */}
        <img
          src={fullPortrait.src}
          alt={fullPortrait.alt}
          width={fullPortrait.width}
          height={fullPortrait.height}
          decoding='async'
          className='bg-surface-container view-transition-morph-content rounded-inherit mx-auto h-auto w-[min(calc(100vw-5rem),calc((100dvh-10rem)*2/3),960px)] object-contain'
        />
      </DialogContent>
    </Dialog>
  );
}

export { Portrait };
