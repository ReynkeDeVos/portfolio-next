import { StartClient } from '@tanstack/react-start/client';
import { StrictMode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { startConsoleGreeting } from '@/lib/console-greeting';

// Wait until page load and browser idle before running the decorative DevTools
// greeting, so its AVIF fetch and base64 conversion never compete with startup.
function scheduleConsoleGreeting() {
  const run = () => {
    void startConsoleGreeting();
  };

  const onIdle = () => {
    if ('requestIdleCallback' in globalThis) {
      globalThis.requestIdleCallback(run, { timeout: 2000 });
    } else {
      globalThis.setTimeout(run, 1000);
    }
  };

  if (document.readyState === 'complete') {
    onIdle();
  } else {
    globalThis.addEventListener('load', onIdle, { once: true });
  }
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  );
});

scheduleConsoleGreeting();
