import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  reporter: process.env['CI'] ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4200',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm start -- --host 127.0.0.1 --port 4200',
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
    url: 'http://127.0.0.1:4200',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
