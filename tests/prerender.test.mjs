// Checks the HTML that `aubr build` prerendered for each Locale. Run it after
// a build with `aubr test:prerender`. Expected paths are written out here
// rather than imported from src/lib/locale.ts, so a wrong path there fails.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const origin = 'https://portfolio.renkebrixel.workers.dev';

const pages = [
  { locale: 'en', file: 'dist/client/index.html' },
  { locale: 'de', file: 'dist/client/de/index.html' },
];

const languageSwitch = { en: '/', de: '/de/' };

const alternates = {
  en: `${origin}/`,
  de: `${origin}/de/`,
  'x-default': `${origin}/`,
};

// The attributes of every opening tag with the given name, keys lowercased.
function tags(html, name) {
  const tagPattern = new RegExp(`<${name}\\s(?<attributes>[^>]*)>`, 'giu');
  const attributePattern = /(?<key>[\w:-]+)="(?<value>[^"]*)"/gu;

  return [...html.matchAll(tagPattern)].map((tag) =>
    Object.fromEntries(
      [...(tag.groups?.attributes ?? '').matchAll(attributePattern)].map((attribute) => [
        attribute.groups?.key.toLowerCase(),
        attribute.groups?.value,
      ]),
    ),
  );
}

// Maps each element's hreflang to its href.
function hrefsByLanguage(elements) {
  return Object.fromEntries(
    elements
      .filter((element) => element.hreflang)
      .map((element) => [element.hreflang, element.href]),
  );
}

for (const { locale, file } of pages) {
  test(`${file} is the ${locale} Locale page`, async () => {
    const html = await readFile(file, 'utf8');
    const alternateLinks = tags(html, 'link').filter((link) => link.rel === 'alternate');

    assert.equal(tags(html, 'html')[0]?.lang, locale);
    assert.deepEqual(hrefsByLanguage(alternateLinks), alternates);
    assert.deepEqual(hrefsByLanguage(tags(html, 'a')), languageSwitch);
  });
}
