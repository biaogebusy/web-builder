import { mockLoginNavigation, submitLogin } from './fixtures/login-navigation';
import { expect, test } from './fixtures/test';

for (const theme of ['light-theme', 'dark-theme']) {
  test(`notifications retain their source and read action: ${theme}`, async ({ page, context }, info) => {
    const reads: string[] = [];
    const writes: string[] = [];
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await mockLoginNavigation(page, '/home', { theme });
    await context.route('**/api/v3/landingPage*', route => {
      if (new URL(route.request().url()).searchParams.get('content') !== '/core/base') {
        return route.fallback();
      }
      return route.fulfill({ json: {
        defaultTheme: theme, librariesUseLocal: true,
        login: { loginRedirect: '/home', phoneLogin: { enable: true } },
        notify: { enable: true, params: { interval: 120000 },
          api: ['admin', 'first', 'restricted', 'second', 'empty'].map(name => ({
            get: `/api/v2/notify-${name}`, action: `/api/v1/flagging/${name}`,
            icon: name === 'first' ? 'bell-outline' : 'email-outline', color: 'primary',
            reqRoles: ['admin', 'restricted'].includes(name) ? ['administrator'] : [],
          })),
        },
      } });
    });
    await context.route(/\/api\/v2\/notify-[^/?]+\/(?:\?.*)?$/, route => {
      const url = new URL(route.request().url());
      reads.push(url.pathname);
      expect(url.searchParams.get('noCache')).toBe('1');
      const name = url.pathname.split('notify-')[1].replace('/', '');
      const ids = name === 'first' ? ['first-1', 'first-2'] : name === 'second' ? ['second-1'] : [];
      return route.fulfill({ json: { rows: ids.map(id => ({
        uuid: id, title: `Notification ${id}`, url: `/messages/${id}`,
      })) } });
    });
    await context.route('**/api/v1/flagging/**', route => {
      expect(route.request().method()).toBe('DELETE');
      writes.push(new URL(route.request().url()).pathname);
      return route.fulfill({ status: 204 });
    });
    await page.goto('/me/login');
    await submitLogin(page);
    await expect(page).toHaveURL(/\/home$/);
    await page.reload();
    const bell = page.getByRole('button', { name: 'show notify' });
    await expect(bell.locator('.mat-badge-content')).toHaveText('3');
    await bell.click();
    const menu = page.locator('.notify-menu');
    await expect(menu.locator('app-link')).toHaveText([
      'Notification first-1', 'Notification first-2', 'Notification second-1',
    ]);
    await expect.poll(() => menu.locator('mat-list-item app-icon mat-icon')
      .evaluateAll(icons => icons.map(icon => icon.getAttribute('data-mat-icon-name'))))
      .toEqual(['bell-outline', 'bell-outline', 'email-outline']);
    await page.screenshot({ path: info.outputPath('notifications.png') });
    await menu.getByRole('link', { name: 'Notification second-1' }).click();
    await expect.poll(() => writes).toEqual(['/api/v1/flagging/second/second-1']);
    expect(reads.some(path => /admin|restricted/.test(path))).toBe(false);
    expect(errors).toEqual([]);
  });
}
