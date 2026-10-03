import { contentFor } from '../content/content.ts';
import { copy } from '../copy/copy.ts';
import { localeHead } from '../lib/locale.ts';
import type { Locale } from '../lib/locale.ts';

const favicon = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="50" font-size="88" text-anchor="middle" dominant-baseline="central">🦊</text></svg>',
)}`;

// Tags every document shares. The bundler owns the asset URLs, so the root
// route passes them in; Node cannot resolve Vite's ?url imports.
function documentHead(fontUrls: readonly string[], stylesheetUrl: string) {
  return {
    meta: [
      // HTML only allows the label utf-8 here; the lint rule targets JavaScript APIs.
      // oxlint-disable-next-line unicorn/text-encoding-identifier-case
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [
      ...fontUrls.map((href) => ({
        rel: 'preload',
        href,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous' as const,
      })),
      { rel: 'icon', href: favicon, type: 'image/svg+xml' },
      { rel: 'stylesheet', href: stylesheetUrl },
    ],
  };
}

// One Locale's page: Copy's words around the owner's name from Content, plus
// the Locale tags that tie the pages together.
function pageHead(locale: Locale) {
  const { meta } = copy[locale];
  const title = meta.title(contentFor(locale).profile.name);
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

export { documentHead, notFoundHead, pageHead };
