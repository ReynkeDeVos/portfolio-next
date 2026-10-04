import type { CSSProperties } from 'react';

import { outlinePolygon } from '@/lib/outlines';
import type { OutlineName } from '@/lib/outlines';

// The Material 3 Expressive loading indicator, contained: a figure inside a
// round container morphs through the Expressive set while the whole turns.
// The animate-loading-indicator keyframes in styles.css step through the
// outlines in this order; the first is also the resting figure.
const sequence: OutlineName[] = [
  'softBurst',
  'cookie9',
  'pentagon',
  'pill',
  'sunny',
  'cookie4',
  'oval',
];

const outlines: CSSProperties = {};

for (const [index, name] of sequence.entries()) {
  outlines[`--loading-outline-${index}`] = outlinePolygon(name);
}

function LoadingIndicator({ label }: { label: string }) {
  // A native indeterminate progress element tells assistive tech; the
  // morphing figure is what everyone else sees.
  return (
    <span className='bg-primary-container grid size-12 place-items-center rounded-full'>
      <progress aria-label={label} className='sr-only' />
      <span
        aria-hidden
        style={outlines}
        className='bg-on-primary-container animate-loading-indicator size-9.5 [clip-path:var(--loading-outline-0)]'
      />
    </span>
  );
}

export { LoadingIndicator };
