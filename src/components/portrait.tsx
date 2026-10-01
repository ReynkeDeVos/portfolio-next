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
          <span className='bg-primary-container ease-spatial block size-full [rotate:var(--portrait-angle)] transition-transform duration-500 [clip-path:url(#portrait-cookie)] group-hover:scale-[1.08] group-focus-visible:scale-[1.08]'>
            <img
              src={portfolio.portrait.src}
              alt=''
              width={portfolio.portrait.width}
              height={portfolio.portrait.height}
              fetchPriority='high'
              className='ease-spatial size-full scale-[1.09] [rotate:calc(-1*var(--portrait-angle))] object-cover transition-transform duration-500 group-hover:scale-[1.0093] group-focus-visible:scale-[1.0093]'
            />
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
