const locales = ['en', 'de'] as const;

type Locale = (typeof locales)[number];

// The default Locale lives at the site root.
const defaultLocale = 'en' satisfies Locale;

// Paths end in a slash, like the router's links and the static asset paths,
// so no address hits Cloudflare's slash redirect.
const localeSettings = {
  en: { path: '/', intl: 'en-US', openGraph: 'en_US' },
  de: { path: '/de/', intl: 'de-DE', openGraph: 'de_DE' },
} as const satisfies Record<Locale, { path: `${string}/`; intl: string; openGraph: string }>;

const siteOrigin = 'https://portfolio.renkebrixel.workers.dev';

const storageKey = 'locale';

function localePath(locale: Locale) {
  return localeSettings[locale].path;
}

function localeFromPathname(pathname: string): Locale {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;

  return (
    locales.find((locale) => locale !== defaultLocale && path.startsWith(localePath(locale))) ??
    defaultLocale
  );
}

function intlLocale(locale: Locale) {
  return localeSettings[locale].intl;
}

// Head tags that tie the Locales together for search engines and link previews.
// The canonical address folds query variants such as ?ref=cv into one page.
function localeHead(locale: Locale) {
  const url = (target: Locale) => new URL(localePath(target), siteOrigin).href;

  return {
    meta: [
      { property: 'og:url', content: url(locale) },
      { property: 'og:locale', content: localeSettings[locale].openGraph },
    ],
    links: [
      { rel: 'canonical', href: url(locale) },
      ...locales.map((target) => ({ rel: 'alternate', hrefLang: target, href: url(target) })),
      { rel: 'alternate', hrefLang: 'x-default', href: url(defaultLocale) },
    ],
  };
}

// Where a remembered choice redirects the bare root: every Locale but the default.
const redirectPaths = Object.fromEntries(
  locales.flatMap((locale) => (locale === defaultLocale ? [] : [[locale, localePath(locale)]])),
);

// Runs in the document head before first paint. Only the bare root follows the
// stored choice, so explicit Locale links and section hashes keep working.
// Hiding the page avoids a flash of English while the other Locale loads.
const localeScript = `try{const s=localStorage.getItem('${storageKey}'),p=${JSON.stringify(redirectPaths)};if(location.pathname==='/'&&s&&Object.hasOwn(p,s)){location.replace(p[s]+location.search+location.hash);document.documentElement.hidden=true}}catch{}`;

function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(storageKey, locale);
  } catch {
    // The URL still carries the Locale for this visit.
  }
}

export {
  defaultLocale,
  intlLocale,
  localeFromPathname,
  localeHead,
  localePath,
  locales,
  localeScript,
  rememberLocale,
};

export type { Locale };
