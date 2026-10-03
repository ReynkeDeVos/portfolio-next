import { expect, test } from '@playwright/test';

import { waitForHydration } from './page.ts';

// Runs in the browser. Finds the panel's first focusable element, whether
// any visible text comes before it and where focus is now. Visually hidden
// text, such as the sr-only Section heading, does not count: a sighted
// keyboard user never sees it.
function panelStart(panel: HTMLElement) {
  const focusable = 'a[href], button, input, select, textarea, summary, [tabindex]';

  // Hidden by display, visibility or content-visibility, or clipped into a
  // 1px box the way sr-only does it.
  function visuallyHidden(element: Element) {
    if (!element.checkVisibility({ visibilityProperty: true, contentVisibilityAuto: true })) {
      return true;
    }

    for (let node: Element | null = element; node && node !== panel; node = node.parentElement) {
      const { width, height } = node.getBoundingClientRect();

      if (getComputedStyle(node).overflow === 'hidden' && width <= 1 && height <= 1) {
        return true;
      }
    }

    return false;
  }

  const first = [...panel.querySelectorAll<HTMLElement>(focusable)].find(
    (element) => element.tabIndex >= 0 && !visuallyHidden(element),
  );

  let textBefore = false;
  const walker = document.createTreeWalker(panel, NodeFilter.SHOW_TEXT);

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const before = first?.compareDocumentPosition(node) ?? Node.DOCUMENT_POSITION_PRECEDING;

    if (first?.contains(node) || !(before & Node.DOCUMENT_POSITION_PRECEDING)) {
      break;
    }

    if (node.textContent?.trim() && node.parentElement && !visuallyHidden(node.parentElement)) {
      textBefore = true;
      break;
    }
  }

  let focus = 'elsewhere';

  if (document.activeElement === panel) {
    focus = 'panel';
  } else if (first && document.activeElement === first) {
    focus = 'first link';
  }

  return { startsWithLink: first !== undefined && !textBefore, focus };
}

// The tab names each Locale shows, in Section order.
const tabNames = {
  en: ['Work', 'Career', 'Skills', 'Workflow'],
  de: ['Projekte', 'Werdegang', 'Kenntnisse', 'Workflow'],
};

for (const [locale, names] of Object.entries(tabNames)) {
  const path = locale === 'en' ? '/' : `/${locale}/`;

  for (const name of names) {
    // WAI-ARIA tabs: a panel is a Tab stop exactly when its first visible
    // content is not its first link. Checking both directions keeps the
    // panels' startsWithLink settings in step with what they render.
    test(`${name} (${locale}) is a Tab stop exactly when it does not start with a link`, async ({
      page,
    }) => {
      await page.goto(path);
      await waitForHydration(page);
      const tab = page.getByRole('tab', { name, exact: true });
      await tab.click();
      const panel = page.getByRole('tabpanel');

      const { startsWithLink } = await panel.evaluate(panelStart);
      await expect(panel).toHaveAttribute('tabindex', startsWithLink ? '-1' : '0');

      await tab.focus();
      await page.keyboard.press('Tab');

      await expect
        .poll(async () => {
          const { focus } = await panel.evaluate(panelStart);

          return focus;
        })
        .toBe(startsWithLink ? 'first link' : 'panel');
    });
  }
}
