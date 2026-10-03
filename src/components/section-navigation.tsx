import { useLocation, useNavigate } from '@tanstack/react-router';
import { createContext, use, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { copy } from '@/copy/copy';
import type { Locale } from '@/lib/locale';
import { defaultSection, isSection, sectionFromHash, sectionHash, sections } from '@/lib/section';
import type { Section } from '@/lib/section';

import { sectionPanels } from './section-panels';

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
  registerTab: (section: Section, element: HTMLButtonElement | null) => void;
};

// How the open Section last changed. A pick is noted first and consumed once
// the router's location reaches that Section, so the pick and the address
// never have to land in the same render.
type Motion = { shown: Section; picked: Section | null; animate: boolean; turns: number };

const SectionNavigationContext = createContext<SectionNavigationState | null>(null);

function useSectionNavigationState() {
  const state = use(SectionNavigationContext);

  if (!state) {
    throw new Error('Section navigation is read outside SectionNavigation.');
  }

  return state;
}

// The open Section, the portrait frame's turn count and a way to focus the
// open Section's tab, for anything inside SectionNavigation.
function useSectionNavigation() {
  const { section, turns, focusOpenSection } = useSectionNavigationState();

  return { section, turns, focusOpenSection };
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
  });

  const tabs = useRef<Partial<Record<Section, HTMLButtonElement>>>({});

  const section = hydrated ? sectionFromHash(hash) : defaultSection;

  // Adopted before paint, so the address's Section replaces the default one
  // and takes over from the CSS that showed it, without a visible switch.
  useLayoutEffect(() => {
    // Hydration has to finish before a render may read the address, and only a
    // layout effect starts that render before paint.
    // oxlint-disable-next-line react/set-state-in-effect
    setHydrated(true);
    delete document.documentElement.dataset.section;
  }, []);

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
      tabs.current[section]?.focus();
    },
    pick,
    animate: motion.animate,
    registerTab: (tabSection, element) => {
      if (element) {
        tabs.current[tabSection] = element;
      } else {
        delete tabs.current[tabSection];
      }
    },
  };

  return <SectionNavigationContext value={state}>{children}</SectionNavigationContext>;
}

// The tab list and every Section's panel.
function SectionTabs({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { section, pick, animate, registerTab } = useSectionNavigationState();

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
      <TabsList aria-label={t.sectionsLabel} style={indicator} data-animate={animate}>
        {sections.map((value) => (
          <TabsTrigger
            key={value}
            ref={(element) => {
              registerTab(value, element);
            }}
            value={value}
            data-section={value}
          >
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
