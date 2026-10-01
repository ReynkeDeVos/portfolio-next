import type { Locale } from '../components/copy.ts';
import { portfolio } from './portfolio.ts';

type LocalizedText = Readonly<Record<Locale, string>>;

type Project = Readonly<{
  id: string;
  name: string;
  category: LocalizedText;
  description: LocalizedText;
  details: LocalizedText;
  technologies: readonly string[];
  url: string;
}>;

type WorkSelection = Readonly<{
  featured: readonly string[];
  supporting: readonly string[];
}>;

type SelectedProject = Readonly<{
  id: string;
  name: string;
  category: string;
  description: string;
  details: string;
  technologies: readonly string[];
  url: string;
}>;

type SelectedWork = Readonly<{
  featured: readonly SelectedProject[];
  supporting: readonly SelectedProject[];
}>;

// Reads the selection in its declared order, whatever the catalog order.
// Relationship checks run at build time in scripts/validate-selected-work.ts;
// a missing ID still fails here rather than silently dropping a project.
function createSelectedWork(catalog: readonly Project[], selection: WorkSelection) {
  function select(group: keyof WorkSelection, locale: Locale): readonly SelectedProject[] {
    return selection[group].map((id) => {
      const project = catalog.find((candidate) => candidate.id === id);

      if (project === undefined) {
        throw new Error(`selectedWork.${group} lists "${id}", but no project has that ID.`);
      }

      return {
        id: project.id,
        name: project.name,
        category: project.category[locale],
        description: project.description[locale],
        details: project.details[locale],
        technologies: project.technologies,
        url: project.url,
      };
    });
  }

  return {
    forLocale(locale: Locale): SelectedWork {
      return { featured: select('featured', locale), supporting: select('supporting', locale) };
    },
  };
}

const selectedWork = createSelectedWork(portfolio.projects, portfolio.selectedWork);

export { createSelectedWork, selectedWork };

export type { Project, SelectedProject, WorkSelection };
