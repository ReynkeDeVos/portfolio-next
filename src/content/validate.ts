import { z } from 'zod';

import { contentSchema } from './schema.ts';
import type { Content } from './schema.ts';

// Counts how often each value occurs, keeping first-seen order for messages.
function countOccurrences(values: readonly string[]) {
  const counts = new Map<string, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return counts;
}

function duplicateIds(label: string, entries: readonly { id: string }[]) {
  return [...countOccurrences(entries.map((entry) => entry.id))].flatMap(([id, count]) =>
    count > 1 ? [`${label} contains "${id}" ${count} times; give each entry its own ID.`] : [],
  );
}

function selectedWorkProblems({ projects, selectedWork }: Content) {
  const problems: string[] = [];
  const catalogIds = new Set(projects.map((project) => project.id));

  for (const group of ['featured', 'supporting'] as const) {
    if (selectedWork[group].length === 0) {
      problems.push(`selectedWork.${group} is empty; list at least one project ID.`);
    }

    for (const [id, count] of countOccurrences(selectedWork[group])) {
      if (count > 1) {
        problems.push(`selectedWork.${group} lists "${id}" ${count} times; list it once.`);
      }

      if (!catalogIds.has(id)) {
        problems.push(
          `selectedWork.${group} lists "${id}", but no project has that ID; fix the ID or add the project.`,
        );
      }
    }
  }

  const supporting = new Set(selectedWork.supporting);

  for (const id of new Set(selectedWork.featured)) {
    if (supporting.has(id)) {
      problems.push(
        `"${id}" is in both selectedWork.featured and selectedWork.supporting; keep it in one.`,
      );
    }
  }

  return problems;
}

function experienceProblems({ experience }: Content) {
  const problems: string[] = [];

  for (const { id, period } of experience) {
    if (period.to !== null && period.to < period.from) {
      problems.push(`experience "${id}" ends in ${period.to}, before it starts in ${period.from}.`);
    }
  }

  const current = experience.filter((entry) => entry.period.to === null);

  if (current.length > 1) {
    const ids = current.map((entry) => `"${entry.id}"`).join(', ');
    problems.push(`experience ${ids} have no end year; only the Current role may be open.`);
  }

  return problems;
}

function technologyProblems(content: Content) {
  const problems: string[] = [];
  const linked = new Set(content.portfolioBuild.links.map((link) => link.name));

  for (const item of content.portfolioBuild.items) {
    for (const name of item.technologies) {
      if (!linked.has(name)) {
        problems.push(
          `portfolioBuild.items "${item.id}" lists "${name}", but portfolioBuild.links has no link for it.`,
        );
      }
    }
  }

  const used = new Set(
    [
      ...content.skills,
      ...content.teaching,
      ...content.projects,
      ...content.portfolioBuild.items,
    ].flatMap((entry) => entry.technologies),
  );

  for (const name of Object.keys(content.technologyNames)) {
    if (!used.has(name)) {
      problems.push(`technologyNames translates "${name}", but no technology list uses it.`);
    }
  }

  return problems;
}

function emailProblems({ emailEncoded }: Content) {
  try {
    if (z.email().safeParse(globalThis.atob(emailEncoded)).success) {
      return [];
    }
  } catch {
    // Not base64; reported below.
  }

  return ['emailEncoded does not decode to an email address.'];
}

// TypeScript already holds Content to its shape; this adds what types
// cannot express (non-empty text, URLs, IDs, dates) and how the parts relate.
// Both kinds of rule always run, so every problem is reported at once; an
// empty list means the Content is valid.
function validateContent(content: Content): readonly string[] {
  const parsed = contentSchema.safeParse(content);

  const schemaProblems = parsed.success
    ? []
    : parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);

  return [
    ...schemaProblems,
    ...duplicateIds('interests', content.interests),
    ...duplicateIds('coreStrengths', content.coreStrengths),
    ...duplicateIds('skills', content.skills),
    ...duplicateIds('aiRecommendations.items', content.aiRecommendations.items),
    ...duplicateIds('aiRecommendations.tips', content.aiRecommendations.tips),
    ...duplicateIds('portfolioBuild.items', content.portfolioBuild.items),
    ...duplicateIds('teaching', content.teaching),
    ...duplicateIds('experience', content.experience),
    ...duplicateIds('projects', content.projects),
    ...selectedWorkProblems(content),
    ...experienceProblems(content),
    ...technologyProblems(content),
    ...emailProblems(content),
  ];
}

export { validateContent };
