import { defineConfig } from '@playwright/test';
import { resolve } from 'node:path';
import config from './playwright.config';

// Workers and the static server must resolve the same build and its locale assets.
process.env['E2E_DIST'] = resolve(process.env['E2E_DIST'] || 'dist/performance');

export default defineConfig({
  ...config,
  timeout: 120_000,
  workers: 2,
  outputDir: 'test-results/production',
  use: { ...config.use, baseURL: 'http://localhost:4201' },
  webServer: {
    command: 'node scripts/serve-e2e.mjs',
    url: 'http://localhost:4201',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
