import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { redact } from '@tanstack/redact/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Vite would inline Fontsource's smallest subsets into the stylesheet, so
  // every visitor would download them whatever the page's characters.
  build: { assetsInlineLimit: (file) => (file.endsWith('.woff2') ? false : undefined) },
  resolve: { tsconfigPaths: true },
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart({
      router: { codeSplittingOptions: { defaultBehavior: [] } },
      prerender: { enabled: true },
    }),
    react(),
    redact({ features: { activity: false, fragmentRefs: false, portal: false } }),
    tailwindcss(),
  ],
});
