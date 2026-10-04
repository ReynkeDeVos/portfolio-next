import { intlLocale } from '../lib/locale.ts';
import type { Locale } from '../lib/locale.ts';
import { portfolio } from './portfolio.ts';
import type { Content } from './schema.ts';

function formatDate(isoDate: string, locale: Locale) {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

// Resolves raw bilingual Content into what one Locale's page shows: text in
// that Locale, formatted dates, translated technology names, the
// Current role, and Selected work in the owner's order.
function resolve(raw: Content, locale: Locale) {
  const technology = (name: string) => raw.technologyNames[name]?.[locale] ?? name;
  const technologyList = (names: readonly string[]) => names.map((name) => technology(name));

  function project(id: string, group: keyof Content['selectedWork']) {
    const found = raw.projects.find((candidate) => candidate.id === id);

    // The content check rejects this; failing loudly here keeps a
    // Project from silently disappearing if the check was skipped.
    if (found === undefined) {
      throw new Error(`selectedWork.${group} lists "${id}", but no project has that ID.`);
    }

    return {
      id: found.id,
      name: found.name,
      category: found.category[locale],
      description: found.description[locale],
      details: found.details[locale],
      engineering: found.engineering?.[locale],
      technologies: technologyList(found.technologies),
      url: found.url,
    };
  }

  const current = raw.experience.find((entry) => entry.period.to === null);
  const { aiRecommendations, portfolioBuild } = raw;

  return {
    profile: {
      name: raw.name,
      identity: raw.identity[locale],
      location: raw.location[locale],
      introduction: raw.introduction[locale],
      coreStrengths: raw.coreStrengths.map((strength) => ({
        id: strength.id,
        name: strength.name[locale],
      })),
      currentRole: current && {
        role: current.role[locale],
        organization: current.organization[locale],
        since: current.period.from,
      },
      emailEncoded: raw.emailEncoded,
      github: raw.github,
      linkedin: raw.linkedin,
      portrait: { ...raw.portrait, alt: raw.portrait.alt[locale] },
      fullPortrait: { ...raw.fullPortrait, alt: raw.fullPortrait.alt[locale] },
    },
    work: {
      featured: raw.selectedWork.featured.map((id) => project(id, 'featured')),
      supporting: raw.selectedWork.supporting.map((id) => project(id, 'supporting')),
    },
    career: {
      experience: raw.experience.map((entry) => ({
        id: entry.id,
        role: entry.role[locale],
        organization: entry.organization[locale],
        url: entry.url,
        period: entry.period,
        description: entry.description[locale],
      })),
      teaching: raw.teaching.map((topic) => ({
        id: topic.id,
        topic: topic.topic[locale],
        technologies: technologyList(topic.technologies),
      })),
    },
    skills: raw.skills.map((group) => ({
      id: group.id,
      title: group.title[locale],
      description: group.description[locale],
      technologies: technologyList(group.technologies),
    })),
    workflow: {
      interests: raw.interests.map((interest) => ({
        id: interest.id,
        title: interest.title[locale],
        description: interest.description[locale],
      })),
      ai: {
        updated: aiRecommendations.updated,
        updatedLabel: formatDate(aiRecommendations.updated, locale),
        items: aiRecommendations.items.map((item) => ({
          id: item.id,
          task: item.task[locale],
          note: item.note[locale],
          model: item.model,
          effort: item.effort,
        })),
        modelNotes: aiRecommendations.modelNotes.map((entry) => ({
          model: entry.model,
          note: entry.note[locale],
        })),
      },
      tips: aiRecommendations.tips.map((tip) => ({
        id: tip.id,
        title: tip.title[locale],
        description: tip.description[locale],
        links: tip.links,
      })),
      build: portfolioBuild.items.map((item) => ({
        id: item.id,
        topic: item.topic[locale],
        description: item.description[locale],
        // The content check guarantees every technology has a link.
        links: item.technologies.flatMap((name) =>
          portfolioBuild.links.filter((candidate) => candidate.name === name),
        ),
      })),
    },
  };
}

type LocalizedContent = ReturnType<typeof resolve>;

type SelectedProject = LocalizedContent['work']['featured'][number];

const byLocale = {
  en: resolve(portfolio, 'en'),
  de: resolve(portfolio, 'de'),
} satisfies Record<Locale, LocalizedContent>;

function contentFor(locale: Locale) {
  return byLocale[locale];
}

export { contentFor, resolve };

export type { LocalizedContent, SelectedProject };
