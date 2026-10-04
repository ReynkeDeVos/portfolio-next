import { BriefcaseBusiness, FolderCode, Layers, SquareTerminal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import type { Locale } from '@/lib/locale';
import { sections } from '@/lib/section';
import type { Section } from '@/lib/section';
import { uiText } from '@/ui-text/ui-text';

import { useSectionNavigation } from './section-navigation';

const sectionIcons = {
  work: FolderCode,
  career: BriefcaseBusiness,
  skills: Layers,
  workflow: SquareTerminal,
} satisfies Record<Section, LucideIcon>;

// Once the Section tabs have scrolled above the viewport, a floating
// Expressive toolbar rises at the foot of the content column with the same
// Sections, within thumb reach. Narrow screens show icons and name only the
// open Section, which takes a squarer shape; wider ones name them all.
// Picking a Section opens it and returns to the tabs, which then take over
// again. While hidden, the toolbar is inert.
function SectionToolbar({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { section, pick } = useSectionNavigation();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const tabs = document.querySelector('[data-slot="tabs-list"]');

    const observer = new IntersectionObserver(([entry]) => {
      setShown(entry !== undefined && !entry.isIntersecting && entry.boundingClientRect.top < 0);
    });

    if (tabs) {
      observer.observe(tabs);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  function open(next: Section) {
    pick(next);
    document
      .querySelector<HTMLElement>(`[role='tab'][data-section='${next}']`)
      ?.focus({ preventScroll: true });
    document.querySelector('[data-slot="tabs-list"]')?.scrollIntoView({
      block: 'start',
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  return (
    <div className='pointer-events-none sticky bottom-4 z-10 h-0'>
      <nav
        aria-label={t.toolbarLabel}
        aria-hidden={!shown || undefined}
        inert={!shown}
        data-shown={shown}
        className='bg-primary-container duration-spatial-fast ease-spatial-fast data-[shown=false]:ease-emphasized transition-presence data-[shown=false]:duration-spatial-fast-exit pointer-events-auto absolute bottom-0 left-1/2 flex w-max origin-bottom -translate-x-1/2 items-center gap-1 rounded-full p-2 data-[shown=false]:pointer-events-none data-[shown=false]:translate-y-4 data-[shown=false]:scale-90 data-[shown=false]:opacity-0'
      >
        {sections.map((value) => {
          const Icon = sectionIcons[value];
          const current = value === section;

          return (
            <Button
              key={value}
              variant='toolbar'
              size='toolbar'
              aria-label={t.sectionNames[value]}
              aria-current={current ? 'true' : undefined}
              onClick={() => {
                open(value);
              }}
            >
              <Icon aria-hidden />
              {/* The label opens out of the icon for the open Section. */}
              <span
                aria-hidden
                className='duration-spatial-fast ease-spatial-fast transition-columns grid grid-cols-[0fr] group-aria-current/toolbar-item:grid-cols-[1fr] sm:grid-cols-[1fr]'
              >
                <span className='overflow-hidden'>
                  <span className='block ps-2'>{t.sectionNames[value]}</span>
                </span>
              </span>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}

export { SectionToolbar };
