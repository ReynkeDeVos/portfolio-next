import assert from 'node:assert/strict';
import { test } from 'node:test';

import { engineScript } from './engine.ts';
import { blockedStorage, runHeadScript } from './test-browser.ts';

const chrome = { userAgentData: { brands: [{ brand: 'Google Chrome' }, { brand: 'Chromium' }] } };

// Gecko and WebKit have no User-Agent Client Hints.
const firefox = {};

await test('the Engine note shows outside Chromium-based browsers', () => {
  assert.equal(runHeadScript(engineScript, { navigator: firefox }).dataset.engineNote, 'shown');
});

await test('Chromium-based browsers never see the Engine note', () => {
  assert.deepEqual(runHeadScript(engineScript, { navigator: chrome }).dataset, {});
});

await test('a dismissed Engine note stays off', () => {
  const stored = { 'engine-note': 'dismissed' };

  assert.deepEqual(runHeadScript(engineScript, { navigator: firefox, stored }).dataset, {});
});

await test('blocked storage keeps the Engine note off instead of failing', () => {
  const root = runHeadScript(engineScript, { navigator: firefox, localStorage: blockedStorage });

  assert.deepEqual(root.dataset, {});
});
