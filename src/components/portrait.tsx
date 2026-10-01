import type { CSSProperties } from 'react';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { portfolio } from '@/content/portfolio';

import { copy } from './copy';
import type { Locale } from './copy';

const lobes = 12;
const stepDegrees = 360 / lobes;

// A twelve-lobe "cookie" from the Expressive shape set, in bounding-box units
// so one path fits every portrait size. Peaks touch the inscribed circle.
function cookiePath() {
  const points = lobes * 16;
  let path = '';
  for (let index = 0; index < points; index += 1) {
    const angle = (index / points) * Math.PI * 2;
    const radius = 0.47 + 0.03 * Math.cos(lobes * angle);
    const x = 0.5 + radius * Math.cos(angle);
    const y = 0.5 + radius * Math.sin(angle);
    path += `${index === 0 ? 'M' : 'L'}${x.toFixed(4)} ${y.toFixed(4)}`;
  }
  return `${path}Z`;
}

const clipId = 'portrait-cookie';
const clipPath = cookiePath();

// The hint runs in two lines along the lower inner rim on sage bands, in a
// 100-unit box. The action line's middle baseline sits on a radius-38 arc,
// so text clears the lobe valleys (44) while its 1.6em band reaches past
// them and takes the scalloped edge as its outer contour. The question sits
// 12 units further in on a shorter band; the two bands overlap at every
// font size into one stepped label. textLength fixes each line at its
// target width, so the bands fit the words, emoji included.
const hintLines = [
  { key: 'question', id: 'portrait-hint-question', radius: 26 },
  { key: 'action', id: 'portrait-hint-action', radius: 38 },
] as const;
const hintEm = {
  en: { question: 3.3, action: 5.2 },
  de: { question: 3.4, action: 6 },
} satisfies Record<Locale, Record<(typeof hintLines)[number]['key'], number>>;

function hintArc(radius: number) {
  return `M${50 - radius} 50A${radius} ${radius} 0 0 0 ${50 + radius} 50`;
}

// One dash, centred on the arc, as long as the line's text.
function hintBand(radius: number, em: number) {
  const arcLength = Math.PI * radius;
  return {
    strokeDasharray: `${em}em ${arcLength.toFixed(2)}`,
    strokeDashoffset: `calc(${em / 2}em - ${(arcLength / 2).toFixed(2)}px)`,
  } as CSSProperties;
}

// Fetch the full photo once when the trigger is hovered or focused, so the
// dialog usually opens with a cached image. Opening never waits for it.
let fullPortraitWarmed = false;
function warmFullPortrait() {
  if (fullPortraitWarmed) {
    return;
  }
  fullPortraitWarmed = true;
  const image = new Image();
  image.decoding = 'async';
  image.src = portfolio.fullPortrait.src;
}

// `ticks` advances the frame one lobe per section change. The photo
// counter-rotates on the same curve, so only the scalloped edge moves.
// The thumbnail opens the owner's selected larger portrait. Grown lobe tips,
// overshoot included, reach about 4% past the box (6px at the largest size),
// so the focus ring sits 8px out and never touches the frame.
function Portrait({ locale, ticks }: { locale: Locale; ticks: number }) {
  const t = copy[locale];
  const angle = ticks * stepDegrees;
  const rotation = { '--portrait-angle': `${angle}deg` } as CSSProperties;
  const { fullPortrait } = portfolio;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type='button'
          aria-label={`${portfolio.portrait.alt[locale]}: ${t.photoOpen}`}
          title={t.photoOpen}
          onPointerEnter={warmFullPortrait}
          onFocus={warmFullPortrait}
          className='group focus-visible:focus-ring relative size-24 shrink-0 cursor-pointer rounded-full outline-none [--focus-ring-offset:8px] sm:size-32 lg:size-36'
          style={rotation}
        >
          <svg aria-hidden className='absolute size-0'>
            <clipPath id={clipId} clipPathUnits='objectBoundingBox'>
              <path d={clipPath} />
            </clipPath>
          </svg>
          {/* On hover or focus the frame grows to 1.08 while the photo drops
              from 1.09 to 1.09 / 1.08, so its on-screen size holds. The 1.09
              overscan keeps the grown lobe tips, spring overshoot included,
              on the image. Same curve keeps drift under a pixel. */}
          <span className='bg-primary-container ease-spatial block size-full [rotate:var(--portrait-angle)] transition-[rotate,scale] duration-500 [clip-path:url(#portrait-cookie)] group-hover:scale-[1.08] group-focus-visible:scale-[1.08]'>
            <span className='ease-spatial relative block size-full [rotate:calc(-1*var(--portrait-angle))] transition-[rotate] duration-500'>
              <img
                src={portfolio.portrait.src}
                alt=''
                width={portfolio.portrait.width}
                height={portfolio.portrait.height}
                fetchPriority='high'
                className='ease-spatial size-full scale-[1.09] object-cover transition-[scale] duration-500 group-hover:scale-[1.0093] group-focus-visible:scale-[1.0093]'
              />
              {/* The hint peeks up from the rim on the zoom's curve and drops
                  back quickly. Font sizes land near 11px, then 13px, once the
                  frame has grown, so it reads as a label inside the frame.
                  The 12-unit line gap stays between 1.1em and 1.4em. */}
              <svg
                aria-hidden
                viewBox='0 0 100 100'
                className='ease-effects-fast group-hover:ease-spatial group-focus-visible:ease-spatial absolute inset-0 size-full translate-y-[15%] text-[10.6px] font-medium opacity-0 transition-[opacity,translate] duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-hover:duration-500 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:duration-500 sm:text-[9.4px] lg:text-[8.6px]'
              >
                {hintLines.map((line) => (
                  <path
                    key={line.id}
                    id={line.id}
                    d={hintArc(line.radius)}
                    fill='none'
                    strokeWidth='1.6em'
                    strokeLinecap='round'
                    className='stroke-primary-container'
                    style={hintBand(line.radius, hintEm[locale][line.key])}
                  />
                ))}
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
          </span>
        </button>
      </DialogTrigger>

      {/* Content mounts only while open, so the large image loads on demand. */}
      <DialogContent closeLabel={t.photoClose} aria-describedby={undefined}>
        <DialogTitle className='sr-only'>{t.photoTitle}</DialogTitle>
        {/* Both viewport axes bound the photo without another display crop.
            The height budget covers viewport margin, padding and the close row. */}
        <img
          src={fullPortrait.src}
          alt={fullPortrait.alt[locale]}
          width={fullPortrait.width}
          height={fullPortrait.height}
          decoding='async'
          className='bg-surface-container mx-auto h-auto w-[min(calc(100vw-5rem),calc((100dvh-10rem)*2/3),960px)] rounded-lg object-contain'
        />
      </DialogContent>
    </Dialog>
  );
}

export { Portrait };
