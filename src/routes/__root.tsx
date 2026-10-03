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
import { documentHead } from '@/head/head';
import { engineScript } from '@/lib/engine';
import { localeFromPathname, localeScript } from '@/lib/locale';
import { sectionScript, sectionStyles } from '@/lib/section';
import { themeScript } from '@/lib/theme';

import appCss from '../styles.css?url';

const Route = createRootRoute({
  head: () => documentHead([robotoFlexSubset, googleSansFlexSubset], appCss),
  component: Root,
  notFoundComponent: NotFound,
});

function Root() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    // The head scripts may mark the root before hydration.
    <html lang={localeFromPathname(pathname)} suppressHydrationWarning>
      <head>
        {/* Reviewed: the scripts are constant strings with no external input. */}
        {/* fallow-ignore-next-line security-sink */}
        <script
          dangerouslySetInnerHTML={{
            __html: localeScript + themeScript + engineScript + sectionScript,
          }}
        />
        {/* The pre-hydration Section rules are built from the Section list, so they
            can't live in the theme CSS; here they still apply before first paint. */}
        {/* oxlint-disable shadcn/no-inline-styles */}
        {/* Reviewed: the rules are a constant string built from the Section names. */}
        {/* fallow-ignore-next-line security-sink */}
        <style dangerouslySetInnerHTML={{ __html: sectionStyles }} />
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
