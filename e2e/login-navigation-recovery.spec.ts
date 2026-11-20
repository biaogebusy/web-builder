import { test, expect } from './fixtures/test';
import { mockLoginNavigation, submitLogin } from './fixtures/login-navigation';

test('a background login page cannot replace the newer dialog destination', async ({ page }) => {
  await mockLoginNavigation(page, '/builder/hub');
  await page.context().route('**/api/v3/landingPage**', route => {
    if (new URL(route.request().url()).searchParams.get('content') !== '/core/base') {
      return route.fallback();
    }
    return route.fulfill({ json: {
      defaultTheme: 'light-theme', librariesUseLocal: true, builder: { guard: true },
      login: { loginRedirect: '/old-target', phoneLogin: { enable: true },
        left: { type: 'link', href: '/builder/hub', label: 'New protected destination' } },
    } });
  });
  await page.goto('/me/login?returnUrl=%2Fold-target');
  await page.getByRole('link', { name: 'New protected destination' }).click({ noWaitAfter: true });
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await submitLogin(dialog);
  await expect(page).toHaveURL(/\/builder\/hub$/);
  // Observe beyond the old login page's two-second success delay.
  await page.waitForTimeout(2500);
  await expect(page).toHaveURL(/\/builder\/hub$/);
});

for (const direction of ['back', 'forward'] as const) {
  test(`cancelled browser ${direction} preserves history and permits login on retry`,
    async ({ page, context }) => {
      const target = '/builder/hub?filter=draft#details';
      await mockLoginNavigation(page, target);
      await context.route('**/api/v3/landingPage**', route => {
        const content = new URL(route.request().url()).searchParams.get('content') ?? '';
        if (content.startsWith('/core/')) return route.fallback();
        return route.fulfill({ json: {
          title: 'History recovery', publicPageKey: `history:${content}`,
          body: [
            { type: 'link', href: '/builder/hub', label: 'Protected history',
              queryParams: { filter: 'draft' }, fragment: 'details' },
            { type: 'link', href: '/history-after', label: 'Public after' },
          ],
        } });
      });
      await page.goto('/home');
      await page.getByRole('link', { name: 'Protected history' }).click({ noWaitAfter: true });
      await submitLogin(page);
      await expect(page).toHaveURL(/\/builder\/hub\?filter=draft#details$/);
      await page.locator('app-builder-sidebar a.logo').click();
      await expect(page).toHaveURL(/\/home$/);
      await page.getByRole('link', { name: 'Public after' }).click();
      await expect(page).toHaveURL(/\/history-after$/);
      await page.goBack();
      await expect(page).toHaveURL(/\/home$/);
      if (direction === 'forward') {
        await page.goBack();
        await expect(page).toHaveURL(/\/builder\/hub\?filter=draft#details$/);
        await page.goBack();
        await expect(page).toHaveURL(/\/home$/);
      }
      await context.clearCookies();
      await page.evaluate(() => history.replaceState({ ...history.state, fixture: 'kept' }, ''));
      const state = await page.evaluate(() => history.state);
      const cdp = await context.newCDPSession(page);
      const original = await cdp.send('Page.getNavigationHistory');
      const dialog = page.getByRole('dialog', { name: '欢迎登录', exact: true });
      for (let attempt = 0; attempt < 2; attempt++) {
        await page.evaluate(value => history[value](), direction);
        await expect(dialog.getByRole('button', { name: '关闭', exact: true })).toBeFocused();
        await page.keyboard.press('Escape');
        await expect(dialog).toHaveCount(0);
        await expect(page).toHaveURL(/\/home$/);
        const cancelled = await cdp.send('Page.getNavigationHistory');
        expect(cancelled.currentIndex).toBe(original.currentIndex);
        expect(cancelled.entries.map(({ id, url }) => ({ id, url })))
          .toEqual(original.entries.map(({ id, url }) => ({ id, url })));
        expect(await page.evaluate(() => history.state)).toEqual(state);
      }
      await page.evaluate(value => history[value](), direction);
      await expect(dialog).toBeVisible();
      await submitLogin(dialog);
      await expect(page).toHaveURL(/\/builder\/hub\?filter=draft#details$/);
      await expect(dialog).toHaveCount(0);
    });
}
