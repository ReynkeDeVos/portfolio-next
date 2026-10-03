// Checks the HTML that `aubr build` prerendered for each Locale. Run it after
// a build with `aubr test:prerender`. Expected paths are written out here
// rather than imported from src/lib/locale.ts, so a wrong path there fails.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const origin = 'https://portfolio.renkebrixel.workers.dev';

const localePages = [
  { locale: 'en', path: '/', file: 'dist/client/index.html' },
  { locale: 'de', path: '/de/', file: 'dist/client/de/index.html' },
];

// The default Locale also answers for x-default.
const alternates = [
  ...localePages.map(({ locale, path }) => [locale, `${origin}${path}`]),
  ['x-default', `${origin}/`],
];

const localeLinks = localePages.map(({ locale, path }) => [locale, path]);

// The attributes of every opening tag with the given name, keys lowercased.
function tagAttributes(html, name) {
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

// Every [hreflang, href] pair in document order, so a duplicate can't hide.
function hreflangPairs(elements) {
  return elements
    .filter((element) => element.hreflang)
    .map((element) => [element.hreflang, element.href]);
}

for (const { locale, path, file } of localePages) {
  test(`${file} is the ${locale} Locale page`, async () => {
    const html = await readFile(file, 'utf8');
    const links = tagAttributes(html, 'link');
    const alternateLinks = links.filter((link) => link.rel === 'alternate');
    const canonical = links.filter((link) => link.rel === 'canonical').map((link) => link.href);

    const ogUrl = tagAttributes(html, 'meta')
      .filter((meta) => meta.property === 'og:url')
      .map((meta) => meta.content);

    assert.equal(tagAttributes(html, 'html')[0]?.lang, locale);
    assert.deepEqual(canonical, [`${origin}${path}`]);
    assert.deepEqual(ogUrl, [`${origin}${path}`]);
    assert.deepEqual(hreflangPairs(alternateLinks), alternates);
    assert.deepEqual(hreflangPairs(tagAttributes(html, 'a')), localeLinks);
  });
}
