// Runs `update` as a same-document view transition. The types scope custom
// styles and keyframes to one moment. Without view transitions (Firefox
// before 144, Safari before 18) the update simply applies. Safari 18.0 and
// 18.1 only take the callback form and throw on the options object; they get
// the default cross-fade, since the types scope the custom styles.
function invokeViewTransition(update: () => void, types: string[]) {
  try {
    return document.startViewTransition({ update, types });
  } catch {
    return document.startViewTransition(update);
  }
}

async function observeReady(transition: ViewTransition) {
  try {
    await transition.ready;
  } catch {
    // Skipped transitions reject `ready` with AbortError; callers that await
    // `transition.ready` still catch it themselves.
  }
}

function startViewTransition(update: () => void, types: string[]) {
  if (!('startViewTransition' in document)) {
    update();

    return null;
  }

  const transition = invokeViewTransition(update, types);

  // Reduced-motion callers do not await `ready`; observing it here stops
  // skipped transitions from surfacing as unhandled rejections.
  void observeReady(transition);

  return transition;
}

// Reads a CSS time token (`290ms` or minified `.29s`) in milliseconds.
function parseCssDurationMs(value: string) {
  const trimmed = value.trim();
  // parseFloat, unlike Number, reads past the unit.
  // oxlint-disable-next-line unicorn/prefer-number-coercion
  const amount = Number.parseFloat(trimmed);

  if (!Number.isFinite(amount)) {
    return 0;
  }

  return trimmed.endsWith('ms') ? amount : amount * 1000;
}

type ClipTransitionContext = {
  root: HTMLElement;
  tokens: CSSStyleDeclaration;
  easing: string;
};

// Runs a view transition that animates a pseudo-element clip once `ready`
// resolves. Under reduced motion it falls back to a cross-fade without calling
// `animate`.
async function runClipTransition(
  update: () => void,
  options: {
    types: string[];
    reducedMotionTypes?: string[];
    onTransition?: (transition: ViewTransition | null) => void;
    animate: (context: ClipTransitionContext) => void;
  },
) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const transition = startViewTransition(update, options.reducedMotionTypes ?? []);
    options.onTransition?.(transition);

    return;
  }

  const transition = startViewTransition(update, options.types);
  options.onTransition?.(transition);

  if (!transition) {
    return;
  }

  try {
    await transition.ready;
  } catch {
    // A newer transition skipped this one; its update already applied.
    return;
  }

  const root = document.documentElement;
  const tokens = getComputedStyle(root);
  const easing = tokens.getPropertyValue('--ease-emphasized').trim();

  options.animate({ root, tokens, easing });
}

export { parseCssDurationMs, runClipTransition, startViewTransition };
