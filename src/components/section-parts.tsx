import { cn } from 'cn';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

// Every panel shares one grammar: a connected list of large items first,
// then titled subsections of smaller cards, compact lists or a table, then
// an optional profile link. Panels separate these blocks with gap-10.

// Hover state layer and whole-item focus ring for items whose title link
// stretches over them. It rises above its closely spaced neighbours on focus.
const linkedItem =
  'group before:bg-on-surface before:ease-effects-fast before:rounded-inherit has-[a:focus-visible]:focus-ring before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-8 has-[a:focus-visible]:z-10';

// Connected Expressive list: large outer corners, small inner ones.
function ItemList({ ordered, children }: { ordered?: boolean; children: ReactNode }) {
  const List = ordered ? 'ol' : 'ul';

  return <List className='flex flex-col gap-1'>{children}</List>;
}

function Item({ linked, children }: { linked?: boolean; children: ReactNode }) {
  return (
    <li
      className={cn(
        'bg-surface-group first:rounded-t-xl-inc last:rounded-b-xl-inc relative rounded-xs p-5 sm:px-6',
        linked && linkedItem,
      )}
    >
      {children}
    </li>
  );
}

// Title, accent line and an optional end slot, the head of every list item.
// A text end slot may wrap below the title; an icon stays beside it.
function ItemHeader({
  title,
  meta,
  end,
  wrap,
}: {
  title: ReactNode;
  meta?: ReactNode;
  end?: ReactNode;
  wrap?: boolean;
}) {
  return (
    <div className={cn('flex items-start justify-between gap-x-4 gap-y-1', wrap && 'flex-wrap')}>
      <div className='min-w-0'>
        <h3 className='type-title-lg text-on-surface font-semibold'>{title}</h3>
        {meta ? <p className='type-label-lg text-tertiary mt-0.5 font-medium'>{meta}</p> : null}
      </div>
      {end}
    </div>
  );
}

function ItemText({ children }: { children: ReactNode }) {
  return <p className='type-body-lg text-on-surface mt-3 max-w-[64ch]'>{children}</p>;
}

function Subsection({
  id,
  heading,
  aside,
  children,
}: {
  id: string;
  heading: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className='flex flex-col gap-3'>
      <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1'>
        <h3 id={id} className='type-headline-sm text-on-surface font-semibold'>
          {heading}
        </h3>
        {aside}
      </div>
      {children}
    </section>
  );
}

// A last card without a partner spans both columns instead of leaving a hole.
function CardGrid({ children }: { children: ReactNode }) {
  return (
    <ul className='grid gap-3 md:grid-cols-2 md:[&>li:last-child:nth-child(odd)]:col-span-2'>
      {children}
    </ul>
  );
}

function Card({ linked, children }: { linked?: boolean; children: ReactNode }) {
  return (
    <li
      className={cn(
        'rounded-lg-inc bg-surface-card relative flex flex-col p-5',
        linked && linkedItem,
      )}
    >
      {children}
    </li>
  );
}

function CardHeader({ title, meta, end }: { title: ReactNode; meta?: ReactNode; end?: ReactNode }) {
  return (
    <div className='flex items-start justify-between gap-3'>
      <div className='min-w-0'>
        <h4 className='type-title-md text-on-surface font-semibold'>{title}</h4>
        {meta ? <p className='type-label-md text-on-surface-variant font-medium'>{meta}</p> : null}
      </div>
      {end}
    </div>
  );
}

// Dense rows inside one card surface, for inventories that would otherwise
// become a wall of identical cards. Label left, content right from md.
function CompactList({ children }: { children: ReactNode }) {
  return (
    <ul className='rounded-lg-inc bg-surface-card divide-outline-variant divide-y px-5'>
      {children}
    </ul>
  );
}

function CompactRow({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <li className='flex flex-col gap-2 py-4 md:grid md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-6'>
      <h4 className='type-title-sm text-on-surface font-semibold md:pt-0.5'>{label}</h4>
      {children}
    </li>
  );
}

// A subsection that stays closed until asked for. The summary carries the
// heading, a state layer and the shared focus ring; content opens instantly.
function Disclosure({
  id,
  heading,
  summary,
  children,
}: {
  id: string;
  heading: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <details className='group/disclosure'>
      <summary className='rounded-lg-inc bg-surface-card focus-visible:focus-ring before:bg-on-surface before:ease-effects-fast before:rounded-inherit relative grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 p-5 outline-none select-none before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-8 sm:px-6 [&::-webkit-details-marker]:hidden'>
        <h3 id={id} className='type-headline-sm text-on-surface font-semibold'>
          {heading}
        </h3>
        <ChevronDown
          aria-hidden
          className='text-on-surface ease-spatial row-span-2 size-6 transition-transform duration-300 group-open/disclosure:rotate-180'
        />
        <span className='type-body-md text-on-surface-variant'>{summary}</span>
      </summary>
      <div className='mt-3'>{children}</div>
    </details>
  );
}

function CardText({ children }: { children: ReactNode }) {
  return <p className='type-body-md text-on-surface mt-2'>{children}</p>;
}

function CardDetails({ children }: { children: ReactNode }) {
  return <p className='type-body-sm text-on-surface-variant mt-2'>{children}</p>;
}

// Links take one of three Material forms, all with a stationary ↗:
// a whole item (one destination), outlined chips (several destinations in
// one item) or a tonal button (a standalone link). Text is never a bare link.

// The link's ::after stretches over the closest positioned item, which
// draws the state layer and the focus ring.
function StretchedLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className='text-on-surface cursor-pointer outline-none after:absolute after:inset-0 after:cursor-pointer'
    >
      {children}
    </a>
  );
}

function LinkArrow() {
  return <ArrowUpRight aria-hidden className='text-on-surface size-5 shrink-0' />;
}

function LinkChips({
  links,
  className,
}: {
  links: readonly { name: string; url: string }[];
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {links.map((link) => (
        <li key={link.name}>
          <Button asChild variant='chip' size='sm'>
            <a href={link.url}>
              {link.name}
              <ArrowUpRight aria-hidden className='size-4' />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
}

function ProfileLink({ href, children }: { href: string; children: string }) {
  return (
    <p>
      <Button asChild variant='tonal'>
        <a href={href}>
          {children}
          <ArrowUpRight aria-hidden className='size-4' />
        </a>
      </Button>
    </p>
  );
}

function TechList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li
          key={item}
          className='bg-surface-container-highest type-label-md text-on-surface-variant rounded-xs px-2 py-0.5 font-medium'
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export {
  Card,
  CardDetails,
  CardGrid,
  CardHeader,
  CardText,
  CompactList,
  CompactRow,
  Disclosure,
  Item,
  ItemHeader,
  ItemList,
  ItemText,
  LinkArrow,
  LinkChips,
  ProfileLink,
  StretchedLink,
  Subsection,
  TechList,
};
