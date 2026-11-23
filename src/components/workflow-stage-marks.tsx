import { cn } from 'cn';
import { Compass, Rocket, ShieldCheck, Terminal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';

import { outlinePolygon } from '@/lib/outlines';
import type { OutlineName } from '@/lib/outlines';

type StageMark = { outline: OutlineName; Icon: LucideIcon };

const defaultStageMark: StageMark = { outline: 'pentagon', Icon: Compass };

const stageMarks = new Map<string, StageMark>([
  ['plan', defaultStageMark],
  ['build', { outline: 'cookie4', Icon: Terminal }],
  ['review', { outline: 'softBurst', Icon: ShieldCheck }],
  ['ship', { outline: 'sunny', Icon: Rocket }],
]);

const badgeFillByEmphasis = {
  quiet: 'bg-surface-container-highest scale-90',
  primary: 'bg-primary-container',
  review: 'bg-tertiary-container rotate-12',
} as const;

const iconByEmphasis = {
  quiet: 'text-on-surface-variant',
  primary: 'text-on-primary-container',
  review: 'text-on-tertiary-container',
} as const;

const specRows = [
  { className: 'workflow-spec-q1', y: 3, x2: 26 },
  { className: 'workflow-spec-q2', y: 8, x2: 19 },
  { className: 'workflow-spec-q3', y: 13, x2: 23 },
] as const;

// Only the clipped Expressive outline turns and scales on emphasis changes;
// the icon itself stays upright, matching the Portrait frame's motion grammar.
function StageBadge({ id, emphasis }: { id: string; emphasis: keyof typeof badgeFillByEmphasis }) {
  const { outline, Icon } = stageMarks.get(id) ?? defaultStageMark;
  const clip: CSSProperties = { '--stage-outline': outlinePolygon(outline) };

  return (
    <span aria-hidden className='relative z-10 grid size-10 shrink-0 place-items-center'>
      <span
        style={clip}
        className={cn(
          'ease-spatial absolute inset-0 transition-transform duration-300 [clip-path:var(--stage-outline)]',
          badgeFillByEmphasis[emphasis],
        )}
      />
      <Icon className={cn('relative size-4.5', iconByEmphasis[emphasis])} />
    </span>
  );
}

// Slow-paced inline glyphs for high-attention quality gates: Spec-driven fills
// three checklist lines as open questions resolve, while Review gate pulls
// three model perspectives together into one verdict. Rendered in inactive
// rows too (without animating) so wrapping never shifts height on narrow screens.
function GateGlyph({ id, active }: { id: string; active: boolean }) {
  if (id !== 'plan' && id !== 'review') {
    return null;
  }

  return (
    <span aria-hidden className='text-tertiary inline-flex items-center ps-0.5'>
      {id === 'plan' ? (
        <svg
          viewBox='0 0 28 16'
          data-active={active || undefined}
          className='workflow-gate-glyph workflow-spec-glyph'
        >
          {specRows.map(({ className, y, x2 }) => (
            <g key={className} className={className}>
              <circle className='workflow-spec-ring' cx='3' cy={y} r='1.5' />
              <line className='workflow-spec-track' x1='8.5' y1={y} x2={x2} y2={y} />
              <circle className='workflow-spec-fill' cx='3' cy={y} r='2' />
              <line className='workflow-spec-ink' x1='8.5' y1={y} x2={x2} y2={y} />
            </g>
          ))}
        </svg>
      ) : (
        <svg
          viewBox='0 0 22 16'
          data-active={active || undefined}
          className='workflow-gate-glyph workflow-council-glyph'
        >
          <circle className='workflow-council-view workflow-council-v1' cx='11' cy='2.9' r='2.25' />
          <circle
            className='workflow-council-view workflow-council-v2'
            cx='5.8'
            cy='11.9'
            r='2.25'
          />
          <circle
            className='workflow-council-view workflow-council-v3'
            cx='16.2'
            cy='11.9'
            r='2.25'
          />
          <circle className='workflow-council-verdict' cx='11' cy='8.9' r='3.6' />
        </svg>
      )}
    </span>
  );
}

export { GateGlyph, StageBadge };
