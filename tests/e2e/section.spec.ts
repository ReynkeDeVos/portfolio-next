import { expect, test } from '@playwright/test';

import { blockHydration, waitForHydration } from './page.ts';

test('the bare address opens Work', async ({ page }) => {
  await page.goto('/');
  await waitForHydration(page);

  await expect(page.getByRole('tab', { name: 'Work', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('tabpanel', { name: 'Work', exact: true })).toBeVisible();
});

test('a shared Section link shows that Section before hydration', async ({ page }) => {
  await blockHydration(page);
  await page.goto('/#career');

  await expect(page.getByRole('tabpanel', { name: 'Career' })).toBeVisible();
  await expect(page.getByRole('tabpanel', { name: 'Work', exact: true })).toBeHidden();
});

test('a shared Section link selects that Section once hydrated', async ({ page }) => {
  await page.goto('/de/#career');
  await waitForHydration(page);

  await expect(page.getByRole('tab', { name: 'Werdegang' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('tabpanel', { name: 'Werdegang' })).toBeVisible();

  // Once React has the Section, the pre-hydration display must let go of it.
  await page.getByRole('tab', { name: 'Projekte' }).click();
  await expect(page.getByRole('tabpanel', { name: 'Projekte' })).toBeVisible();
  await expect(page.getByRole('tabpanel', { name: 'Werdegang' })).toBeHidden();
});

test('switching Sections puts the Section in the address and keeps the search', async ({
  page,
}) => {
  await page.goto('/?ref=cv');
  await waitForHydration(page);

  await page.getByRole('tab', { name: 'Skills' }).click();
  await expect(page).toHaveURL('/?ref=cv#skills');
  await expect(page.getByRole('tabpanel', { name: 'Skills' })).toBeVisible();

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
  // Counts every scroll, so a reset that is later restored still shows.
  await page.evaluate(() => {
    globalThis.addEventListener('scroll', () => {
      document.documentElement.dataset.scrolls = String(
        Number(document.documentElement.dataset.scrolls ?? 0) + 1,
      );
    });
  });

  await page.getByRole('tab', { name: 'Career' }).click();
  await expect(page).toHaveURL('/#career');
  await expect(page.getByRole('tabpanel', { name: 'Career' })).toBeVisible();
  // A reset would follow the router's render; leave room for it to happen.
  await page.waitForTimeout(300);

  await expect(page.locator('html')).not.toHaveAttribute('data-scrolls');
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

test('Back and Forward through hash links select their Sections', async ({ page }) => {
  await page.goto('/');
  await waitForHydration(page);

  // Unlike the tabs, plain hash links push history entries.
  await page.evaluate(() => {
    globalThis.location.hash = '#career';
  });
  await page.evaluate(() => {
    globalThis.location.hash = '#skills';
  });
  await expect(page.getByRole('tab', { name: 'Skills' })).toHaveAttribute('aria-selected', 'true');

  await page.goBack();
  await expect(page).toHaveURL('/#career');
  await expect(page.getByRole('tab', { name: 'Career' })).toHaveAttribute('aria-selected', 'true');

  await page.goForward();
  await expect(page).toHaveURL('/#skills');
  await expect(page.getByRole('tab', { name: 'Skills' })).toHaveAttribute('aria-selected', 'true');
});

test('a shared Section link carries its Section into the Locale links', async ({ page }) => {
  await page.goto('/#career');
  await waitForHydration(page);

  // Hydration keeps the prerendered hrefs, so the Section has to arrive after it.
  await expect(page.getByRole('link', { name: 'Deutsch' })).toHaveAttribute('href', '/de/#career');
  await expect(page.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/#career');
});

test('the portrait frame turns one lobe per Section change, in its direction', async ({ page }) => {
  await page.goto('/');
  await waitForHydration(page);
  // The frame is the clip path's shape; its rotation settles after the transition.
  const frame = page.locator('#portrait-cookie path');

  await page.getByRole('tab', { name: 'Workflow' }).click();
  await expect(frame).toHaveCSS('rotate', '30deg');

  await page.getByRole('tab', { name: 'Career' }).click();
  await expect(frame).toHaveCSS('rotate', '0deg');
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
