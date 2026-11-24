import { useEffect, useState } from 'react';

import { SegmentedGroup, SegmentedOption } from '@/components/ui/segmented-control';
import type { Locale } from '@/lib/locale';
import { sections, tabsListSlot } from '@/lib/section';
import { uiText } from '@/ui-text/ui-text';

import { useSectionNavigation } from './section-navigation';

// On phones, once the Section tabs have scrolled above the viewport, a
// floating copy of them rises within thumb reach: the same names in the same
// order, with the same stretching pill. It steps aside while the visitor
// scrolls down to read and returns when they scroll back up or reach the end.
// Its slot at the foot of the content column is reserved, so at the end it
// sits below the last content instead of covering it. Picking a Section opens
// it and returns to the tabs. Wider screens keep the tabs in easy reach and
// never show it; while hidden it is inert and runs no scroll work.
function SectionToolbar({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { section, jumpTo } = useSectionNavigation();
  const [shown, setShown] = useState(false);

  // Reading the tabs' position on every scroll, rather than waiting for an
  // intersection change, also catches jumps from below the viewport to above
  // it. Small scroll jitter keeps the last direction. Listeners only run below
  // Tailwind's `sm` breakpoint where the toolbar is visible.
  useEffect(() => {
    const phone = matchMedia('(width < 40rem)');
    const tabs = document.querySelector(`[data-slot="${tabsListSlot}"]`);
    let lastY = scrollY;
    let up = false;
    let listening = false;

    const update = () => {
      if (Math.abs(scrollY - lastY) > 8) {
        up = scrollY < lastY;
        lastY = scrollY;
      }

      const above = tabs !== null && tabs.getBoundingClientRect().bottom < 0;
      const end = scrollY + innerHeight >= document.documentElement.scrollHeight - 8;

      setShown(above && (up || end));
    };

    const detach = () => {
      if (!listening) {
        return;
      }

      removeEventListener('scroll', update);
      removeEventListener('resize', update);
      listening = false;
    };

    const sync = () => {
      if (phone.matches) {
        if (!listening) {
          lastY = scrollY;
          up = false;
          addEventListener('scroll', update, { passive: true });
          addEventListener('resize', update);
          listening = true;
        }

        update();
      } else {
        detach();
        setShown(false);
      }
    };

    sync();
    phone.addEventListener('change', sync);

    return () => {
      phone.removeEventListener('change', sync);
      detach();
    };
  }, []);

  return (
    <div className='sticky bottom-4 z-10 h-12 sm:hidden'>
      <SegmentedGroup
        as='nav'
        surface='floating'
        label={t.toolbarLabel}
        index={sections.indexOf(section)}
        shown={shown}
      >
        {sections.map((value) => (
          <SegmentedOption
            key={value}
            vibrant
            current={value === section ? 'true' : undefined}
            onClick={() => {
              jumpTo(value);
            }}
          >
            {t.sectionNames[value]}
          </SegmentedOption>
        ))}
      </SegmentedGroup>
    </div>
  );
}

export { SectionToolbar };
