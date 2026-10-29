import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures/test';
import { mockLoginNavigation, submitLogin } from './fixtures/login-navigation';

for (const theme of ['light-theme', 'dark-theme']) {
  test(`cancel login preserves the page and focus in ${theme}`, async ({ page }) => {
    await mockLoginNavigation(page, '/builder/hub', { theme });
    await page.goto('/home?origin=menu#intro');
    const link = page.getByRole('link', { name: '受保护入口' });
    await link.click({ noWaitAfter: true });
    const dialog = page.getByRole('dialog', { name: '欢迎登录', exact: true });
    await expect(dialog).toBeVisible();
    await expect(page).toHaveURL(/\/home\?origin=menu#intro$/);
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      const bounds = await dialog.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      expect((await new AxeBuilder({ page }).include('[role="dialog"]').analyze()).violations)
        .toEqual([]);
      await page.screenshot({ path: `test-results/login-${theme}-${width}.png` });
    }
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(page).toHaveURL(/\/home\?origin=menu#intro$/);
    await expect(link).toBeFocused();
  });
}

for (const target of ['/builder/hub?filter=draft#details', '/my/profile?tab=details#contact']) {
  test(`SMS login continues to ${target}`, async ({ page }) => {
    await mockLoginNavigation(page, target);
    await page.goto('/home');
    await page.getByRole('link', { name: '受保护入口' }).click({ noWaitAfter: true });
    await expect(page.getByRole('dialog')).toBeVisible();
    await submitLogin(page);
    await expect(page).toHaveURL(new RegExp(target.replace(/[?]/g, '\\?') + '$'));
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
}

test('an initial protected visit returns from the login page with its query and fragment',
  async ({ page }) => {
    const target = '/builder/hub?filter=draft#details';
    await mockLoginNavigation(page, target);
    await page.goto(target);
    await expect(page.locator('app-login')).toBeVisible();
    expect(new URL(page.url()).searchParams.get('returnUrl')).toBe(target);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await submitLogin(page);
    await expect(page).toHaveURL(/\/builder\/hub\?filter=draft#details$/);
  });

test('OAuth popup login continues the pending navigation', async ({ page, context }) => {
  await mockLoginNavigation(page, '/builder/hub?filter=draft#details');
  await context.route('**/oauth/authorize*', route => {
    const url = new URL(route.request().url());
    // Run the production callback path on the local frontend origin used by this fixture.
    const callback = new URL(new URL(url.searchParams.get('redirect_uri')!).pathname, page.url());
    callback.searchParams.set('code', 'login-navigation-code');
    callback.searchParams.set('state', url.searchParams.get('state')!);
    return route.fulfill({ status: 302, headers: { location: callback.href } });
  });
  await page.goto('/home');
  await page.getByRole('link', { name: '受保护入口' }).click({ noWaitAfter: true });
  await page.getByRole('dialog').getByRole('button', { name: '账户登录' }).click();
  await expect(page).toHaveURL(/\/builder\/hub\?filter=draft#details$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
