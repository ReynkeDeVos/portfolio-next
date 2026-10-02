import assert from 'node:assert/strict';
import { test } from 'node:test';

import { contentFor, createContent } from './content.ts';
import { fixtureExperience, fixtureContent } from './test-fixtures.ts';

function names(projects: readonly { name: string }[]) {
  return projects.map((project) => project.name);
}

await test('Selected work follows the declared order and hides the rest of the catalog', () => {
  const { work } = createContent(fixtureContent())('en');

  assert.deepEqual(names(work.featured), ['b', 'a']);
  assert.deepEqual(names(work.supporting), ['c']);
});

await test('the German page receives German text', () => {
  const content = createContent(fixtureContent())('de');

  assert.equal(content.profile.identity, 'identity (de)');
  assert.equal(content.work.featured[0]?.category, 'b category (de)');
  assert.equal(content.career.teaching[0]?.topic, 'Web (de)');
  assert.equal(content.profile.portrait.alt, 'portrait (de)');
});

await test('experience arrives in Locale text with its years', () => {
  const [entry] = createContent(fixtureContent())('de').career.experience;

  assert.deepEqual(entry, {
    id: 'school',
    role: 'school role (de)',
    organization: 'school organization (de)',
    url: 'https://example.com/school',
    period: { from: 2025, to: null },
    description: 'school description (de)',
  });
});

await test('the Current role is the experience without an end year', () => {
  const { profile } = createContent(fixtureContent())('de');

  assert.deepEqual(profile.currentRole, {
    role: 'school role (de)',
    organization: 'school organization (de)',
    since: 2025,
  });
});

await test('without an open experience there is no Current role', () => {
  const raw = fixtureContent();
  raw.experience = [fixtureExperience('lab', 2014, 2023)];

  assert.equal(createContent(raw)('en').profile.currentRole, undefined);
});

await test('generic technology names translate; product names stay', () => {
  const english = createContent(fixtureContent())('en');
  const german = createContent(fixtureContent())('de');

  assert.deepEqual(english.skills[0]?.technologies, ['TypeScript', 'Networking']);
  assert.deepEqual(german.skills[0]?.technologies, ['TypeScript', 'Netzwerke']);
  assert.deepEqual(german.career.teaching[0]?.technologies, ['HTML', 'Netzwerke']);
  assert.deepEqual(german.work.featured[0]?.technologies, ['Python', 'Netzwerke']);
});

await test('build links follow the order of the item’s technologies', () => {
  const { workflow } = createContent(fixtureContent())('en');

  assert.deepEqual(workflow.build[0]?.links, [
    { name: 'Vite', url: 'https://vite.dev/' },
    { name: 'Zod', url: 'https://zod.dev/' },
  ]);
});

await test('the AI update date is written out in each Locale', () => {
  const read = createContent(fixtureContent());

  assert.equal(read('en').workflow.ai.updatedLabel, 'October 1, 2026');
  assert.equal(read('de').workflow.ai.updatedLabel, '1. Oktober 2026');
  assert.equal(read('de').workflow.ai.updated, '2026-10-01');
});

await test('a selected ID without a project fails instead of disappearing', () => {
  const raw = fixtureContent();
  raw.selectedWork.supporting = ['typo'];

  assert.throws(
    () => createContent(raw)('en'),
    /selectedWork\.supporting lists "typo", but no project has that ID/u,
  );
});

// The real Content

await test('the portfolio shows the owner-approved Selected work in order', () => {
  for (const locale of ['en', 'de'] as const) {
    const { work } = contentFor(locale);

    assert.deepEqual(names(work.featured), [
      'Reputation Assistant',
      'Scoundrel TUI',
      'PokémonBattle',
    ]);
    assert.deepEqual(names(work.supporting), ['Elder Gym Bro App', 'Omarchy System Stats']);
  }
});
