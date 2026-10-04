import { useSyncExternalStore } from 'react';

import { cookiePath, lobes } from './cookie.ts';
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

function isDark(preference: ThemePreference) {
  return (
    preference === 'dark' ||
    (preference === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  );
}

// The new theme grows out of the pressed control as the Portrait's cookie and
// turns one lobe on its way out, the way the frame turns one lobe per Section.
// The whole document switches at once underneath; only its new snapshot is
// clipped, on the Material emphasized curve. The valleys sit at 94% of the
// radius, so the final shape clears the farthest viewport corner. Reduced
// motion cross-fades instead, and a choice that keeps the same colours, such
// as System while the system is already light, applies without a transition.
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
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) / 0.94;
  const steps = 8;

  const frames = Array.from({ length: steps + 1 }, (_, step) => ({
    clipPath: `path('${cookiePath((radius * step) / steps, x, y, (step / steps) * ((Math.PI * 2) / lobes))}')`,
  }));

  try {
    await startViewTransition(update, ['theme'])?.ready;
  } catch {
    // A newer choice skipped this transition; it already applied.
    return;
  }

  document.documentElement.animate(frames, {
    duration: 500,
    easing: 'cubic-bezier(0.2, 0, 0, 1)',
    pseudoElement: '::view-transition-new(root)',
  });
}

function useThemePreference() {
  return useSyncExternalStore(subscribe, readTheme, () => 'system' as const);
}

export { revealTheme, themeScript, useThemePreference };

export type { ThemePreference };
