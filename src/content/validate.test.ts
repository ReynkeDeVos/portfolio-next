import assert from 'node:assert/strict';
import { test } from 'node:test';

import { portfolio } from './portfolio.ts';
import type { Portfolio } from './schema.ts';
import {
  fixtureExperience,
  fixturePortfolio,
  fixtureProject,
  translated,
} from './test-fixtures.ts';
import { validateContent } from './validate.ts';

function problemsAfter(change: (content: Portfolio) => void) {
  const content = fixturePortfolio();
  change(content);

  return validateContent(content).join('\n');
}

await test('valid Content has no problems', () => {
  assert.deepEqual(validateContent(fixturePortfolio()), []);
});

await test('validation names the field of an empty translation', () => {
  const problems = problemsAfter((content) => {
    content.identity.de = '';
  });

  assert.match(problems, /^identity\.de: /mu);
});

await test('validation rejects an ID that is not kebab-case', () => {
  const problems = problemsAfter((content) => {
    content.projects[0]!.id = 'Reputation Assistant';
  });

  assert.match(problems, /^projects\.0\.id: Use a lowercase kebab-case ID\./mu);
});

await test('validation rejects a repeated ID within a list', () => {
  const problems = problemsAfter((content) => {
    content.skills.push({ ...content.skills[0]!, title: translated('Other') });
  });

  assert.match(problems, /skills contains "languages" 2 times/u);
});

await test('validation rejects a project in both Selected work groups', () => {
  const problems = problemsAfter((content) => {
    content.selectedWork.supporting = ['b'];
  });

  assert.match(problems, /"b" is in both selectedWork\.featured and selectedWork\.supporting/u);
});

await test('validation rejects a selected ID that no project has', () => {
  const problems = problemsAfter((content) => {
    content.selectedWork.supporting = ['c', 'typo'];
  });

  assert.match(problems, /selectedWork\.supporting lists "typo", but no project has that ID/u);
});

await test('validation rejects an empty or repeating Selected work group', () => {
  const problems = problemsAfter((content) => {
    content.selectedWork.featured = [];
    content.selectedWork.supporting = ['c', 'c'];
  });

  assert.match(problems, /selectedWork\.featured is empty/u);
  assert.match(problems, /selectedWork\.supporting lists "c" 2 times/u);
});

await test('validation rejects a build technology without a link', () => {
  const problems = problemsAfter((content) => {
    content.portfolioBuild.items[0]?.technologies.push('Wrangler');
  });

  assert.match(problems, /portfolioBuild\.items "framework" lists "Wrangler", but .* no link/u);
});

await test('validation rejects a technology translation nothing uses', () => {
  const problems = problemsAfter((content) => {
    content.technologyNames.Networkng = { en: 'Networking', de: 'Netzwerke' };
  });

  assert.match(problems, /technologyNames translates "Networkng", but no technology list uses it/u);
});

await test('validation allows only one open-ended experience', () => {
  const problems = problemsAfter((content) => {
    content.experience.push(fixtureExperience('second-job', 2026, null));
  });

  assert.match(problems, /experience "school", "second-job" have no end year/u);
});

await test('validation rejects an experience that ends before it starts', () => {
  const problems = problemsAfter((content) => {
    content.experience.push(fixtureExperience('backwards', 2020, 2019));
  });

  assert.match(problems, /experience "backwards" ends in 2019, before it starts in 2020/u);
});

await test('validation rejects an encoded value that is not an email address', () => {
  const problems = problemsAfter((content) => {
    content.emailEncoded = globalThis.btoa('not-an-email');
  });

  assert.match(problems, /emailEncoded does not decode to an email address/u);
});

await test('validation reports every problem at once', () => {
  const problems = problemsAfter((content) => {
    content.projects.push(fixtureProject('a'));
    content.selectedWork.featured = [];
    content.selectedWork.supporting = ['missing'];
  });

  assert.match(problems, /"a" 2 times[\s\S]*featured is empty[\s\S]*"missing"/u);
});

await test('the portfolio’s Content is valid', () => {
  assert.deepEqual(validateContent(portfolio), []);
});
