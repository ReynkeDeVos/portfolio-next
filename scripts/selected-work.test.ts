import assert from 'node:assert/strict';
import { test } from 'node:test';

import { portfolio } from '../src/content/portfolio.ts';
import { createSelectedWork, selectedWork } from '../src/content/selected-work.ts';
import type { Project } from '../src/content/selected-work.ts';
import { validateSelectedWork } from './validate-selected-work.ts';

function fixtureProject(id: string): Project {
  const text = { en: `${id} (en)`, de: `${id} (de)` };

  return {
    id,
    name: id,
    category: text,
    description: text,
    details: text,
    technologies: ['TypeScript'],
    url: `https://example.com/${id}`,
  };
}

function names(projects: readonly { name: string }[]) {
  return projects.map((project) => project.name);
}

await test('portfolio shows the owner-approved featured projects in order', () => {
  const { featured } = selectedWork.forLocale('en');

  assert.deepEqual(names(featured), ['Reputation Assistant', 'Scoundrel TUI', 'PokémonBattle']);
});

await test('portfolio shows the owner-approved supporting projects in order', () => {
  const { supporting } = selectedWork.forLocale('en');

  assert.deepEqual(names(supporting), ['Elder Gym Bro App', 'Omarchy System Stats']);
});

await test('German view keeps the order and uses German project text', () => {
  const { featured, supporting } = selectedWork.forLocale('de');

  assert.deepEqual(names(featured), ['Reputation Assistant', 'Scoundrel TUI', 'PokémonBattle']);
  assert.deepEqual(names(supporting), ['Elder Gym Bro App', 'Omarchy System Stats']);
  assert.equal(featured[2]?.category, 'Bootcamp-Teamprojekt');
  assert.equal(supporting[0]?.category, 'Bootcamp-Abschlussprojekt im Team');
});

await test('credits and attribution reach the page unchanged', () => {
  const english = selectedWork.forLocale('en');
  const german = selectedWork.forLocale('de');

  assert.equal(
    english.featured[2]?.details,
    'Built with Sebastian and Clara during the bootcamp. This is my fork of the team repository.',
  );
  assert.equal(
    german.featured[2]?.details,
    'Mit Sebastian und Clara im Bootcamp entwickelt. Das ist mein Fork des Team-Repositorys.',
  );
  assert.equal(
    english.supporting[0]?.details,
    'Built by a team of four: Michal, Sebastian, Alex and Renke.',
  );
  assert.equal(
    english.featured[1]?.details,
    'Based on the card game Scoundrel by Zach Gage and Kurt Bieg. Credits for the game and the artwork are in the repository.',
  );
});

await test('projects that are not selected are not shown', () => {
  for (const locale of ['en', 'de'] as const) {
    const { featured, supporting } = selectedWork.forLocale(locale);

    assert.ok(
      ![...featured, ...supporting].some((project) => project.name === 'Name Shuffler CLI'),
    );
  }
});

await test('display order follows the selection, not the catalog', () => {
  const catalog = [
    fixtureProject('c'),
    fixtureProject('b'),
    fixtureProject('a'),
    fixtureProject('unused'),
  ];

  const work = createSelectedWork(catalog, { featured: ['a', 'c'], supporting: ['b'] });

  const reordered = createSelectedWork(catalog.toReversed(), {
    featured: ['a', 'c'],
    supporting: ['b'],
  });

  assert.deepEqual(names(work.forLocale('en').featured), ['a', 'c']);
  assert.deepEqual(names(reordered.forLocale('en').featured), ['a', 'c']);
  assert.deepEqual(names(reordered.forLocale('de').supporting), ['b']);
  assert.equal(reordered.forLocale('de').supporting[0]?.description, 'b (de)');
});

await test('reading a selection with a missing project names the group and ID', () => {
  const work = createSelectedWork([fixtureProject('a')], { featured: ['a'], supporting: ['gone'] });

  assert.throws(() => work.forLocale('en'), {
    message: 'selectedWork.supporting lists "gone", but no project has that ID.',
  });
});

await test('portfolio content passes selected-work validation', () => {
  assert.doesNotThrow(() => {
    validateSelectedWork(portfolio.projects, portfolio.selectedWork);
  });
});

await test('validation rejects two catalog records with the same ID', () => {
  const catalog = [fixtureProject('a'), fixtureProject('b'), fixtureProject('a')];

  assert.throws(
    () => {
      validateSelectedWork(catalog, { featured: ['a'], supporting: ['b'] });
    },
    {
      message: /projects contains "a" 2 times/u,
    },
  );
});

await test('validation rejects a project listed twice in one group', () => {
  const catalog = [fixtureProject('a'), fixtureProject('b')];

  assert.throws(
    () => {
      validateSelectedWork(catalog, { featured: ['a', 'a'], supporting: ['b'] });
    },
    {
      message: /selectedWork\.featured lists "a" 2 times/u,
    },
  );
});

await test('validation rejects a project in both groups', () => {
  const catalog = [fixtureProject('a'), fixtureProject('b')];

  assert.throws(
    () => {
      validateSelectedWork(catalog, { featured: ['a', 'b'], supporting: ['b'] });
    },
    {
      message: /"b" is in both selectedWork\.featured and selectedWork\.supporting/u,
    },
  );
});

await test('validation rejects a selected ID that no project has', () => {
  const catalog = [fixtureProject('a'), fixtureProject('b')];

  assert.throws(
    () => {
      validateSelectedWork(catalog, { featured: ['a'], supporting: ['b', 'typo'] });
    },
    { message: /selectedWork\.supporting lists "typo", but no project has that ID/u },
  );
});

await test('validation rejects an empty group', () => {
  const catalog = [fixtureProject('a')];

  assert.throws(
    () => {
      validateSelectedWork(catalog, { featured: ['a'], supporting: [] });
    },
    {
      message: /selectedWork\.supporting is empty/u,
    },
  );
});

await test('validation accepts catalog records that no group shows', () => {
  const catalog = [
    fixtureProject('a'),
    fixtureProject('b'),
    fixtureProject('archive-1'),
    fixtureProject('archive-2'),
  ];

  assert.doesNotThrow(() => {
    validateSelectedWork(catalog, { featured: ['a'], supporting: ['b'] });
  });
});

await test('validation reports every problem at once', () => {
  const catalog = [fixtureProject('a'), fixtureProject('a')];

  assert.throws(
    () => {
      validateSelectedWork(catalog, { featured: [], supporting: ['missing'] });
    },
    {
      message: /"a" 2 times[\s\S]*featured is empty[\s\S]*"missing"/u,
    },
  );
});
