import type { ReactNode } from 'react';

import type { Locale } from '@/lib/locale';
import type { Section } from '@/lib/section';

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
// tests/e2e/section-focus.spec.ts checks these flags against the panels.
const sectionPanels = {
  work: { Panel: WorkPanel, startsWithLink: true },
  career: { Panel: CareerPanel, startsWithLink: false },
  skills: { Panel: SkillsPanel, startsWithLink: false },
  workflow: { Panel: WorkflowPanel, startsWithLink: false },
} satisfies Record<
  Section,
  { Panel: (props: { locale: Locale }) => ReactNode; startsWithLink: boolean }
>;

export { sectionPanels };
