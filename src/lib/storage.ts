// Saves `value` under `key`, or removes the key for null. Even reading a
// blocked storage throws, so callers name it instead of passing it. A blocked
// write only forgets the choice across visits: callers apply it to the page
// themselves.
function store(storage: 'localStorage' | 'sessionStorage', key: string, value: string | null) {
  try {
    if (value === null) {
      globalThis[storage].removeItem(key);
    } else {
      globalThis[storage].setItem(key, value);
    }
  } catch {
    // The choice still applies for this page view.
  }
}

export { store };
