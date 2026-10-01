import { cn } from 'cn';
import { ArrowUpRight } from 'lucide-react';

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

// Inline external link. The word joiner keeps the arrow on the line of the
// name's last character while long names still wrap anywhere.
function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='text-on-surface cursor-pointer rounded-xs wrap-anywhere'
    >
      {children}
      <span className='whitespace-nowrap'>
        {'\u2060'}
        <ArrowUpRight aria-hidden className='ms-0.5 inline size-[1em] align-[-0.125em]' />
      </span>
    </a>
  );
}

export { ExternalLink, TechList };
