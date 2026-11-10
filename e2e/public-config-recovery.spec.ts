import { mockLoginNavigation } from './fixtures/login-navigation';
import { expect, test } from './fixtures/test';

for (const failedContent of ['/core/branding', '/core/base']) {
  test(`public navigation recovers ${failedContent} after a transient language failure`, async ({
    page, context,
  }) => {
    await mockLoginNavigation(page, '/home');
    let rejectEnglish = true;
    let englishReads = 0;
    let documents = 0;
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (request.resourceType() === 'document') documents++; });
    await context.route('**/api/v3/landingPage*', route => {
      const url = new URL(route.request().url());
      const content = url.searchParams.get('content');
      const english = url.pathname.startsWith('/en/');
      if (english && content === failedContent) {
        englishReads++;
        if (rejectEnglish) {
          return route.fulfill({ status: 503, json: { error: 'Synthetic configuration failure' } });
        }
      }
      if (content === '/core/branding') {
        return route.fulfill({ json: {
          header: { params: { themeSwitch: false, userInfo: false }, mainMenu: [],
            search: { enable: false }, actions: [] },
          footer: { params: { mode: 'light' }, mainMenu: [],
            logo: { label: english ? 'English branding' : 'Chinese branding' } },
        } });
      }
      if (content?.startsWith('/core/')) return route.fallback();
      return route.fulfill({ json: {
        title: 'Configuration recovery', publicPageKey: `node:1:${english ? 'en' : 'zh-hans'}:1`,
        body: [
          { type: 'link', label: 'English page', href: '/en/ref105' },
          { type: 'link', label: 'Chinese page', href: '/ref105' },
        ],
      } });
    });
    await page.goto('/ref105');
    await expect(page.getByText('Chinese branding', { exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'English page', exact: true }).click();
    await expect(page).toHaveURL(/\/en\/ref105$/);
    const attempts = failedContent === '/core/branding' ? 2 : 3;
    await expect.poll(() => englishReads).toBe(attempts);
    if (failedContent === '/core/branding') {
      await expect(page.getByText('Chinese branding', { exact: true })).toHaveCount(0);
      await expect(page.getByText('English branding', { exact: true })).toHaveCount(0);
    } else {
      await expect(page.getByText('English branding', { exact: true })).toBeVisible();
    }
    rejectEnglish = false;
    await page.getByRole('link', { name: 'Chinese page', exact: true }).click();
    await expect(page).toHaveURL(/\/ref105$/);
    await expect(page.getByText('Chinese branding', { exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'English page', exact: true }).click();
    await expect(page.getByText('English branding', { exact: true })).toBeVisible();
    await expect.poll(() => englishReads).toBe(attempts + 1);
    await page.getByRole('link', { name: 'Chinese page', exact: true }).click();
    await expect(page.getByText('Chinese branding', { exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'English page', exact: true }).click();
    await expect(page.getByText('English branding', { exact: true })).toBeVisible();
    expect(englishReads).toBe(attempts + 1);
    expect(documents).toBe(1);
    expect(errors).toEqual([]);
  });
}
