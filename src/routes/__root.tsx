import googleSansFlexLatin from '@fontsource-variable/google-sans-flex/files/google-sans-flex-latin-wght-normal.woff2?url';
import robotoFlexLatin from '@fontsource-variable/roboto-flex/files/roboto-flex-latin-wght-normal.woff2?url';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router';

import { localeFromPathname } from '@/components/copy';
import { NotFound } from '@/components/not-found';
import { themeScript } from '@/lib/theme';

import appCss from '../styles.css?url';

const favicon = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="50" font-size="88" text-anchor="middle" dominant-baseline="central">🦊</text></svg>',
)}`;

const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [
      {
        rel: 'preload',
        href: robotoFlexLatin,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: googleSansFlexLatin,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
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
    // The head script may set data-theme before hydration.
    <html lang={localeFromPathname(pathname)} suppressHydrationWarning>
      <head>
        {/* Reviewed: themeScript is a constant string with no external input. */}
        {/* fallow-ignore-next-line security-sink */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
