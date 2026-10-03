import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

import { waitForHydration } from './page.ts';

// Records the types of every view transition the page starts, as one
// space-separated entry per transition on the root's dataset.
async function recordViewTransitions(page: Page) {
  await page.addInitScript(() => {
    const start = document.startViewTransition.bind(document);
    const recorded: string[] = [];

    document.startViewTransition = (options) => {
      if (options !== undefined && 'types' in options) {
        recorded.push((options.types ?? []).join(' '));
        document.documentElement.dataset.viewTransitions = recorded.join(',');
      }

      return start(options);
    };
  });
}

async function viewTransitionTypes(page: Page) {
  const recorded = await page.locator('html').getAttribute('data-view-transitions');

  return (recorded ?? '').split(',').map((entry) => entry.split(' '));
}

async function openViewer(page: Page) {
  await page.goto('/');
  await waitForHydration(page);
  const thumbnail = page.getByRole('button', { name: /View larger portrait/u });
  await thumbnail.click();

  return thumbnail;
}

test('the Portrait viewer opens with the large photo and closes with Escape', async ({ page }) => {
  const thumbnail = await openViewer(page);
  const viewer = page.getByRole('dialog', { name: 'Portrait of Renke Brixel' });

  await expect(viewer).toBeVisible();
  await expect(
    viewer.getByRole('img', { name: 'Renke Brixel standing with a laptop' }),
  ).toBeVisible();
  await expect(viewer.getByRole('button', { name: 'Close photo' })).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(viewer).toBeHidden();
  await expect(thumbnail).toBeFocused();
});

test('the close button closes the Portrait viewer and returns focus', async ({ page }) => {
  const thumbnail = await openViewer(page);

  await page.getByRole('button', { name: 'Close photo' }).click();

  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(thumbnail).toBeFocused();
});

test('opening and closing morph the frame into the viewer', async ({ page }) => {
  await recordViewTransitions(page);
  await openViewer(page);
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();

  expect(await viewTransitionTypes(page)).toEqual([
    ['morph', 'morph-open'],
    ['morph', 'morph-close'],
  ]);
});

test('with reduced motion the viewer cross-fades in place', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await recordViewTransitions(page);
  await openViewer(page);
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();

  expect(await viewTransitionTypes(page)).toEqual([['morph-fade'], ['morph-fade']]);
});

test('without view transitions the viewer still opens and closes', async ({ page }) => {
  await page.addInitScript(() => {
    Reflect.deleteProperty(Document.prototype, 'startViewTransition');
  });
  const thumbnail = await openViewer(page);

  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(thumbnail).toBeFocused();
});
