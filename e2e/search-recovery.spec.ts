import AxeBuilder from '@axe-core/playwright';
import { mockLoginNavigation } from './fixtures/login-navigation';
import { expect, test } from './fixtures/test';

for (const theme of ['light-theme', 'dark-theme']) {
  test(`search filters and pages recover after failures: ${theme}`, async ({ page, context }, info) => {
    const errors: string[] = [];
    const queries: string[] = [];
    let failedPage = false;
    page.on('pageerror', error => errors.push(error.message));
    await mockLoginNavigation(page, '/search', { theme });
    await context.route('**/api/v3/landingPage*', route => {
      if (new URL(route.request().url()).searchParams.get('content')?.startsWith('/core/')) {
        return route.fallback();
      }
      return route.fulfill({ json: { title: 'Search recovery',
        publicPageKey: 'node:1:zh-hans:1', body: [{
        type: 'search', api: '/api/v2/ref047-search',
        header: { input: { placeholder: 'Search content' } },
        sidebar: [{ key: 'keys', type: 'input', props: { label: 'Filter search' } }],
        showSidebar: true, label: { filter: 'Filters', clear: 'Clear' },
        template: '<h2>{{title}}</h2>', wrapperClasses: '', colClasses: '',
      }] } });
    });
    await context.route('**/api/v2/ref047-search*', route => {
      const params = new URL(route.request().url()).searchParams;
      const keys = params.get('keys') || 'initial';
      const currentPage = Number(params.get('page') || 0);
      queries.push(keys);
      if (keys === 'recovered' && currentPage === 1 && !failedPage) {
        failedPage = true;
        return route.fulfill({ status: 503, json: { error: 'Synthetic page failure' } });
      }
      return keys.includes('unavailable')
        ? route.fulfill({ status: 503, json: { error: 'Synthetic search failure' } })
        : route.fulfill({ json: {
          rows: [{ id: `${keys}-${currentPage}`, title: `Result ${keys} page ${currentPage}` }],
          pager: { current_page: currentPage, total_pages: 3, total_items: 3, items_per_page: 1 },
        } });
    });
    await page.goto('/search');
    const results = page.locator('app-search-list');
    const filter = page.getByRole('textbox', { name: 'Filter search' });
    await expect(results.getByText('Result initial page 0')).toBeVisible();
    for (const keys of ['unavailable', 'still-unavailable']) {
      await filter.fill(keys);
      await expect.poll(() => queries.includes(keys)).toBe(true);
      await expect(results.locator('app-spinner')).toHaveCount(0);
      await expect(results.getByText('Result initial page 0')).toBeVisible();
      await expect(filter).toBeFocused();
      expect(page.url()).not.toContain('unavailable');
    }
    await page.screenshot({ path: info.outputPath('failed-filter.png') });
    await filter.fill('recovered');
    await expect(results.getByText('Result recovered page 0')).toBeVisible();
    const next = results.getByRole('button', { name: '下一页', exact: true });
    await next.click();
    await expect.poll(() => failedPage).toBe(true);
    await expect(results.locator('app-spinner')).toHaveCount(0);
    await expect(results.getByText('Result recovered page 0')).toBeVisible();
    await expect(results.locator('.mat-mdc-paginator-range-label')).toHaveText('1-1 总共3条');
    await expect(next).toBeFocused();
    await next.click();
    await expect(results.getByText('Result recovered page 1')).toBeVisible();
    await expect(page).toHaveURL(/page=1/);
    const accessibility = await new AxeBuilder({ page }).include('app-search-list')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(accessibility.violations).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({ path: info.outputPath('recovered-page.png') });
  });
}
