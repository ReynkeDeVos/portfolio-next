import assert from 'node:assert/strict';
import { test } from 'node:test';

import { localeFromPathname, localeHead, localePath, locales, localeScript } from './locale.ts';
import { runHeadScript } from './test-browser.ts';

// Runs the head script against a stand-in browser and reports what it did.
function runLocaleScript(pathname: string, stored: string | null) {
  let replacedWith = '';

  const location = {
    pathname,
    search: '?ref=cv',
    hash: '#career',
    replace(url: string) {
      replacedWith = url;
    },
  };

  const { hidden } = runHeadScript(localeScript, {
    location,
    stored: stored === null ? {} : { locale: stored },
  });

  return { replacedWith, hidden };
}

await test('every Locale path leads back to its Locale', () => {
  for (const locale of locales) {
    assert.equal(localeFromPathname(localePath(locale)), locale);
  }
});

await test('the German page is found with or without the trailing slash', () => {
  assert.equal(localeFromPathname('/de'), 'de');
  assert.equal(localeFromPathname('/de/'), 'de');
  assert.equal(localeFromPathname('/de/missing'), 'de');
});

await test('a path that only starts with the letters de stays English', () => {
  assert.equal(localeFromPathname('/design'), 'en');
  assert.equal(localeFromPathname('/missing'), 'en');
});

await test('head links point every Locale at its final address', () => {
  const { meta, links } = localeHead('de');

  assert.deepEqual(meta, [
    { property: 'og:url', content: 'https://portfolio.renkebrixel.workers.dev/de/' },
    { property: 'og:locale', content: 'de_DE' },
  ]);
  assert.deepEqual(links, [
    { rel: 'canonical', href: 'https://portfolio.renkebrixel.workers.dev/de/' },
    { rel: 'alternate', hrefLang: 'en', href: 'https://portfolio.renkebrixel.workers.dev/' },
    { rel: 'alternate', hrefLang: 'de', href: 'https://portfolio.renkebrixel.workers.dev/de/' },
    { rel: 'alternate', hrefLang: 'x-default', href: 'https://portfolio.renkebrixel.workers.dev/' },
  ]);
});

await test('the default Locale is canonical at the site root', () => {
  const { meta, links } = localeHead('en');

  assert.deepEqual(
    meta.find((tag) => tag.property === 'og:url'),
    { property: 'og:url', content: 'https://portfolio.renkebrixel.workers.dev/' },
  );
  assert.deepEqual(
    links.find((link) => link.rel === 'canonical'),
    { rel: 'canonical', href: 'https://portfolio.renkebrixel.workers.dev/' },
  );
});

await test('the bare root follows a remembered German choice', () => {
  assert.deepEqual(runLocaleScript('/', 'de'), {
    replacedWith: '/de/?ref=cv#career',
    hidden: true,
  });
});

await test('the script leaves the page alone otherwise', () => {
  const untouched = { replacedWith: '', hidden: false };

  assert.deepEqual(runLocaleScript('/', null), untouched);
  assert.deepEqual(runLocaleScript('/', 'en'), untouched);
  assert.deepEqual(runLocaleScript('/', 'constructor'), untouched);
  assert.deepEqual(runLocaleScript('/de/', 'de'), untouched);
});
