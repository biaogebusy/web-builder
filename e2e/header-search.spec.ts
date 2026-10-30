import AxeBuilder from '@axe-core/playwright';
import { mockLoginNavigation } from './fixtures/login-navigation';
import { expect, test } from './fixtures/test';

for (const theme of ['light-theme', 'dark-theme']) {
  test(`header search recovers from failed suggestions: ${theme}`, async ({ page, context }, info) => {
    const errors: string[] = [];
    const queries: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await mockLoginNavigation(page, '/home', { theme });
    await context.route('**/api/v3/landingPage*', route => {
      if (new URL(route.request().url()).searchParams.get('content') !== '/core/branding') {
        return route.fallback();
      }
      return route.fulfill({ json: { header: {
        params: { themeSwitch: false, userInfo: false, menuHoverOpen: false },
        mainMenu: [], actions: [], search: {
          enable: true, key: 'keys', type: 'search', link: '/search',
          placeholder: 'Search content', tooltip: 'Search content',
        },
      } } });
    });
    await context.route('**/api/v1/content*', route => {
      const keys = new URL(route.request().url()).searchParams.get('keys') || '';
      queries.push(keys);
      return keys.includes('unavailable')
        ? route.fulfill({ status: 503, json: { error: 'Synthetic search failure' } })
        : route.fulfill({ json: { rows: [{ title: `Result ${keys}`, url: `/${keys}` }] } });
    });
    await page.setViewportSize({ width: 1440, height: 600 });
    await page.goto('/');
    const input = page.getByRole('combobox', { name: 'Search content' });
    await input.fill('first');
    await expect(page.getByRole('option', { name: 'Result first' })).toBeVisible();

    for (const query of ['unavailable', 'still-unavailable']) {
      await input.fill(query);
      await expect.poll(() => queries.includes(query)).toBe(true);
      await expect(page.getByRole('option')).toHaveCount(0);
      await expect(input).toBeFocused();
    }
    const accessibility = await new AxeBuilder({ page }).include('app-search-box')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(accessibility.violations).toEqual([]);
    await page.screenshot({ path: info.outputPath('failed-request.png') });

    await input.fill('recovered');
    await expect(page.getByRole('option', { name: 'Result recovered' })).toBeVisible();
    expect(queries).toEqual(['first', 'unavailable', 'still-unavailable', 'recovered']);
    await page.screenshot({ path: info.outputPath('recovered.png') });
    await input.press('ArrowDown');
    await input.press('Enter');
    await expect(page).toHaveURL(/\/recovered$/);
    expect(errors).toEqual([]);
  });
}
