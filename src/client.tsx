import { StartClient } from '@tanstack/react-start/client';
import { StrictMode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { startConsoleGreeting } from '@/lib/console-greeting';

function runConsoleGreeting() {
  void startConsoleGreeting();
}

function queueConsoleGreeting() {
  if ('requestIdleCallback' in globalThis) {
    globalThis.requestIdleCallback(runConsoleGreeting, { timeout: 2000 });
  } else {
    globalThis.setTimeout(runConsoleGreeting, 1000);
  }
}

// Wait until page load and browser idle before running the decorative DevTools
// greeting, so its AVIF fetch and base64 conversion never compete with startup.
function scheduleConsoleGreeting() {
  if (document.readyState === 'complete') {
    queueConsoleGreeting();
  } else {
    globalThis.addEventListener('load', queueConsoleGreeting, { once: true });
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
