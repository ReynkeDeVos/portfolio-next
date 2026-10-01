import { createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: 'render',
    defaultPreloadStaleTime: Infinity,
    scrollRestoration: true,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

export { getRouter };
