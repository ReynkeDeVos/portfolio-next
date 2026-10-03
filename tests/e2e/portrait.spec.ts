import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

import { waitForHydration } from './page.ts';

// Records every view transition the page starts: its types, the pseudo-elements
// animating once it is ready, and whether it finished. Each transition is one
// line on the root's dataset, fields separated by '|'.
async function recordViewTransitions(page: Page) {
  await page.addInitScript(() => {
    const start = document.startViewTransition.bind(document);
    const lines: string[] = [];

    document.startViewTransition = (options) => {
      const transition = start(options);

      if (options !== undefined && 'types' in options) {
        const index = lines.length;
        const types = (options.types ?? []).join(' ');
        let animated = '';

        const write = (state: string) => {
          lines[index] = `${types}|${animated}|${state}`;
          document.documentElement.dataset.viewTransitions = lines.join('\n');
        };

        const follow = async () => {
          write('started');

          try {
            await transition.ready;
            animated = document
              .getAnimations()
              .flatMap(({ effect }) =>
                effect instanceof KeyframeEffect && effect.pseudoElement
                  ? [effect.pseudoElement]
                  : [],
              )
              .join(' ');
            write('ready');
            await transition.finished;
            write('finished');
          } catch {
            write('failed');
          }
        };

        void follow();
      }

      return transition;
    };
  });
}

async function viewTransitions(page: Page) {
  const recorded = await page.locator('html').getAttribute('data-view-transitions');

  return (recorded ?? '').split('\n').map((line) => {
    const [types = '', animated = '', state = ''] = line.split('|');

    return { types, animated: animated.split(' '), state };
  });
}

async function waitForFinishedTransitions(page: Page, count: number) {
  await expect
    .poll(async () => {
      const transitions = await viewTransitions(page);

      return transitions.filter(({ state }) => state === 'finished').length;
    })
    .toBe(count);
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
  const photo = viewer.getByRole('img', { name: 'Renke Brixel standing with a laptop' });
  await expect(photo).toBeVisible();
  // A box with width and height shows even when the photo fails to load.
  await expect
    .poll(() =>
      photo.evaluate(
        (element) =>
          element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0,
      ),
    )
    .toBe(true);
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
  await waitForFinishedTransitions(page, 1);
  await page.keyboard.press('Escape');
  await waitForFinishedTransitions(page, 2);

  const [opening, closing] = await viewTransitions(page);
  expect(opening?.types).toBe('morph morph-open');
  expect(opening?.animated).toContain('::view-transition-group(morph)');
  expect(closing?.types).toBe('morph morph-close');
  expect(closing?.animated).toContain('::view-transition-group(morph)');
});

test('with reduced motion the viewer cross-fades in place', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await recordViewTransitions(page);
  await openViewer(page);
  await waitForFinishedTransitions(page, 1);
  await page.keyboard.press('Escape');
  await waitForFinishedTransitions(page, 2);

  for (const transition of await viewTransitions(page)) {
    expect(transition.types).toBe('morph-fade');
    // Nothing travels: no element carries the morph name, only the page fades.
    expect(transition.animated).not.toContain('::view-transition-group(morph)');
    expect(transition.animated).toContain('::view-transition-new(root)');
  }
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
