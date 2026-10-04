// The wrapper forwards the remaining props to the Radix primitive.
// oxlint-disable react/jsx-props-no-spreading

import { cn } from 'cn';
import { Slot } from 'radix-ui';

// Material buttons: label-large type, an opacity state layer and the
// Expressive press: the shape morphs from round towards square while pressed
// and springs back on release. Each size sets its own resting corner, half its
// height, because a numeric radius morphs smoothly where a pill's never-ending
// one would only snap. Only the corners and opacity transition, so theme
// changes never animate color. The ::after keeps a 48px touch target however
// small the visible shape.
const base =
  "relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap type-label-lg transition-[border-radius] duration-spatial-fast ease-spatial-fast select-none active:rounded-sm active:duration-150 before:pointer-events-none before:absolute before:inset-0 before:rounded-inherit before:bg-current before:opacity-0 before:transition-opacity before:duration-150 before:ease-effects-fast hover:before:opacity-8 focus-visible:before:opacity-10 active:before:opacity-10 after:absolute after:inset-x-0 after:top-1/2 after:h-12 after:min-h-full after:-translate-y-1/2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5";

const variants = {
  filled: 'bg-primary text-on-primary',
  tonal: 'bg-secondary-container text-on-secondary-container',
  // Material assist chip used as a link: outlined, small corners, which
  // tighten further while pressed.
  chip: 'rounded-sm border border-outline-variant text-on-surface active:rounded-xs',
  standard: 'text-on-surface-variant',
  // Connected button group item; selection is aria-pressed or aria-current,
  // over the group's sliding pill. The focus ring is inset so the track and
  // neighbours never cover it.
  segment:
    'text-on-surface-variant [--focus-ring-offset:-3px] aria-pressed:text-on-secondary-container aria-[current=page]:font-semibold aria-[current=page]:text-on-secondary-container',
};

// An icon is first when no visible element precedes it: the label's text
// node never counts, and neither does a link's visually hidden new-tab
// notice before its ↗. Segments grow to Material's small size for coarse
// pointers, so their track reaches the 48px touch target.
const sizes = {
  default:
    'h-10 rounded-lg-inc px-5 has-[>svg:not(:not(.sr-only)~*)]:ps-4 has-[>svg:last-child]:pe-4',
  sm: 'h-8 gap-1.5 rounded-lg px-3.5 has-[>svg:not(:not(.sr-only)~*)]:ps-3 has-[>svg:last-child]:pe-3',
  icon: 'size-10 rounded-lg-inc',
  'icon-sm': "size-8 rounded-lg [&_svg:not([class*='size-'])]:size-4",
  segment: 'h-8 rounded-lg px-3.5 pointer-coarse:h-10 pointer-coarse:rounded-lg-inc pointer-coarse:px-3',
  'icon-segment':
    "size-8 rounded-lg pointer-coarse:size-10 pointer-coarse:rounded-lg-inc [&_svg:not([class*='size-'])]:size-4",
};

function Button({
  className,
  variant = 'filled',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : 'button';

  // The variant follows the size, so a variant's own corners win.
  return <Comp className={cn(base, sizes[size], variants[variant], className)} {...props} />;
}

export { Button };
