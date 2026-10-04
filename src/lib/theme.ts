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
// largest Portrait frame's, and the deepest they get in pixels, like a
// Material shape measured in dp. Lobes that kept growing with the screen
// would leave deep scallops creeping along the far edges of a large screen
// while the reveal slows down at its end.
const fullLobes = 72;

const deepestLobe = 80;

// The cookie's lobe depth as a share of its radius at full depth.
const lobeSpan = cookieReach(0) - cookieReach(Math.PI / lobes);

// How deep the reveal's lobes are at `radius`: they grow in while it is
// small and keep a fixed depth in pixels once it is large.
function lobeDepth(radius: number) {
  return Math.min(1, radius / fullLobes, deepestLobe / (lobeSpan * radius));
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

  // The radius whose cookie just reaches the farthest corner. Its lobe depth
  // depends on the radius in turn, so a few rounds settle both.
  const reaching = (depth: number) =>
    Math.max(
      ...corners.map(
        ([cx, cy]) => Math.hypot(cx - x, cy - y) / cookieReach(Math.atan2(cy - y, cx - x), depth),
      ),
    );

  let radius = reaching(1);

  for (let round = 0; round < 3; round += 1) {
    radius = reaching(lobeDepth(radius));
  }

  // The speed and curve come from the motion tokens in styles.css, which the
  // Portrait morph shares. The minifier may rewrite 350ms as .35s.
  const tokens = getComputedStyle(document.documentElement);
  const speed = tokens.getPropertyValue('--transition-duration-spatial-fast');
  const easing = tokens.getPropertyValue('--ease-emphasized');

  // Small, the cookie's lobes read as a spiky star, so they grow in with the
  // size: it leaves the control as a round bloom and is a full cookie by the
  // time it is as large as the Portrait. The frames sit evenly along the
  // radius and the animation's easing paces them, so the browser only ever
  // blends between two close cookies.
  const steps = 32;

  const frames = Array.from({ length: steps + 1 }, (_, step) => {
    const grown = (radius * step) / steps;
    const turn = (step / steps) * ((Math.PI * 2) / lobes);

    return { clipPath: `path('${cookiePath(grown, x, y, turn, lobeDepth(grown))}')` };
  });

  try {
    await startViewTransition(update, ['theme'])?.ready;
  } catch {
    // A newer choice skipped this transition; it already applied.
    return;
  }

  // parseFloat, unlike Number, reads past the unit.
  // oxlint-disable-next-line unicorn/prefer-number-coercion
  const duration = Number.parseFloat(speed) * (speed.endsWith('ms') ? 1 : 1000);
  const root = document.documentElement;

  // The new colours fade in over the first quarter, so the first small bloom
  // never flashes at full contrast over the control.
  root.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: duration / 4,
    pseudoElement: '::view-transition-new(root)',
  });
  root.animate(frames, { duration, easing, pseudoElement: '::view-transition-new(root)' });
}

function useThemePreference() {
  return useSyncExternalStore(subscribe, readTheme, () => 'system' as const);
}

export { revealTheme, themeScript, useThemePreference };

export type { ThemePreference };
