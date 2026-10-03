import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import { Slot } from 'radix-ui';

// Material buttons: full shape, label-large type and an opacity state layer.
// Only transform and opacity transition, so theme changes never animate color.
const buttonVariants = cva(
  "relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-medium whitespace-nowrap type-label-lg outline-none transition-transform duration-150 ease-spatial-fast select-none before:pointer-events-none before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-150 before:ease-effects-fast hover:before:opacity-8 focus-visible:focus-ring focus-visible:before:opacity-10 active:scale-[0.97] active:before:opacity-10 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5",
  {
    variants: {
      variant: {
        filled: 'bg-primary text-on-primary',
        tonal: 'bg-secondary-container text-on-secondary-container',
        outlined: 'border border-outline-variant text-on-surface-variant',
        // Material assist chip used as a link: outlined, small corners.
        chip: 'rounded-sm border border-outline-variant text-on-surface',
        text: 'text-primary',
        standard: 'text-on-surface-variant',
        // Connected button group item; selection is aria-pressed or aria-current.
        // The focus ring is inset so the track and neighbours never cover it.
        segment:
          'text-on-surface-variant [--focus-ring-offset:-3px] aria-pressed:bg-secondary-container aria-pressed:text-on-secondary-container aria-[current=page]:bg-secondary-container aria-[current=page]:font-semibold aria-[current=page]:text-on-secondary-container',
      },
      // An icon is first when no visible element precedes it: the label's text
      // node never counts, and neither does a link's visually hidden new-tab
      // notice before its ↗.
      size: {
        default: 'h-10 px-5 has-[>svg:not(:not(.sr-only)~*)]:ps-4 has-[>svg:last-child]:pe-4',
        sm: 'h-8 gap-1.5 px-3.5 has-[>svg:not(:not(.sr-only)~*)]:ps-3 has-[>svg:last-child]:pe-3',
        icon: 'size-10',
        'icon-sm': "size-8 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'filled',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot='button'
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
