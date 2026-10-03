type ViewTransitionOptions = (() => void) | { update: () => void; types: string[] };

// Runs `update` inside a same-document view transition of the given types,
// or plainly where the browser can't, so the change itself always happens.
// Firefox before 144 and Safari before 18 have no view transitions. Safari
// 18.0 and 18.1 only take the callback form and throw on the options object;
// they get the default cross-fade, since the types scope the custom styles.
// `target` is the document; tests pass a stand-in.
function startViewTransition(
  update: () => void,
  types: string[],
  target: { startViewTransition?: (options: ViewTransitionOptions) => void } = document,
) {
  if (!target.startViewTransition) {
    update();

    return;
  }

  try {
    target.startViewTransition({ update, types });
  } catch {
    target.startViewTransition(update);
  }
}

export { startViewTransition };

export type { ViewTransitionOptions };
