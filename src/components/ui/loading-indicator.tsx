import type { CSSProperties } from 'react';

import { outlinePolygon } from '@/lib/outlines';

// The Material 3 Expressive loading indicator, contained: a figure inside a
// round container morphs through the Expressive set while the whole turns.
// The animate-loading-indicator keyframes in styles.css step through these
// outlines in order; the first is also the resting figure.
const outlines: CSSProperties = {
  '--loading-outline-0': outlinePolygon('softBurst'),
  '--loading-outline-1': outlinePolygon('cookie9'),
  '--loading-outline-2': outlinePolygon('pentagon'),
  '--loading-outline-3': outlinePolygon('pill'),
  '--loading-outline-4': outlinePolygon('sunny'),
  '--loading-outline-5': outlinePolygon('cookie4'),
  '--loading-outline-6': outlinePolygon('oval'),
};

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
