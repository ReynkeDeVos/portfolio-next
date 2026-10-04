import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

import { shapePolygon } from '@/lib/shapes';
import type { ShapeName } from '@/lib/shapes';

// The Material 3 Expressive loading indicator, contained: a shape inside a
// round container morphs through the Expressive set while the whole turns.
const sequence: ShapeName[] = [
  'softBurst',
  'cookie9',
  'pentagon',
  'pill',
  'sunny',
  'cookie4',
  'oval',
];

const polygons = sequence.map((name) => shapePolygon(name));

// Each morph springs on the default spatial curve and gives way to the next.
const morphMs = 650;

const turnMs = 4666;

function LoadingIndicator({ label }: { label: string }) {
  const shape = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = shape.current;

    if (!element || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const easing = getComputedStyle(document.documentElement).getPropertyValue('--ease-spatial');
    const frames = [...polygons, polygons[0]].map((clipPath) => ({ clipPath, easing }));

    const animations = [
      element.animate(frames, { duration: morphMs * sequence.length, iterations: Infinity }),
      element.animate([{ rotate: '0turn' }, { rotate: '1turn' }], {
        duration: turnMs,
        iterations: Infinity,
      }),
    ];

    return () => {
      for (const animation of animations) {
        animation.cancel();
      }
    };
  }, []);

  const resting: CSSProperties = { '--loading-shape': polygons[0] };

  return (
    <span
      role='progressbar'
      aria-label={label}
      className='bg-primary-container grid size-12 place-items-center rounded-full'
    >
      <span
        ref={shape}
        style={resting}
        className='bg-on-primary-container size-9.5 [clip-path:var(--loading-shape)]'
      />
    </span>
  );
}

export { LoadingIndicator };
