import { useLocation, useNavigate } from '@tanstack/react-router';
import { createContext, use, useLayoutEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Locale } from '@/lib/locale';
import { defaultSection, isSection, sectionFromHash, sectionHash, sections } from '@/lib/section';
import type { Section } from '@/lib/section';
import { uiText } from '@/ui-text/ui-text';

import { CareerPanel } from './career-panel';
import { SkillsPanel } from './skills-panel';
import { WorkPanel } from './work-panel';
import { WorkflowPanel } from './workflow-panel';

// WAI-ARIA tabs: a panel is a Tab stop only when its content does not start
// with a focusable element. Work's only content before its first link is the
// visually hidden Section heading, which repeats the tab name a screen-reader
// user just heard, so Tab moves from the tab list straight to the link.
// Career opens each entry with the role heading, real information its
// organization link leaves out, so its panel keeps its own Tab stop.
// The browser tests check these flags against the panels.
const sectionPanels = {
  work: { Panel: WorkPanel, startsWithLink: true },
  career: { Panel: CareerPanel, startsWithLink: false },
  skills: { Panel: SkillsPanel, startsWithLink: false },
  workflow: { Panel: WorkflowPanel, startsWithLink: false },
} satisfies Record<
  Section,
  { Panel: (props: { locale: Locale }) => ReactNode; startsWithLink: boolean }
>;

type SectionNavigationState = {
  section: Section;
  // One step per Section the visitor picks, +1 towards a later Section and -1
  // towards an earlier one, so the portrait frame turns the way the tabs went.
  turns: number;
  // Moves focus to the open Section's tab, e.g. when what had focus goes away.
  focusOpenSection: () => void;
  // Only the Section tabs below pick Sections and slide the indicator.
  pick: (section: Section) => void;
  animate: boolean;
  // Which way the last change went, so the indicator stretches that way.
  direction: Direction;
};

type Direction = 'forward' | 'backward';

// How the open Section last changed. A pick is noted first and consumed once
// the router's location reaches that Section, so the pick and the address
// never have to land in the same render.
type Motion = {
  shown: Section;
  picked: Section | null;
  animate: boolean;
  turns: number;
  direction: Direction;
};

const SectionNavigationContext = createContext<SectionNavigationState | null>(null);

// The Section navigation state, for anything inside SectionNavigation.
function useSectionNavigation() {
  const state = use(SectionNavigationContext);

  if (!state) {
    throw new Error('Section navigation is read outside SectionNavigation.');
  }

  return state;
}

// The address's hash names the open Section. Once the page has hydrated, the
// router's location is the one source of truth: a tab, a hash link,
// `location.hash` and Back/Forward all reach the Section through it.
//
// The server and the first client render open the default Section, so the
// prerendered markup hydrates as is. Before then the head script's root mark
// lets CSS show the address's Section, while Radix's markup still says the
// default Section is selected. That disagreement is accepted: it lasts only
// until hydration, and the tabs are not interactive before it anyway.
function SectionNavigation({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const hash = useLocation({ select: (location) => location.hash });
  const [hydrated, setHydrated] = useState(false);

  const [motion, setMotion] = useState<Motion>({
    shown: defaultSection,
    picked: null,
    animate: false,
    turns: 0,
    direction: 'forward',
  });

  const section = hydrated ? sectionFromHash(hash) : defaultSection;

  // Adopted before paint, so the address's Section replaces the default one
  // and takes over from the CSS that showed it, without a visible switch.
  useLayoutEffect(() => {
    // Hydration has to finish before a render may read the address, and only a
    // layout effect starts that render before paint.
    // oxlint-disable-next-line react/set-state-in-effect
    setHydrated(true);
  }, []);

  // The CSS lets go only once the tabs show the address's Section themselves.
  // Effects that measure the page can run in between, and dropping it earlier
  // would show them the default Section's shorter page, which clamps a
  // restored scroll position.
  useLayoutEffect(() => {
    if (hydrated) {
      delete document.documentElement.dataset.section;
    }
  }, [hydrated]);

  // Only a Section the visitor picked slides the indicator and turns the
  // frame; one the address brings in from elsewhere just appears.
  if (section !== motion.shown) {
    const picked = section === motion.picked;
    const step = sections.indexOf(section) > sections.indexOf(motion.shown) ? 1 : -1;

    setMotion({
      shown: section,
      picked: null,
      animate: picked,
      turns: picked ? motion.turns + step : motion.turns,
      direction: step > 0 ? 'forward' : 'backward',
    });
  }

  function pick(next: Section) {
    if (next === section) {
      return;
    }

    setMotion((current) => ({ ...current, picked: next }));
    // Replacing keeps Back for leaving the page rather than stepping through
    // Sections. The search stays, so a ?ref= tag survives, and the page keeps
    // its scroll position instead of jumping to the top or to the hash.
    void navigate({
      hash: sectionHash(next),
      search: true,
      replace: true,
      resetScroll: false,
      hashScrollIntoView: false,
    });
  }

  const state: SectionNavigationState = {
    section,
    turns: motion.turns,
    focusOpenSection: () => {
      document.querySelector<HTMLElement>(`[role='tab'][data-section='${section}']`)?.focus();
    },
    pick,
    animate: motion.animate,
    direction: motion.direction,
  };

  return <SectionNavigationContext value={state}>{children}</SectionNavigationContext>;
}

// The tab list and every Section's panel.
function SectionTabs({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { section, pick, animate, direction } = useSectionNavigation();

  const indicator: CSSProperties = {
    '--tab-index': sections.indexOf(section),
    '--tab-count': sections.length,
  };

  return (
    <Tabs
      value={section}
      onValueChange={(value) => {
        if (isSection(value)) {
          pick(value);
        }
      }}
    >
      {/* The Section panel switches at once; the indicator follows. */}
      <TabsList
        aria-label={t.sectionsLabel}
        style={indicator}
        data-animate={animate}
        data-direction={direction}
      >
        {sections.map((value) => (
          <TabsTrigger key={value} value={value} data-section={value}>
            {t.sectionNames[value]}
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map((value) => {
        const { Panel, startsWithLink } = sectionPanels[value];

        return (
          // Every panel is prerendered; inactive ones are only hidden.
          // data-section lets the head script's mark pick one before hydration.
          <TabsContent
            key={value}
            value={value}
            data-section={value}
            forceMount
            tabIndex={startsWithLink ? -1 : 0}
          >
            <Panel locale={locale} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

export { SectionNavigation, SectionTabs, useSectionNavigation };
