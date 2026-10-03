import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// React has taken over once the tab list carries a fiber. Until then the
// prerendered markup and the head scripts' root marks are all there is.
async function waitForHydration(page: Page) {
  await expect
    .poll(() =>
      page
        .getByRole('tablist')
        .evaluate((element) => Object.keys(element).some((key) => key.startsWith('__reactFiber'))),
    )
    .toBe(true);
}

// Serves the prerendered HTML but none of the client scripts, so the page
// stays as the head scripts left it before hydration.
async function blockHydration(page: Page) {
  await page.route('**/assets/*.js', (route) => route.abort());
}

export { blockHydration, waitForHydration };
