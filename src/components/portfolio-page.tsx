import { useLayoutEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CareerPanel } from './career-panel';
import { copy, isSection, sections } from './copy';
import type { Locale, Section } from './copy';
import { Identity } from './identity';
import { SkillsPanel } from './skills-panel';
import { WorkPanel } from './work-panel';
import { WorkflowPanel } from './workflow-panel';

const panels = {
  work: WorkPanel,
  skills: SkillsPanel,
  workflow: WorkflowPanel,
  career: CareerPanel,
} satisfies Record<Section, (props: { locale: Locale }) => ReactNode>;

function PortfolioPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [section, setSection] = useState<Section>('work');
  const [ticks, setTicks] = useState(0);
  const [animateSelection, setAnimateSelection] = useState(false);

  // The hash names the open section. Read it before paint so a language
  // switch or shared link shows the right panel without a visible swap.
  useLayoutEffect(() => {
    const sync = () => {
      const hash = globalThis.location.hash.slice(1);
      setAnimateSelection(false);
      setSection(isSection(hash) ? hash : 'work');
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
    globalThis.history.replaceState(
      globalThis.history.state,
      '',
      value === 'work' ? `${pathname}${search}` : `#${value}`,
    );
  }

  const indicator: CSSProperties = {
    '--tab-index': sections.indexOf(section),
    '--tab-count': sections.length,
  };

  return (
    <div className='min-h-dvh'>
      <main className='mx-auto grid w-full max-w-300 gap-4 px-4 pt-4 pb-16 sm:px-6 sm:pt-6 lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[minmax(0,25rem)_minmax(0,1fr)]'>
        <Identity locale={locale} section={section} ticks={ticks} />

        <Tabs value={section} onValueChange={changeSection} className='min-w-0'>
          <TabsList aria-label={t.sectionsLabel} style={indicator} data-animate={animateSelection}>
            {sections.map((value) => (
              <TabsTrigger key={value} value={value}>
                {t.sectionNames[value]}
              </TabsTrigger>
            ))}
          </TabsList>
          {sections.map((value) => {
            const Panel = panels[value];

            return (
              // Every panel is prerendered; inactive ones are only hidden.
              <TabsContent key={value} value={value} forceMount>
                <Panel locale={locale} />
              </TabsContent>
            );
          })}
        </Tabs>
      </main>
    </div>
  );
}

export { PortfolioPage };
