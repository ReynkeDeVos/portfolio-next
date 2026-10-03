import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  defaultSection,
  sectionFromHash,
  sectionHash,
  sections,
  sectionScript,
  sectionStyles,
} from './section.ts';
import { runHeadScript } from './test-browser.ts';

const otherSections = sections.filter((section) => section !== defaultSection);

function markedSection(hash: string) {
  return runHeadScript(sectionScript, { location: { hash } }).dataset.section;
}

await test('a hash names its Section', () => {
  for (const section of sections) {
    assert.equal(sectionFromHash(section), section);
  }
});

await test('no hash or an unknown one opens the default Section', () => {
  assert.equal(sectionFromHash(''), defaultSection);
  assert.equal(sectionFromHash('contact'), defaultSection);
  // Router hashes carry no '#'; a browser-style hash is not a Section.
  assert.equal(sectionFromHash('#career'), defaultSection);
});

await test('the default Section clears the hash', () => {
  assert.equal(sectionHash(defaultSection), '');
});

await test('every Section hash opens that Section again', () => {
  for (const section of sections) {
    assert.equal(sectionFromHash(sectionHash(section)), section);
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

await test('the pre-hydration rules open every Section the head script marks', () => {
  for (const section of otherSections) {
    const mark = `:root[data-section='${section}']`;

    assert.ok(
      sectionStyles.includes(`${mark}{--section-index:${sections.indexOf(section)}}`),
      `no indicator position for ${section}`,
    );
    assert.ok(
      sectionStyles.includes(
        `${mark} [data-slot='tabs-content'][data-section='${section}']{display:block}`,
      ),
      `the ${section} panel stays hidden`,
    );
    assert.ok(
      sectionStyles.includes(`${mark} [data-slot='tabs-trigger'][data-section='${section}']{`),
      `the ${section} trigger is not shown as selected`,
    );
  }
});

await test('the pre-hydration rules leave the default Section to the markup', () => {
  assert.ok(!sectionStyles.includes(`[data-section='${defaultSection}']`));
});
