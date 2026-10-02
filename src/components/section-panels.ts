import type { ReactNode } from 'react';

import type { Locale } from '@/lib/locale';
import type { Section } from '@/lib/section';

import { CareerPanel } from './career-panel';
import { SkillsPanel } from './skills-panel';
import { WorkPanel } from './work-panel';
import { WorkflowPanel } from './workflow-panel';

// WAI-ARIA tabs: a panel is a Tab stop only when its content does not start
// with a focusable element. Work and Career open with a whole-item link, so
// Tab moves from the tab list straight to it, without a ring around the panel.
const sectionPanels = {
  work: { Panel: WorkPanel, startsWithLink: true },
  career: { Panel: CareerPanel, startsWithLink: true },
  skills: { Panel: SkillsPanel, startsWithLink: false },
  workflow: { Panel: WorkflowPanel, startsWithLink: false },
} satisfies Record<
  Section,
  { Panel: (props: { locale: Locale }) => ReactNode; startsWithLink: boolean }
>;

export { sectionPanels };
