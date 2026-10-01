import type { Project, WorkSelection } from '../src/content/selected-work.ts';

const groups = ['featured', 'supporting'] as const;

// Counts how often each ID occurs, keeping first-seen order for messages.
function countIds(ids: readonly string[]) {
  const counts = new Map<string, number>();

  for (const id of ids) {
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }

  return counts;
}

// Checks how the selection relates to the catalog and reports every problem
// at once. Catalog records that no group lists are valid.
function validateSelectedWork(catalog: readonly Project[], selection: WorkSelection): void {
  const problems: string[] = [];

  for (const [id, count] of countIds(catalog.map((project) => project.id))) {
    if (count > 1) {
      problems.push(`projects contains "${id}" ${count} times; give each project its own ID.`);
    }
  }

  const catalogIds = new Set(catalog.map((project) => project.id));

  for (const group of groups) {
    if (selection[group].length === 0) {
      problems.push(`selectedWork.${group} is empty; list at least one project ID.`);
    }

    for (const [id, count] of countIds(selection[group])) {
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

  const supporting = new Set(selection.supporting);

  for (const id of new Set(selection.featured)) {
    if (supporting.has(id)) {
      problems.push(
        `"${id}" is in both selectedWork.featured and selectedWork.supporting; keep it in one.`,
      );
    }
  }

  if (problems.length > 0) {
    throw new Error(`Invalid selected work:\n- ${problems.join('\n- ')}`);
  }
}

export { validateSelectedWork };
