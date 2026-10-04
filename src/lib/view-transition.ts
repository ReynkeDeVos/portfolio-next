// Runs `update` as a same-document view transition. The types scope custom
// styles and keyframes to one moment. Without view transitions (Firefox
// before 144, Safari before 18) the update simply applies. Safari 18.0 and
// 18.1 only take the callback form and throw on the options object; they get
// the default cross-fade, since the types scope the custom styles.
function startViewTransition(update: () => void, types: string[]) {
  if (!('startViewTransition' in document)) {
    update();

    return null;
  }

  try {
    return document.startViewTransition({ update, types });
  } catch {
    return document.startViewTransition(update);
  }
}

export { startViewTransition };
