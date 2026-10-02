import { createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: 'render',
    defaultPreloadStaleTime: Infinity,
    scrollRestoration: true,
    // Matches the static asset paths, so links never hit Cloudflare's slash redirect.
    trailingSlash: 'always',
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

export { getRouter };
