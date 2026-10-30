import AxeBuilder from '@axe-core/playwright';
import { mockLoginNavigation } from './fixtures/login-navigation';
import { expect, test } from './fixtures/test';

for (const theme of ['light-theme', 'dark-theme']) {
  test(`header top follows desktop breakpoints: ${theme}`, async ({ page, context }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await mockLoginNavigation(page, '/home', { theme });
    await context.route('**/api/v3/landingPage*', route => {
      if (new URL(route.request().url()).searchParams.get('content') !== '/core/branding') {
        return route.fallback();
      }
      return route.fulfill({ json: { header: {
        params: { themeSwitch: false, userInfo: false, menuHoverOpen: false },
        mainMenu: [], actions: [], search: { enable: false },
        top: { banner: {
          left: [{ label: 'Header breakpoint regression' }],
          right: [{ label: 'Contact', href: '/contact' }],
        } },
      } } });
    });
    await page.setViewportSize({ width: 1440, height: 600 });
    await page.goto('/');
    const top = page.locator('app-header-top');
    await expect(top.getByRole('link', { name: 'Contact' })).toBeVisible();

    for (const width of [1440, 1920, 960, 959, 600, 390, 1440]) {
      await page.setViewportSize({ width, height: 600 });
      await expect(top).toHaveCSS('display', width >= 960 ? 'block' : 'none');
      if (width === 390) {
        await page.screenshot({ path: testInfo.outputPath('mobile.png') });
      }
    }

    await page.keyboard.press('Tab');
    await expect(top.getByRole('link', { name: 'Contact' })).toBeFocused();
    const accessibility = await new AxeBuilder({ page }).include('app-header-top')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(accessibility.violations).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath('desktop.png') });
    expect(errors).toEqual([]);
  });
}
