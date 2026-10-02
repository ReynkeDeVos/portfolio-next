import { StartClient } from '@tanstack/react-start/client';
import { StrictMode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { startConsoleGreeting } from '@/lib/console-greeting';

// Runs once per document, before hydration and outside React rendering. The
// image loads asynchronously and never gates portfolio content.
void startConsoleGreeting();

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  );
});
