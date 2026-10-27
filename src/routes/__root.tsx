import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router';

// The Latin faces in styles.css, the only ones the English and German text needs.
import googleSansFlexLatin from '@/assets/fonts/google-sans-flex-latin.woff2?url';
import robotoFlexLatin from '@/assets/fonts/roboto-flex-latin.woff2?url';
import { NotFound, NotFoundHead } from '@/components/not-found';
import { buildDisclosureScript } from '@/lib/build-disclosure';
import { engineScript } from '@/lib/engine';
import { localeFromPathname, localeScript } from '@/lib/locale';
import { sectionScript, sectionStyles } from '@/lib/section';
import { themeScript } from '@/lib/theme';

import appCss from '../styles.css?url';

const favicon = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="50" font-size="88" text-anchor="middle" dominant-baseline="central">🦊</text></svg>',
)}`;

// Tags every document shares.
const Route = createRootRoute({
  head: () => ({
    meta: [
      // HTML only allows the label utf-8 here; the lint rule targets JavaScript APIs.
      // oxlint-disable-next-line unicorn/text-encoding-identifier-case
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [
      ...[robotoFlexLatin, googleSansFlexLatin].map((href) => ({
        rel: 'preload',
        href,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous' as const,
      })),
      { rel: 'icon', href: favicon, type: 'image/svg+xml' },
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: Root,
  notFoundComponent: NotFound,
});

function Root() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const locale = localeFromPathname(pathname);

  // shortcut: reads the router's internal flag for an address no page claims;
  // switch once TanStack Router exposes a public one. A browser test guards it.
  const notFound = useRouterState({
    select: (state) => state.matches.some((match) => match._notFound),
  });

  return (
    // The head scripts may mark the root before hydration.
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* First, so the charset lands in the first 1024 bytes: Redact keeps
            head order where React hoists these tags. */}
        <HeadContent />
        {notFound && <NotFoundHead locale={locale} />}
        <script>
          {localeScript + themeScript + engineScript + sectionScript + buildDisclosureScript}
        </script>
        {/* The pre-hydration Section rules are built from the Section list, so they
            can't live in the theme CSS; here they still apply before first paint. */}
        {/* oxlint-disable shadcn/no-inline-styles */}
        <style>{sectionStyles}</style>
        {/* oxlint-enable shadcn/no-inline-styles */}
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

export { Route };
