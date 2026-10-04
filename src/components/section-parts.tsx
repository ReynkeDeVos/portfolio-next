import { cn } from 'cn';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import type { Locale } from '@/lib/locale';
import { uiText } from '@/ui-text/ui-text';

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

// Title, accent line and optional lead and end slots, the head of every list
// item. A lead sits before the title, centred on it.
function ItemHeader({
  title,
  meta,
  lead,
  end,
}: {
  title: ReactNode;
  meta?: ReactNode;
  lead?: ReactNode;
  end?: ReactNode;
}) {
  return (
    <div className='flex items-start justify-between gap-x-4 gap-y-1'>
      {lead}
      <div className='min-w-0 flex-1 self-center'>
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

function CardText({ children }: { children: ReactNode }) {
  return <p className='type-body-md text-on-surface mt-2'>{children}</p>;
}

// Links take one of three Material forms, all with a stationary ↗. A whole
// item means the entry itself is the destination. Outlined chips are an
// editorial group of tool or destination links that belong together, even a
// group of one. A tonal button is a standalone link. Text is never a bare link.

// Every link opens in a new tab. The ↗ shows that to sighted visitors; this
// tells assistive tech, last in the link's name.
function NewTabNotice({ locale }: { locale: Locale }) {
  return <span className='sr-only'>, {uiText[locale].opensInNewTab}</span>;
}

// The link's ::after stretches over the closest positioned item, which
// draws the state layer and the focus ring.
function StretchedLink({
  href,
  locale,
  children,
}: {
  href: string;
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='text-on-surface cursor-pointer outline-none after:absolute after:inset-0 after:cursor-pointer'
    >
      {children}
      <NewTabNotice locale={locale} />
    </a>
  );
}

function LinkArrow() {
  return <ArrowUpRight aria-hidden className='text-on-surface size-5 shrink-0' />;
}

function LinkChips({
  links,
  locale,
}: {
  links: readonly { name: string; url: string }[];
  locale: Locale;
}) {
  return (
    // Rows of 32px chips sit 16px apart on touch screens, so their 48px
    // touch targets meet without overlapping. They sit at the foot of a card.
    <ul className='mt-auto flex flex-wrap gap-2 pt-4 pointer-coarse:gap-y-4'>
      {links.map((link) => (
        <li key={link.name}>
          <Button asChild variant='chip' size='sm'>
            <a href={link.url} target='_blank' rel='noopener noreferrer'>
              {link.name}
              <NewTabNotice locale={locale} />
              <ArrowUpRight aria-hidden className='size-4' />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
}

// A grid wrapper stretches the button over its cell.
function ProfileLink({
  href,
  locale,
  className,
  children,
}: {
  href: string;
  locale: Locale;
  className?: string;
  children: string;
}) {
  return (
    <p className={className}>
      <Button asChild variant='tonal'>
        <a href={href} target='_blank' rel='noopener noreferrer'>
          {children}
          <NewTabNotice locale={locale} />
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
  CardGrid,
  CardHeader,
  CardText,
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
