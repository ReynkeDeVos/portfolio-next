import { contentFor } from '../content/content.ts';
import { copy } from '../copy/copy.ts';
import { localeHead } from '../lib/locale.ts';
import type { Locale } from '../lib/locale.ts';

// One Locale's page: the owner's name from Content, Copy's description, and
// the Locale tags that tie the pages together.
function pageHead(locale: Locale) {
  const { meta } = copy[locale];
  const title = `${contentFor(locale).profile.name} · Dev`;
  const tags = localeHead(locale);

  return {
    meta: [
      { title },
      { name: 'description', content: meta.description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: meta.description },
      { property: 'og:type', content: 'website' },
      ...tags.meta,
    ],
    links: tags.links,
  };
}

// The not-found page renders these itself; it has no route head of its own.
function notFoundHead(locale: Locale) {
  return {
    title: copy[locale].notFound.title(contentFor(locale).profile.name),
    robots: 'noindex',
  };
}

export { notFoundHead, pageHead };
