import { expect, test } from './fixtures/test';

test('loads the application shell', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('app-root')).toBeAttached();
});
