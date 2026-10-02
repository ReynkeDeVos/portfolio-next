import assert from 'node:assert/strict';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import { localeFromPathname, localeHead, localePath, locales, localeScript } from './locale.ts';

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

  const documentElement = { hidden: false };

  runInNewContext(localeScript, {
    location,
    localStorage: { getItem: () => stored },
    document: { documentElement },
  });

  return { replacedWith, hidden: documentElement.hidden };
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

  assert.deepEqual(meta, [{ property: 'og:locale', content: 'de_DE' }]);
  assert.deepEqual(links, [
    { rel: 'alternate', hrefLang: 'en', href: 'https://portfolio.renkebrixel.workers.dev/' },
    { rel: 'alternate', hrefLang: 'de', href: 'https://portfolio.renkebrixel.workers.dev/de/' },
    { rel: 'alternate', hrefLang: 'x-default', href: 'https://portfolio.renkebrixel.workers.dev/' },
  ]);
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
