import { cn } from 'cn';
import { useState } from 'react';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { segmentPillSlot } from '@/lib/theme';

const segmentGroupClass =
  'bg-surface-container-high relative isolate grid auto-cols-fr grid-flow-col gap-0.5 overflow-hidden rounded-full p-1';

const surfaceVariants = {
  default: '',
  // Floating phone toolbar: vibrant primary container with presence motion.
  floating:
    'bg-primary-container duration-spatial-fast ease-spatial-fast data-[shown=false]:ease-emphasized transition-presence data-[shown=false]:duration-spatial-fast-exit h-12 origin-bottom data-[shown=false]:pointer-events-none data-[shown=false]:translate-y-4 data-[shown=false]:scale-90 data-[shown=false]:opacity-0',
} as const;

// The selected pill of an equal-column group. It sits in the first grid cell
// and reaches the selected one with its edges, stretching on the Section
// tabs' spatial spring; the group clips the overshoot. A freshly mounted pill
// starts from `from`.
function SegmentPill({ index, from = index }: { index: number; from?: number }) {
  const [last, setLast] = useState({
    index,
    direction: index < from ? 'backward' : 'forward',
  });

  if (index !== last.index) {
    setLast({ index, direction: index > last.index ? 'forward' : 'backward' });
  }

  const position: CSSProperties = {
    '--segment-index': String(index),
    '--segment-from': String(from),
  };

  return (
    <span
      aria-hidden
      data-slot={segmentPillSlot}
      data-direction={last.direction}
      style={position}
      className='bg-secondary-container ease-spatial-fast duration-pill stretch-pill absolute inset-y-0 right-[calc(var(--segment-index)*(-100%-0.125rem))] left-[calc(var(--segment-index)*(100%+0.125rem))] -z-10 rounded-full [grid-area:1/1/2/2] starting:right-[calc(var(--segment-from)*(-100%-0.125rem))] starting:left-[calc(var(--segment-from)*(100%+0.125rem))]'
    />
  );
}

// Equal-column segmented control surface with its stretching selection pill.
function SegmentedGroup({
  as = 'fieldset',
  surface = 'default',
  index,
  from,
  label,
  slot,
  shown,
  className,
  children,
}: {
  as?: 'nav' | 'fieldset';
  surface?: keyof typeof surfaceVariants;
  index: number;
  from?: number;
  label: string;
  slot?: string;
  shown?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const Container = as;
  const hidden = shown === false ? true : undefined;

  return (
    <Container
      aria-label={label}
      aria-hidden={hidden}
      inert={hidden}
      data-slot={slot}
      data-shown={shown}
      className={cn(segmentGroupClass, surfaceVariants[surface], className)}
    >
      <SegmentPill index={index} from={from} />
      {children}
    </Container>
  );
}

function SegmentedOption({
  asChild = false,
  vibrant = false,
  icon = false,
  pressed,
  current,
  label,
  title,
  themeOption,
  onClick,
  children,
}: {
  asChild?: boolean;
  vibrant?: boolean;
  icon?: boolean;
  pressed?: boolean;
  current?: 'page' | 'true';
  label?: string;
  title?: string;
  themeOption?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) {
  return (
    <Button
      type={asChild ? undefined : 'button'}
      asChild={asChild}
      variant={vibrant ? 'segment-vibrant' : 'segment'}
      size={icon ? 'icon-segment' : 'segment'}
      aria-label={label}
      title={title}
      aria-pressed={pressed}
      aria-current={current}
      data-theme-option={themeOption}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export { SegmentedGroup, SegmentedOption };
