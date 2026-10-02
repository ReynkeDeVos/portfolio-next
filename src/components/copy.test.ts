import assert from 'node:assert/strict';
import { test } from 'node:test';

import { copy } from './copy.ts';

await test('periods read as ranges, single years or open-ended in each Locale', () => {
  const periods = [
    { from: 2014, to: 2023 },
    { from: 2024, to: 2024 },
    { from: 2025, to: null },
  ];

  assert.deepEqual(
    periods.map((span) => copy.en.period(span)),
    ['2014–2023', '2024', '2025–present'],
  );
  assert.deepEqual(
    periods.map((span) => copy.de.period(span)),
    ['2014–2023', '2024', '2025–heute'],
  );
});

await test('the Current role reads as one sentence in each Locale', () => {
  const role = { role: 'Instructor', organization: 'WBS Coding School', since: 2025 };

  assert.deepEqual(copy.en.currentRole(role), ['Instructor', ' at WBS Coding School, since 2025']);
  assert.deepEqual(copy.de.currentRole(role), ['Instructor', ' bei WBS Coding School, seit 2025']);
});
