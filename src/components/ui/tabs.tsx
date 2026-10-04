import { Tabs as TabsPrimitive } from 'radix-ui';

function Tabs(props: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className='flex flex-col gap-4' {...props} />;
}

// A connected segmented track. The consumer sets --tab-index and --tab-count;
// the selected pill follows with a fast spatial curve after the panel has
// already switched. Equal columns keep the indicator measurement-free.
// The track clips the indicator's overshoot, so triggers use an inset ring.
function TabsList({ children, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className='group/tabs-list bg-tab-track relative isolate grid h-12 auto-cols-fr grid-flow-col overflow-hidden rounded-full p-1'
      {...props}
    >
      <span
        aria-hidden
        className='bg-secondary-container ease-spatial-fast absolute inset-y-1 inset-s-1 -z-10 w-[calc((100%-0.5rem)/var(--tab-count,1))] translate-x-[calc(var(--tab-index,0)*100%)] rounded-full transition-transform duration-350 group-data-[animate=false]/tabs-list:transition-none'
      />
      {children}
    </TabsPrimitive.List>
  );
}

function TabsTrigger(props: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className='type-label-lg text-on-surface-variant before:ease-effects-fast data-[state=active]:text-on-secondary-container relative inline-flex min-w-0 cursor-pointer items-center justify-center rounded-full px-2 font-medium select-none [--focus-ring-offset:-3px] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-8 focus-visible:before:opacity-10 data-[state=active]:font-semibold data-[state=active]:hover:before:opacity-0'
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
