import { defineConfig, devices } from '@playwright/test';

const port = 4317;

// Runs against the built site, so build first: `aubr build && aubr test:e2e`.
// Chromium only, the engine the portfolio targets.
export default defineConfig({
  testDir: 'tests/e2e',
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // vite preview runs the built Worker in workerd, as Cloudflare serves it.
    command: `aubr preview --port ${port} --strictPort`,
    url: `http://localhost:${port}/`,
    reuseExistingServer: !process.env.CI,
  },
});
