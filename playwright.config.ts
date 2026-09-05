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
    // Must match environment.apiUrl's origin exactly: the app builds every API URL from it, so a
    // mismatch would make sessionStorage and the stubbed requests straddle two origins.
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm start -- --host localhost --port 4200',
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
    url: 'http://localhost:4200',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
