// The wrappers forward the remaining props to the Radix primitives.
// oxlint-disable react/jsx-props-no-spreading

import { Tabs as TabsPrimitive } from 'radix-ui';

function Tabs(props: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className='flex flex-col gap-4' {...props} />;
}

// A connected segmented track. The consumer sets --tab-index and --tab-count,
// and data-direction to the way the selection went; the selected pill follows
// with a fast spatial curve after the panel has already switched. Its leading
// edge sets off first and the trailing edge catches up, so the pill stretches
// on its way and settles back into shape. Equal columns keep the indicator
// measurement-free. The track clips the overshoot, so triggers use an inset
// ring.
function TabsList({ children, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className='group/tabs-list bg-tab-track relative isolate grid h-12 scroll-mt-4 auto-cols-fr grid-flow-col overflow-hidden rounded-full p-1'
      {...props}
    >
      <span
        aria-hidden
        className='bg-secondary-container ease-spatial-fast duration-spatial-fast stretch-pill absolute inset-y-1 right-[calc(0.25rem+(var(--tab-count,1)-1-var(--tab-index,0))*(100%-0.5rem)/var(--tab-count,1))] left-[calc(0.25rem+var(--tab-index,0)*(100%-0.5rem)/var(--tab-count,1))] -z-10 rounded-full group-data-[animate=false]/tabs-list:transition-none'
      />
      {children}
    </TabsPrimitive.List>
  );
}

// Triggers morph like buttons when pressed and reach over the track's padding,
// so each one is a 48px touch target.
function TabsTrigger(props: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className='type-label-lg text-on-surface-variant before:ease-effects-fast data-[state=active]:text-on-secondary-container rounded-lg-inc duration-spatial-fast ease-spatial-fast before:rounded-inherit relative inline-flex min-w-0 cursor-pointer items-center justify-center px-2 font-medium transition-[border-radius] select-none [--focus-ring-offset:-3px] before:pointer-events-none before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-150 after:absolute after:-inset-y-1 after:inset-x-0 hover:before:opacity-8 focus-visible:before:opacity-10 active:rounded-sm active:duration-150 data-[state=active]:font-semibold data-[state=active]:hover:before:opacity-0'
      {...props}
    />
  );
}

function TabsContent(props: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className='rounded-xl-inc [--focus-ring-offset:4px] data-[state=inactive]:hidden'
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
