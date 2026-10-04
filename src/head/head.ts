import { contentFor } from '../content/content.ts';
import { localeHead } from '../lib/locale.ts';
import type { Locale } from '../lib/locale.ts';
import { uiText } from '../ui-text/ui-text.ts';

// One Locale's page: the owner's name from Content, the description from the
// UI text, and the Locale tags that tie the pages together.
function pageHead(locale: Locale) {
  const { meta } = uiText[locale];
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
    title: uiText[locale].notFound.title(contentFor(locale).profile.name),
    robots: 'noindex',
  };
}

export { notFoundHead, pageHead };
