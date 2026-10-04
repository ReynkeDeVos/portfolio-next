import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

import { outlinePolygon } from '@/lib/outlines';
import type { OutlineName } from '@/lib/outlines';

// The Material 3 Expressive loading indicator, contained: a figure inside a
// round container morphs through the Expressive set while the whole turns.
const sequence: OutlineName[] = [
  'softBurst',
  'cookie9',
  'pentagon',
  'pill',
  'sunny',
  'cookie4',
  'oval',
];

const polygons = sequence.map((name) => outlinePolygon(name));

// Each morph springs on the default spatial curve and gives way to the next.
const morphMs = 650;

const turnMs = 4666;

function LoadingIndicator({ label }: { label: string }) {
  const figure = useRef<HTMLSpanElement>(null);

  // The preference can change while the photo loads, so the animations
  // follow it rather than reading it once.
  useEffect(() => {
    const element = figure.current;
    const still = matchMedia('(prefers-reduced-motion: reduce)');
    const easing = getComputedStyle(document.documentElement).getPropertyValue('--ease-spatial');
    const frames = [...polygons, polygons[0]].map((clipPath) => ({ clipPath, easing }));
    let animations: Animation[] = [];

    const stop = () => {
      for (const animation of animations) {
        animation.cancel();
      }

      animations = [];
    };

    const follow = () => {
      stop();

      if (element && !still.matches) {
        animations = [
          element.animate(frames, { duration: morphMs * sequence.length, iterations: Infinity }),
          element.animate([{ rotate: '0turn' }, { rotate: '1turn' }], {
            duration: turnMs,
            iterations: Infinity,
          }),
        ];
      }
    };

    follow();
    still.addEventListener('change', follow);

    return () => {
      still.removeEventListener('change', follow);
      stop();
    };
  }, []);

  const resting: CSSProperties = { '--loading-outline': polygons[0] };

  // A native indeterminate progress element tells assistive tech; the
  // morphing figure is what everyone else sees.
  return (
    <span className='bg-primary-container grid size-12 place-items-center rounded-full'>
      <progress aria-label={label} className='sr-only' />
      <span
        ref={figure}
        aria-hidden
        style={resting}
        className='bg-on-primary-container size-9.5 [clip-path:var(--loading-outline)]'
      />
    </span>
  );
}

export { LoadingIndicator };
