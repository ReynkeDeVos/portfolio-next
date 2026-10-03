import assert from 'node:assert/strict';
import { test } from 'node:test';

import { notFoundHead, pageHead } from './head.ts';

const origin = 'https://portfolio.renkebrixel.workers.dev';

// The owner's name comes from Content, the words around it from Copy.
const expected = [
  {
    locale: 'en',
    title: 'Renke Brixel · Dev',
    notFound: 'Page not found · Renke Brixel',
    path: '/',
  },
  {
    locale: 'de',
    title: 'Renke Brixel · Dev',
    notFound: 'Seite nicht gefunden · Renke Brixel',
    path: '/de/',
  },
] as const;

await test('each Locale page titles itself with the owner and points at its own address', () => {
  for (const { locale, title, path } of expected) {
    const { meta, links } = pageHead(locale);

    assert.deepEqual(meta[0], { title });
    assert.deepEqual(
      meta.find((tag) => 'property' in tag && tag.property === 'og:title'),
      { property: 'og:title', content: title },
    );
    assert.deepEqual(
      links.filter((link) => link.rel === 'canonical'),
      [{ rel: 'canonical', href: `${origin}${path}` }],
    );
  }
});

await test('the not-found page carries the owner in its title and stays out of search', () => {
  for (const { locale, notFound } of expected) {
    assert.deepEqual(notFoundHead(locale), { title: notFound, robots: 'noindex' });
  }
});
