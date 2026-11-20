import { defineConfig, devices } from '@playwright/test';
import config from './playwright.config';

const baseURL = process.env['E2E_BASE_URL'];
if (!baseURL || !/^https?:$/.test(new URL(baseURL).protocol)) {
  throw new Error('Set E2E_BASE_URL to the deployed frontend URL');
}

export default defineConfig({
  ...config,
  testDir: './e2e/live',
  testIgnore: [],
  timeout: 60_000,
  workers: 1,
  webServer: undefined,
  outputDir: 'test-results/live',
  reporter: [['list'], ['json', { outputFile: 'test-results/live/results.json' }]],
  use: { ...config.use, baseURL, screenshot: 'only-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
