import AxeBuilder from '@axe-core/playwright';
import type { Route } from '@playwright/test';
import { mockLoginNavigation } from './fixtures/login-navigation';
import { expect, test } from './fixtures/test';

for (const theme of ['light-theme', 'dark-theme']) {
  test(`table filters and pages keep the latest result: ${theme}`, async ({ page, context }, info) => {
    const errors: string[] = [];
    let slowPage: Route | undefined;
    const result = (title: string, currentPage = 0) => ({
      rows: [{ title }],
      pager: { current_page: currentPage, total_pages: 3, total_items: 3, items_per_page: 1 },
    });
    page.on('pageerror', error => errors.push(error.message));
    await mockLoginNavigation(page, '/list', { theme });
    await context.route('**/api/v3/landingPage*', route => {
      if (new URL(route.request().url()).searchParams.get('content')?.startsWith('/core/')) {
        return route.fallback();
      }
      return route.fulfill({ json: { title: 'Table recovery',
        publicPageKey: 'node:1:zh-hans:1', body: [{
        type: 'view-list', params: { apiType: '/api/v2/ref048-items' },
        header: [{ key: 'title', label: 'Title' }],
        form: { type: 'formly', fields: [
          { key: 'keys', type: 'input', props: { label: 'Filter table' } },
        ] },
      }] } });
    });
    await context.route('**/api/v2/ref048-items*', route => {
      const params = new URL(route.request().url()).searchParams;
      const keys = params.get('keys') || 'initial';
      const currentPage = Number(params.get('page') || 0);
      if (keys === 'initial' && currentPage === 1) {
        slowPage = route;
        return;
      }
      if (keys === 'denied' || keys === 'unavailable') {
        return route.fulfill({ status: keys === 'denied' ? 403 : 503,
          json: { error: 'Synthetic table failure' } });
      }
      return route.fulfill({ json: result(`Result ${keys} page ${currentPage}`, currentPage) });
    });
    await page.goto('/list');
    const list = page.locator('app-view-list');
    const filter = page.getByRole('textbox', { name: 'Filter table' });
    await expect(list.getByText('Result initial page 0')).toBeVisible();
    const next = list.getByRole('button', { name: '下一页', exact: true });
    await next.click();
    await expect.poll(() => Boolean(slowPage)).toBe(true);
    await next.click();
    await expect(list.getByText('Result initial page 2')).toBeVisible();
    await expect.poll(() => slowPage?.request().failure()).not.toBeNull();
    await slowPage!.fulfill({ json: result('Stale page', 1) });
    await expect(list.getByText('Result initial page 2')).toBeVisible();
    await expect(list.getByText('Stale page')).toHaveCount(0);

    for (const keys of ['denied', 'unavailable']) {
      await filter.fill(keys);
      await expect(list.locator('app-dynamic-table')).toHaveCount(0);
      await expect(list.locator('ngx-skeleton-loader')).toHaveCount(0);
      await expect(list.locator('mat-paginator')).toHaveCount(0);
      await expect(list.locator('.no-auth')).toHaveCount(keys === 'denied' ? 1 : 0);
      await expect(filter).toBeFocused();
      await page.screenshot({ path: info.outputPath(`${keys}.png`) });
      await filter.fill(`recovered-${keys}`);
      await expect(list.getByText(`Result recovered-${keys} page 0`)).toBeVisible();
      await expect(list.locator('.no-auth')).toHaveCount(0);
    }
    const accessibility = await new AxeBuilder({ page }).include('app-view-list')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(accessibility.violations).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({ path: info.outputPath('recovered-table.png') });
  });
}
