import { contentFor } from '../content/content.ts';
import { localeHead, siteOrigin } from '../lib/locale.ts';
import type { Locale } from '../lib/locale.ts';
import { uiText } from '../ui-text/ui-text.ts';

// One Locale's page: the owner's name from Content, the description from the
// UI text, the Locale tags that tie the pages together, and a link preview
// card in the Locale's own words.
function pageHead(locale: Locale) {
  const { meta } = uiText[locale];
  const { profile } = contentFor(locale);
  const title = `${profile.name} · Dev`;
  const tags = localeHead(locale);
  const image = new URL(`/images/og-${locale}.png`, siteOrigin).href;

  return {
    meta: [
      { title },
      { name: 'description', content: meta.description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: meta.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: image },
      // The size lets a scraper lay out the card on the first share, before it
      // has fetched the image.
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: meta.imageAlt(profile.name, profile.identity) },
      { name: 'twitter:card', content: 'summary_large_image' },
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
