import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

import {
  defaultSection,
  sectionAddress,
  sectionFromHash,
  sections,
  sectionScript,
} from './section.ts';
import { runHeadScript } from './test-browser.ts';

const otherSections = sections.filter((section) => section !== defaultSection);

function markedSection(hash: string) {
  return runHeadScript(sectionScript, { location: { hash } }).dataset.section;
}

await test('a hash names its Section', () => {
  for (const section of sections) {
    assert.equal(sectionFromHash(`#${section}`), section);
  }
});

await test('no hash or an unknown one opens the default Section', () => {
  assert.equal(sectionFromHash(''), defaultSection);
  assert.equal(sectionFromHash('#'), defaultSection);
  assert.equal(sectionFromHash('#contact'), defaultSection);
});

await test('a Section address keeps the Locale path and search', () => {
  const location = { pathname: '/de/', search: '?ref=cv' };

  assert.equal(sectionAddress('career', location), '/de/?ref=cv#career');
  assert.equal(sectionAddress(defaultSection, location), '/de/?ref=cv');
});

await test('every Section address opens that Section again', () => {
  for (const section of sections) {
    const address = new URL(sectionAddress(section, { pathname: '/', search: '' }), 'https://x');

    assert.equal(sectionFromHash(address.hash), section);
  }
});

await test('the head script marks the root with a requested Section', () => {
  for (const section of otherSections) {
    assert.equal(markedSection(`#${section}`), section);
  }
});

await test('the head script leaves the default Section and unknown hashes unmarked', () => {
  assert.equal(markedSection(''), undefined);
  assert.equal(markedSection(`#${defaultSection}`), undefined);
  assert.equal(markedSection('#contact'), undefined);
});

// The pre-hydration rules name each Section by hand, so a new one must be added there.
await test('the stylesheet can open every Section the head script marks', async () => {
  const styles = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  for (const section of otherSections) {
    assert.ok(
      styles.includes(`:root[data-section='${section}'] {`),
      `styles.css has no indicator position for ${section}`,
    );
    assert.ok(
      styles.includes(`:root[data-section='${section}'] [data-section='${section}']`),
      `styles.css cannot show the ${section} panel before hydration`,
    );
  }
});
