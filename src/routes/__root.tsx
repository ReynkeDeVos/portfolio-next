import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router';

import { NotFound } from '@/components/not-found';
import googleSansFlexSubset from '@/generated/fonts/google-sans-flex-subset.woff2?url';
import robotoFlexSubset from '@/generated/fonts/roboto-flex-subset.woff2?url';
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
      ...[robotoFlexSubset, googleSansFlexSubset].map((href) => ({
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

  return (
    // The head scripts may mark the root before hydration.
    <html lang={localeFromPathname(pathname)} suppressHydrationWarning>
      <head>
        <script>{localeScript + themeScript + engineScript + sectionScript}</script>
        {/* The pre-hydration Section rules are built from the Section list, so they
            can't live in the theme CSS; here they still apply before first paint. */}
        {/* oxlint-disable shadcn/no-inline-styles */}
        <style>{sectionStyles}</style>
        {/* oxlint-enable shadcn/no-inline-styles */}
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

export { Route };
