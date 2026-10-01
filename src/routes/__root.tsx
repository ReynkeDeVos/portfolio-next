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
import { themeScript } from '@/lib/theme';

import appCss from '../styles.css?url';

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
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: Root,
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
