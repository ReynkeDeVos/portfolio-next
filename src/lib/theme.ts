import { useSyncExternalStore } from 'react';

import { cookieRevealFrames } from './outlines.ts';
import { store } from './storage.ts';
import { parseCssDurationMs, runClipTransition } from './view-transition.ts';

const themeOrder = ['system', 'light', 'dark'] as const;

type ThemePreference = (typeof themeOrder)[number];

const storageKey = 'theme';

const themeGroupSlot = 'theme-group';

const segmentPillSlot = 'segment-pill';

// Runs in the document head before first paint. Storage may be blocked.
const themeScript = `try{const t=localStorage.getItem('${storageKey}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch{}`;

// The prerendered theme group presses System. A stored choice is on the root
// before first paint, so these rules move the pill to its exact index in
// `themeOrder` and color its button, agreeing with what React renders once
// hydrated. !important beats the pill's inline position and start; unlayered
// beats the aria-pressed utilities.
const explicitThemes = themeOrder.filter((option) => option !== 'system');

const themeStyles = [
  ...explicitThemes.map((option) => {
    const index = themeOrder.indexOf(option);

    return `:root[data-theme='${option}'] [data-slot='${themeGroupSlot}']>[data-slot='${segmentPillSlot}']{--segment-index:${index}!important;--segment-from:${index}!important}`;
  }),
  ':root[data-theme] [data-theme-option]{color:var(--color-on-surface-variant)}',
  `${explicitThemes
    .map((option) => `:root[data-theme='${option}'] [data-theme-option='${option}']`)
    .join(',')}{color:var(--color-on-secondary-container)}`,
].join('');

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

  store('localStorage', storageKey, preference === 'system' ? null : preference);

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

let themeRequest = 0;

let activeTransition: ViewTransition | null = null;

// The new theme grows out of the pressed control as the Portrait's cookie and
// turns one lobe on its way out. The whole document switches at once
// underneath; only its new snapshot is clipped, on the Material emphasized
// curve at the fast spatial speed. A choice that keeps the same colours, such
// as System while the system is already light, applies without a transition.
async function revealTheme(preference: ThemePreference, from: Element) {
  themeRequest += 1;
  const request = themeRequest;

  const update = () => {
    if (request === themeRequest) {
      setTheme(preference);
    }
  };

  if (isDark(preference) === isDark(readTheme())) {
    activeTransition?.skipTransition();
    activeTransition = null;
    update();

    return;
  }

  const box = from.getBoundingClientRect();
  const frames = cookieRevealFrames(
    box.x + box.width / 2,
    box.y + box.height / 2,
    innerWidth,
    innerHeight,
  );

  await runClipTransition(update, {
    types: ['theme'],
    onTransition: (transition) => {
      activeTransition = transition;
    },
    animate: ({ root, tokens, easing }) => {
      if (request !== themeRequest) {
        return;
      }

      const duration = parseCssDurationMs(
        tokens.getPropertyValue('--transition-duration-spatial-fast'),
      );

      // The new colours fade in over the first quarter, so the first small bloom
      // never flashes at full contrast over the control.
      root.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: duration / 4,
        pseudoElement: '::view-transition-new(root)',
      });
      root.animate(frames, { duration, easing, pseudoElement: '::view-transition-new(root)' });
    },
  });
}

function useThemePreference() {
  return useSyncExternalStore(subscribe, readTheme, () => 'system' as const);
}

export {
  revealTheme,
  segmentPillSlot,
  themeGroupSlot,
  themeOrder,
  themeScript,
  themeStyles,
  useThemePreference,
};

export type { ThemePreference };
