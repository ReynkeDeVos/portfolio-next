import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// React has taken over once the portfolio page marks the root. Until then the
// prerendered markup and the head scripts' root marks are all there is.
async function waitForHydration(page: Page) {
  await expect(page.locator(':root')).toHaveAttribute('data-hydrated');
}

// Serves the prerendered HTML but none of the client scripts, so the page
// stays as the head scripts left it before hydration.
async function blockHydration(page: Page) {
  await page.route('**/assets/*.js', (route) => route.abort());
}

export { blockHydration, waitForHydration };
