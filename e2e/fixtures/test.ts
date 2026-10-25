import { test as base, expect } from '@playwright/test';
import { resolve } from 'node:path';

/** Uses local build translations when production API origins point outside the fixture server. */
export const test = base.extend<{ productionLocales: void }>({
  productionLocales: [async ({ context }, use) => {
    const dist = process.env['E2E_DIST'];
    if (dist) {
      await context.route('**/assets/i18n/*.json', async route => {
        const locale = new URL(route.request().url()).pathname.split('/').pop()!;
        await route.fulfill({
          path: resolve(dist, 'browser/assets/i18n', locale),
          contentType: 'application/json',
        });
      });
    }
    await use();
  }, { auto: true }],
});

export { expect };
