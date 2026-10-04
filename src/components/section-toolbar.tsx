import { cn } from 'cn';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import type { Locale } from '@/lib/locale';
import { sections } from '@/lib/section';
import type { Section } from '@/lib/section';
import { uiText } from '@/ui-text/ui-text';

import { useSectionNavigation } from './section-navigation';
import { SegmentPill, segmentGroup } from './site-controls';

// On phones, once the Section tabs have scrolled above the viewport, a
// floating copy of them rises within thumb reach: the same names in the same
// order, with the same stretching pill. It steps aside while the visitor
// scrolls down to read and returns when they scroll back up or reach the end.
// Its slot at the foot of the content column is reserved, so at the end it
// sits below the last content instead of covering it. Picking a Section opens
// it and returns to the tabs. Wider screens keep the tabs in easy reach and
// never show it; while hidden it is inert.
function SectionToolbar({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { section, pick } = useSectionNavigation();
  const [shown, setShown] = useState(false);

  // Reading the tabs' position on every scroll, rather than waiting for an
  // intersection change, also catches jumps from below the viewport to above
  // it. Small scroll jitter keeps the last direction.
  useEffect(() => {
    const tabs = document.querySelector('[data-slot="tabs-list"]');
    let lastY = scrollY;
    let up = false;

    const update = () => {
      if (Math.abs(scrollY - lastY) > 8) {
        up = scrollY < lastY;
        lastY = scrollY;
      }

      const above = tabs !== null && tabs.getBoundingClientRect().bottom < 0;
      const end = scrollY + innerHeight >= document.documentElement.scrollHeight - 8;

      setShown(above && (up || end));
    };

    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);

    return () => {
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
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
    <div className='sticky bottom-4 z-10 h-12 sm:hidden'>
      <nav
        aria-label={t.toolbarLabel}
        aria-hidden={!shown || undefined}
        inert={!shown}
        data-shown={shown}
        className={cn(
          segmentGroup,
          'bg-primary-container duration-spatial-fast ease-spatial-fast data-[shown=false]:ease-emphasized transition-presence data-[shown=false]:duration-spatial-fast-exit h-12 origin-bottom data-[shown=false]:pointer-events-none data-[shown=false]:translate-y-4 data-[shown=false]:scale-90 data-[shown=false]:opacity-0',
        )}
      >
        <SegmentPill index={sections.indexOf(section)} />
        {sections.map((value) => (
          <Button
            key={value}
            variant='segment-vibrant'
            size='segment'
            aria-current={value === section ? 'true' : undefined}
            onClick={() => {
              open(value);
            }}
          >
            {t.sectionNames[value]}
          </Button>
        ))}
      </nav>
    </div>
  );
}

export { SectionToolbar };
