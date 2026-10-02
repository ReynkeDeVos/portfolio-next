import { useLayoutEffect, useState } from 'react';
import type { CSSProperties } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Locale } from '@/lib/locale';
import { defaultSection, isSection, sectionHash, sections } from '@/lib/section';
import type { Section } from '@/lib/section';

import { copy } from './copy';
import { EngineNote } from './engine-note';
import { Identity } from './identity';
import { sectionPanels } from './section-panels';

function PortfolioPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [section, setSection] = useState<Section>(defaultSection);
  const [ticks, setTicks] = useState(0);
  const [animateSelection, setAnimateSelection] = useState(false);

  // The hash names the open section. Read it before paint so a language
  // switch or shared link shows the right panel without a visible swap.
  useLayoutEffect(() => {
    const sync = () => {
      const hash = globalThis.location.hash.slice(1);
      setAnimateSelection(false);
      setSection(isSection(hash) ? hash : defaultSection);
    };

    sync();
    globalThis.addEventListener('hashchange', sync);

    return () => {
      globalThis.removeEventListener('hashchange', sync);
    };
  }, []);

  function changeSection(value: string) {
    if (!isSection(value) || value === section) {
      return;
    }

    // Content commits first; the indicator and portrait frame follow.
    setAnimateSelection(true);
    setSection(value);
    setTicks((count) => count + (sections.indexOf(value) > sections.indexOf(section) ? 1 : -1));
    const { pathname, search } = globalThis.location;
    const hash = sectionHash(value);
    globalThis.history.replaceState(
      globalThis.history.state,
      '',
      hash === undefined ? `${pathname}${search}` : `#${hash}`,
    );
  }

  const indicator: CSSProperties = {
    '--tab-index': sections.indexOf(section),
    '--tab-count': sections.length,
  };

  return (
    <div className='min-h-dvh'>
      <main className='mx-auto grid w-full max-w-300 gap-4 px-4 pt-4 pb-16 sm:px-6 sm:pt-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[minmax(0,28rem)_minmax(0,1fr)]'>
        <Identity locale={locale} section={section} ticks={ticks} />

        <div className='flex min-w-0 flex-col gap-4'>
          <EngineNote locale={locale} />

          <Tabs value={section} onValueChange={changeSection}>
            <TabsList
              aria-label={t.sectionsLabel}
              style={indicator}
              data-animate={animateSelection}
            >
              {sections.map((value) => (
                <TabsTrigger key={value} value={value}>
                  {t.sectionNames[value]}
                </TabsTrigger>
              ))}
            </TabsList>
            {sections.map((value) => {
              const { Panel, startsWithLink } = sectionPanels[value];

              return (
                // Every panel is prerendered; inactive ones are only hidden.
                <TabsContent
                  key={value}
                  value={value}
                  forceMount
                  tabIndex={startsWithLink ? -1 : 0}
                >
                  <Panel locale={locale} />
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export { PortfolioPage };
