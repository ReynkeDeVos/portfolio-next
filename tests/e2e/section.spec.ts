import { expect, test } from '@playwright/test';

import { blockHydration, waitForHydration } from './page.ts';

test('the bare address opens Work', async ({ page }) => {
  await page.goto('/');
  await waitForHydration(page);

  await expect(page.getByRole('tab', { name: 'Work', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('tabpanel')).toHaveAttribute('data-section', 'work');
});

test('a shared Section link shows that Section before hydration', async ({ page }) => {
  await blockHydration(page);
  await page.goto('/#career');

  await expect(page.locator('html')).toHaveAttribute('data-section', 'career');
  await expect(page.locator('[data-slot="tabs-content"][data-section="career"]')).toBeVisible();
  await expect(page.locator('[data-slot="tabs-content"][data-section="work"]')).toBeHidden();
});

test('a shared Section link selects that Section once hydrated', async ({ page }) => {
  await page.goto('/de/#career');
  await waitForHydration(page);

  await expect(page.getByRole('tab', { name: 'Werdegang' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('tabpanel')).toHaveAttribute('data-section', 'career');
  await expect(page.locator('html')).not.toHaveAttribute('data-section');
});

test('switching Sections puts the Section in the address and keeps the search', async ({
  page,
}) => {
  await page.goto('/?ref=cv');
  await waitForHydration(page);

  await page.getByRole('tab', { name: 'Skills' }).click();
  await expect(page).toHaveURL('/?ref=cv#skills');
  await expect(page.getByRole('tabpanel')).toHaveAttribute('data-section', 'skills');

  // The default Section needs no hash.
  await page.getByRole('tab', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL('/?ref=cv');
});

test('switching Sections keeps the scroll position', async ({ page }) => {
  // On a phone the tabs sit below the profile, so the page can scroll while
  // they stay in view and clicking one needs no scroll of its own.
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/');
  await waitForHydration(page);

  await page.getByRole('tablist').evaluate((element) => {
    globalThis.scrollTo(0, element.getBoundingClientRect().top + globalThis.scrollY - 80);
  });
  const before = await page.evaluate(() => globalThis.scrollY);
  expect(before).toBeGreaterThan(0);

  await page.getByRole('tab', { name: 'Career' }).click();
  await expect(page).toHaveURL('/#career');
  await expect(page.getByRole('tabpanel')).toHaveAttribute('data-section', 'career');
  // A reset would follow the router's render; give it time to show.
  await page.waitForTimeout(200);

  expect(await page.evaluate(() => globalThis.scrollY)).toBe(before);
});

test('Section switches replace the history entry, so Back leaves the page', async ({ page }) => {
  await page.goto('/de/');
  await waitForHydration(page);
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL('/');

  await page.getByRole('tab', { name: 'Career' }).click();
  await page.getByRole('tab', { name: 'Skills' }).click();
  await expect(page).toHaveURL('/#skills');

  await page.goBack();
  await expect(page).toHaveURL('/de/');
});

test('switching Locale keeps the open Section', async ({ page }) => {
  await page.goto('/?ref=cv');
  await waitForHydration(page);

  await page.getByRole('tab', { name: 'Career' }).click();
  await page.getByRole('link', { name: 'Deutsch' }).click();

  await expect(page).toHaveURL('/de/#career');
  await expect(page.getByRole('tab', { name: 'Werdegang' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('a hash change from outside the tabs opens that Section', async ({ page }) => {
  await page.goto('/');
  await waitForHydration(page);

  await page.evaluate(() => {
    globalThis.location.hash = '#workflow';
  });

  await expect(page.getByRole('tab', { name: 'Workflow' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('the portrait frame turns one lobe per Section change, in its direction', async ({ page }) => {
  await page.goto('/');
  await waitForHydration(page);
  const frame = page.getByRole('button', { name: /View larger portrait/u });

  await page.getByRole('tab', { name: 'Workflow' }).click();
  await expect(frame).toHaveCSS('--portrait-angle', '30deg');

  await page.getByRole('tab', { name: 'Career' }).click();
  await expect(frame).toHaveCSS('--portrait-angle', '0deg');
});

test.describe('outside Chromium', () => {
  // The Engine note shows only where no Chromium brand is reported.
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'userAgentData', { value: undefined });
    });
  });

  test('dismissing the Engine note moves focus to the open Section', async ({ page }) => {
    await page.goto('/#skills');
    await waitForHydration(page);

    await page.getByRole('button', { name: 'Hide this note' }).click();

    await expect(page.getByRole('complementary')).toBeHidden();
    await expect(page.getByRole('tab', { name: 'Skills' })).toBeFocused();
  });
});
