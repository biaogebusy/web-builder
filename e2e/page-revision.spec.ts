import AxeBuilder from '@axe-core/playwright';
import type { BrowserContext, Page, Route } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from './fixtures/test';

const localePath = process.env['E2E_DIST']
  ? resolve(process.env['E2E_DIST'], 'browser/assets/i18n/zh-hans.json')
  : resolve('src/assets/i18n/zh-hans.json');
const revisionLabels: { COMPARE_IDENTICAL: string } =
  JSON.parse(readFileSync(localePath, 'utf8')).BUILDER.REVISION;

const revisions = {
  status: true, message: '', nid: '12', uuid: 'revision-page', vid: '30', langcode: 'en',
  revisions: ['30', '29'].map(vid => ({
    vid, current: vid === '30', changed: 1740226733, log: '', author: 'Editor',
  })),
};

async function openHistory(context: BrowserContext, page: Page,
  list: (route: Route) => Promise<void>): Promise<void> {
  await context.route('**/api/**', route => route.fulfill({ json: {} }));
  await context.route('**/assets/app/**/builder.json', route => route.fulfill({ json: {} }));
  await context.route('**/api/v3/landingPage*', route => route.fulfill({ json:
    new URL(route.request().url()).searchParams.get('content') === '/core/base'
      ? { defaultTheme: 'light-theme', builder: { guard: false } } : {},
  }));
  await context.route('**/api/v2/node/landing-page*', route => route.fulfill({ json: {
    rows: [{ nid: '12', uuid: 'revision-page', title: 'Revision fixture', langcode: 'en',
      url: '/en/revision-fixture', changed: '2025-02-22T00:00:00Z', author: 'Editor' }],
    pager: { current_page: 0, total_pages: 1, total_items: 1, items_per_page: 10 },
  } }));
  await context.route('**/api/v2/taxonomy/page_group*', route =>
    route.fulfill({ json: { rows: [] } }));
  await context.route('**/api/v3/landingPage/revisions/12?*', list);
  await page.goto('/builder/page-list');
  await page.getByRole('button', { name: 'Revision fixture的更多操作', exact: true }).click();
  await page.getByRole('menuitem', { name: '历史版本', exact: true }).click();
  await expect(page.locator('app-page-revision')).toBeVisible();
}

test('revision history retries a failed list and preserves comparison and preview targets', async ({
  context, page,
}) => {
  let reads = 0;
  const revisionPaths: string[] = [];
  const pageErrors: string[] = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await openHistory(context, page, route => {
    reads++;
    expect(new URL(route.request().url()).pathname).toBe('/en/api/v3/landingPage/revisions/12');
    return route.fulfill({ status: reads === 1 ? 503 : 200,
      json: reads === 1 ? { message: 'Synthetic failure' } : revisions });
  });
  await context.route('**/api/v3/landingPage/revisions/12/*', route => {
    const path = new URL(route.request().url()).pathname;
    revisionPaths.push(path);
    return route.fulfill({ json: {
      status: true, message: '', title: 'Revision fixture', nid: '12', uuid: 'revision-page',
      vid: '30', langcode: 'en', changed: 1740226733, current: false,
      body: [{ type: 'json', uuid: 'block-id', attributes: {
        body: { type: 'text', body: '<p>Saved revision content</p>' },
      } }],
    } });
  });

  const panel = page.locator('app-page-revision');
  await expect(panel).toContainText('载入历史版本列表失败，请重试');
  await panel.getByRole('button', { name: '刷新', exact: true }).click();
  await expect(panel.locator('.revision-row')).toHaveCount(2);
  expect(reads).toBe(2);
  const compare = panel.getByRole('button', { name: '比较', exact: true });
  await expect(compare).toBeDisabled();
  await panel.getByRole('checkbox', { name: '勾选历史版本 #30 进行比较', exact: true }).check();
  await expect(compare).toBeDisabled();
  await panel.getByRole('checkbox', { name: '勾选历史版本 #29 进行比较', exact: true }).check();
  await expect(compare).toBeEnabled();
  const accessibility = await new AxeBuilder({ page }).include('app-page-revision')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(accessibility.violations).toEqual([]);
  await compare.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('.diff-side-vid')).toHaveText(['#29', '#30']);
  await expect(dialog).toContainText(revisionLabels.COMPARE_IDENTICAL);
  expect([...revisionPaths].sort()).toEqual([
    '/en/api/v3/landingPage/revisions/12/29', '/en/api/v3/landingPage/revisions/12/30',
  ]);
  await dialog.getByRole('button', { name: '关闭', exact: true }).click();
  await panel.getByRole('button', { name: '载入历史版本 #29 到草稿', exact: true }).click();
  await expect(page.locator('app-builder-list')).toContainText('Saved revision content');
  expect(revisionPaths.at(-1)).toBe('/en/api/v3/landingPage/revisions/12/29');
  expect(pageErrors).toEqual([]);
});

test('closing revision history cancels its pending list and reopening starts a new read', async ({
  context, page,
}) => {
  let reads = 0;
  const aborted: string[] = [];
  let release!: () => void;
  const pending = new Promise<void>(resolve => (release = resolve));
  page.on('requestfailed', request => {
    if (request.url().includes('/landingPage/revisions/12?')) aborted.push(request.url());
  });
  await openHistory(context, page, async route => {
    reads++;
    if (reads === 1) await pending;
    await route.fulfill({ json: revisions });
  });
  try {
    await expect(page.locator('app-page-revision app-spinner')).toBeVisible();
    await expect(page.locator('app-page-revision').getByRole('status', {
      name: '加载中……', exact: true,
    })).toBeVisible();
    const accessibility = await new AxeBuilder({ page }).include('app-page-revision')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(accessibility.violations).toEqual([]);
    await page.locator('.right-header button').click();
    await expect(page.locator('app-page-revision')).toHaveCount(0);
    release();
    await expect.poll(() => aborted.length).toBe(1);
    await page.getByRole('button', { name: 'Revision fixture的更多操作', exact: true }).click();
    await page.getByRole('menuitem', { name: '历史版本', exact: true }).click();
    await expect(page.locator('app-page-revision .revision-row')).toHaveCount(2);
    expect(reads).toBe(2);
  } finally {
    release();
  }
});
