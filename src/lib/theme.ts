import { useSyncExternalStore } from 'react';

import { cookiePath, cookieReach, lobes } from './cookie.ts';
import { startViewTransition } from './view-transition.ts';

type ThemePreference = 'system' | 'light' | 'dark';

const storageKey = 'theme';

// Runs in the document head before first paint. Storage may be blocked.
const themeScript = `try{const t=localStorage.getItem('${storageKey}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch{}`;

const listeners = new Set<() => void>();

function readTheme(): ThemePreference {
  const value = document.documentElement.dataset.theme;

  return value === 'light' || value === 'dark' ? value : 'system';
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

// One attribute mutation swaps every color token at once; CSS follows the
// system scheme while no explicit preference is set.
function setTheme(preference: ThemePreference) {
  const root = document.documentElement;

  if (preference === 'system') {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = preference;
  }

  try {
    if (preference === 'system') {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, preference);
    }
  } catch {
    // The choice still applies for this page view.
  }

  for (const listener of listeners) {
    listener();
  }
}

// The radius at which the reveal's lobes reach their full depth, about the
// largest Portrait frame's.
const fullLobes = 72;

// A cubic-bezier() coordinate at parameter `at`, given its two control values.
function bezier(first: number, second: number, at: number) {
  return 3 * (1 - at) ** 2 * at * first + 3 * (1 - at) * at ** 2 * second + at ** 3;
}

// The share of the time a CSS cubic-bezier() curve takes to reach `progress`.
// Both curves rise steadily, so halving the bezier parameter finds it.
function timeAt(progress: number, easing: string) {
  const [x1 = 0, y1 = 0, x2 = 1, y2 = 1] = (easing.match(/-?[\d.]+/gu) ?? []).map(Number);

  let low = 0;

  let high = 1;

  for (let round = 0; round < 24; round += 1) {
    const middle = (low + high) / 2;

    if (bezier(y1, y2, middle) < progress) {
      low = middle;
    } else {
      high = middle;
    }
  }

  return bezier(x1, x2, (low + high) / 2);
}

function isDark(preference: ThemePreference) {
  return (
    preference === 'dark' ||
    (preference === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  );
}

// The new theme grows out of the pressed control as the Portrait's cookie and
// turns one lobe on its way out, the way the frame turns one lobe per Section.
// The whole document switches at once underneath; only its new snapshot is
// clipped, on the Material emphasized curve at the fast spatial speed.
// Chromium ignores clicks until a view transition ends, so the reveal stays
// short and ends exactly as its edge leaves the last viewport corner: one
// lobe on, the cookie is back in its
// starting shape, which fixes the radius that just reaches every corner.
// Reduced motion cross-fades instead, and a choice that keeps the same
// colours, such as System while the system is already light, applies without
// a transition.
async function revealTheme(preference: ThemePreference, from: Element) {
  const update = () => {
    setTheme(preference);
  };

  if (isDark(preference) === isDark(readTheme())) {
    update();

    return;
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startViewTransition(update, []);

    return;
  }

  const box = from.getBoundingClientRect();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  const corners = [
    [0, 0],
    [innerWidth, 0],
    [0, innerHeight],
    [innerWidth, innerHeight],
  ] as const;

  const radius = Math.max(
    ...corners.map(
      ([cx, cy]) => Math.hypot(cx - x, cy - y) / cookieReach(Math.atan2(cy - y, cx - x)),
    ),
  );

  // The speed and curve come from the motion tokens in styles.css, which the
  // Portrait morph shares. The minifier may rewrite 350ms as .35s.
  const tokens = getComputedStyle(document.documentElement);
  const speed = tokens.getPropertyValue('--transition-duration-spatial-fast');
  const easing = tokens.getPropertyValue('--ease-emphasized');

  // The curve throws the cookie out fast, so a turn on the same curve would
  // spin it hardest while it is still small. The turn follows the clock
  // instead, and the lobes grow in as the cookie does: it leaves the control
  // as a calm round bloom and is a full cookie by the time it is as large as
  // the Portrait. Frames crowd the start, where the shape changes most.
  const steps = 16;

  const frames = Array.from({ length: steps + 1 }, (_, step) => {
    const progress = (step / steps) ** 2;
    const grown = radius * progress;
    const turn = timeAt(progress, easing) * ((Math.PI * 2) / lobes);
    const depth = Math.min(1, grown / fullLobes);

    return { offset: progress, clipPath: `path('${cookiePath(grown, x, y, turn, depth)}')` };
  });

  try {
    await startViewTransition(update, ['theme'])?.ready;
  } catch {
    // A newer choice skipped this transition; it already applied.
    return;
  }

  document.documentElement.animate(frames, {
    // parseFloat, unlike Number, reads past the unit.
    // oxlint-disable-next-line unicorn/prefer-number-coercion
    duration: Number.parseFloat(speed) * (speed.endsWith('ms') ? 1 : 1000),
    easing,
    pseudoElement: '::view-transition-new(root)',
  });
}

function useThemePreference() {
  return useSyncExternalStore(subscribe, readTheme, () => 'system' as const);
}

export { revealTheme, themeScript, useThemePreference };

export type { ThemePreference };
