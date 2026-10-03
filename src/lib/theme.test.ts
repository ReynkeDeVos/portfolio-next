import assert from 'node:assert/strict';
import { test } from 'node:test';

import { blockedStorage, runHeadScript } from './test-browser.ts';
import { themeScript } from './theme.ts';

await test('a stored light or dark choice marks the root before paint', () => {
  assert.equal(runHeadScript(themeScript, { stored: { theme: 'light' } }).dataset.theme, 'light');
  assert.equal(runHeadScript(themeScript, { stored: { theme: 'dark' } }).dataset.theme, 'dark');
});

await test('without a valid stored choice the page follows the system scheme', () => {
  assert.deepEqual(runHeadScript(themeScript).dataset, {});
  assert.deepEqual(runHeadScript(themeScript, { stored: { theme: 'system' } }).dataset, {});
  assert.deepEqual(runHeadScript(themeScript, { stored: { theme: 'sepia' } }).dataset, {});
});

await test('blocked storage leaves the theme to the system', () => {
  assert.deepEqual(runHeadScript(themeScript, { localStorage: blockedStorage }).dataset, {});
});
