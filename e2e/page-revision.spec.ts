import AxeBuilder from '@axe-core/playwright';
import type { BrowserContext, Page, Route } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from './fixtures/test';

const localePath = process.env['E2E_DIST']
  ? resolve(process.env['E2E_DIST'], 'browser/assets/i18n/zh-hans.json')
  : resolve('src/assets/i18n/zh-hans.json');
const labels = JSON.parse(readFileSync(localePath, 'utf8'));
const revisionLabels: { COMPARE_IDENTICAL: string; COMPARE_FAIL: string } = labels.BUILDER.REVISION;

const revisions = {
  status: true, message: '', nid: '12', uuid: 'revision-page', vid: '30', langcode: 'en',
  revisions: ['30', '29'].map(vid => ({
    vid, current: vid === '30', changed: 1740226733, log: '', author: 'Editor',
  })),
};

async function openHistory(context: BrowserContext, page: Page,
  list: (route: Route) => Promise<void>,
  otherPage?: { nid: string; langcode: string }): Promise<void> {
  await context.route('**/api/**', route => route.fulfill({ json: {} }));
  await context.route('**/assets/app/**/builder.json', route => route.fulfill({ json: {} }));
  await context.route('**/api/v3/landingPage*', route => route.fulfill({ json:
    new URL(route.request().url()).searchParams.get('content') === '/core/base'
      ? { defaultTheme: 'light-theme', builder: { guard: false } } : {},
  }));
  await context.route('**/api/v2/node/landing-page*', route => route.fulfill({ json: {
    rows: [{ nid: '12', uuid: 'revision-page', title: 'Revision fixture', langcode: 'en',
      url: '/en/revision-fixture', changed: '2025-02-22T00:00:00Z', author: 'Editor' },
    ...(otherPage ? [{ ...otherPage, uuid: `other-${otherPage.nid}`, title: 'Other selection',
      url: '/other-selection', changed: '2025-02-22T00:00:00Z', author: 'Editor' }] : [])],
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

async function openComparison(page: Page): Promise<void> {
  const panel = page.locator('app-page-revision');
  await panel.getByRole('checkbox', { name: '勾选历史版本 #30 进行比较', exact: true }).check();
  await panel.getByRole('checkbox', { name: '勾选历史版本 #29 进行比较', exact: true }).check();
  await panel.getByRole('button', { name: '比较', exact: true }).click();
}

async function fulfillRevision(route: Route): Promise<void> {
  const vid = new URL(route.request().url()).pathname.split('/').pop();
  await route.fulfill({ json: {
    status: true, message: '', title: 'Revision fixture', nid: '12', uuid: 'revision-page',
    vid, body: [{ attributes: { body: { type: 'text', body: `Revision ${vid} content` } } }],
  } });
}

test('revision comparison shows loading for both reads and retries a partially failed pair', async ({
  context, page,
}) => {
  const reads: Route[] = [];
  const pageErrors: string[] = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await openHistory(context, page, route => route.fulfill({ json: revisions }));
  await context.route('**/api/v3/landingPage/revisions/12/*', route => { reads.push(route); });
  await openComparison(page);
  await expect.poll(() => reads.length).toBe(2);
  const dialog = page.getByRole('dialog');
  const loading = dialog.getByRole('status', { name: labels.APP.LOADING, exact: true });
  await expect(loading).toBeVisible();
  await expect(loading.locator('mat-progress-spinner')).toBeVisible();
  await expect(dialog.locator('ngx-monaco-diff-editor')).toHaveCount(0);
  const accessibility = await new AxeBuilder({ page }).include('app-revision-diff')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(accessibility.violations).toEqual([]);

  await fulfillRevision(reads[0]);
  await expect(loading).toBeVisible();
  await expect(dialog.locator('ngx-monaco-diff-editor')).toHaveCount(0);
  await reads[1].fulfill({ status: 503, json: { message: 'Synthetic failure' } });
  await expect(dialog).toContainText(revisionLabels.COMPARE_FAIL);
  await expect(loading).toHaveCount(0);
  await expect(dialog.locator('ngx-monaco-diff-editor')).toHaveCount(0);
  const failureAccessibility = await new AxeBuilder({ page }).include('app-revision-diff')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(failureAccessibility.violations).toEqual([]);

  await dialog.getByRole('button', { name: '刷新', exact: true }).click();
  await expect.poll(() => reads.length).toBe(4);
  await expect(loading.locator('mat-progress-spinner')).toBeVisible();
  await expect(dialog).not.toContainText(revisionLabels.COMPARE_FAIL);
  await fulfillRevision(reads[3]);
  await expect(loading).toBeVisible();
  await expect(dialog.locator('ngx-monaco-diff-editor')).toHaveCount(0);
  await fulfillRevision(reads[2]);
  await expect(loading).toHaveCount(0);
  await expect(dialog.locator('.monaco-diff-editor')).toBeVisible();
  await expect(dialog.locator('.diff-side-vid')).toHaveText(['#29', '#30']);
  const paths = reads.map(route => new URL(route.request().url()).pathname);
  expect(paths.slice(0, 2).sort()).toEqual([
    '/en/api/v3/landingPage/revisions/12/29', '/en/api/v3/landingPage/revisions/12/30',
  ]);
  expect(paths.slice(2).sort()).toEqual(paths.slice(0, 2).sort());
  await dialog.getByRole('button', { name: '关闭', exact: true }).click();
  await expect(page.locator('app-page-revision').getByRole('button', {
    name: '比较', exact: true,
  })).toBeFocused();
  expect(pageErrors).toEqual([]);
});

test('closing a loading comparison cancels both reads and permits reopening', async ({
  context, page,
}) => {
  const reads: Route[] = [];
  const aborted: string[] = [];
  page.on('requestfailed', request => {
    if (/\/landingPage\/revisions\/12\/\d+/.test(request.url())) aborted.push(request.url());
  });
  await openHistory(context, page, route => route.fulfill({ json: revisions }));
  await context.route('**/api/v3/landingPage/revisions/12/*', route => { reads.push(route); });
  await openComparison(page);
  await expect.poll(() => reads.length).toBe(2);
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('status', { name: labels.APP.LOADING })).toBeVisible();
  await dialog.getByRole('button', { name: '关闭', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await Promise.all(reads.map(fulfillRevision));
  await expect.poll(() => aborted.length).toBe(2);

  const compare = page.locator('app-page-revision').getByRole('button', {
    name: '比较', exact: true,
  });
  await expect(compare).toBeFocused();
  await compare.click();
  await expect.poll(() => reads.length).toBe(4);
  await expect(dialog.getByRole('status', { name: labels.APP.LOADING })).toBeVisible();
  await Promise.all(reads.slice(2).map(fulfillRevision));
  await expect(dialog.locator('.monaco-diff-editor')).toBeVisible();
  await expect(dialog.getByRole('status')).toHaveCount(0);
});

async function fulfillDraft(route: Route, title: string, nid = '12', langcode = 'en'): Promise<void> {
  await route.fulfill({ json: {
    status: true, message: '', nid, langcode, title, uuid: `page-${nid}`, vid: '31',
    changed: '1740226733', body: [{ type: 'json', attributes: {
      body: { type: 'text', body: `<p>${title}</p>` },
    } }],
  } });
}

test('a later revision selection replaces the pending draft read', async ({ context, page }) => {
  const reads: Route[] = [];
  const aborted: string[] = [];
  const writes: string[] = [];
  page.on('requestfailed', request => {
    if (request.url().includes('/revisions/12/29')) aborted.push(request.url());
  });
  page.on('request', request => {
    if (['POST', 'PATCH', 'DELETE'].includes(request.method())) writes.push(request.url());
  });
  await openHistory(context, page, route => route.fulfill({ json: revisions }));
  await context.route('**/api/v3/landingPage/revisions/12/*', route => { reads.push(route); });
  const panel = page.locator('app-page-revision');
  await panel.getByRole('button', { name: '载入历史版本 #29 到草稿', exact: true }).click();
  await expect.poll(() => reads.length).toBe(1);
  await panel.getByRole('button', { name: '载入历史版本 #30 到草稿', exact: true }).click();
  await expect.poll(() => reads.length).toBe(2);
  await fulfillDraft(reads[1], 'Latest selected revision');
  await expect(page.locator('app-builder-list')).toContainText('Latest selected revision');
  await fulfillDraft(reads[0], 'Superseded revision');
  await expect.poll(() => aborted.length).toBe(1);
  await expect(page.locator('app-builder-list')).toContainText('Latest selected revision');
  await expect(page.locator('app-builder-list')).not.toContainText('Superseded revision');
  await expect(page.locator('.revision-bar')).toContainText('30');
  expect(writes).toEqual([]);
});

for (const selection of [{ nid: '43', langcode: 'en' }, { nid: '12', langcode: 'zh-hans' }]) {
  test(`opening ${selection.nid}/${selection.langcode} supersedes a pending revision`, async ({
    context, page,
  }) => {
    const reads: Route[] = [];
    const pageReads: Route[] = [];
    const aborted: string[] = [];
    page.on('requestfailed', request => {
      if (request.url().includes('/revisions/12/29')) aborted.push(request.url());
    });
    await openHistory(context, page, route => route.fulfill({ json: revisions }), selection);
    await context.route('**/api/v3/landingPage/revisions/12/*', route => { reads.push(route); });
    await context.route(`**/api/v3/landingPage/json/${selection.nid}?*`, route => {
      pageReads.push(route);
    });
    await page.getByRole('button', { name: '载入历史版本 #29 到草稿', exact: true }).click();
    await expect.poll(() => reads.length).toBe(1);
    await page.locator('.right-header button').click();
    await page.getByRole('button', { name: 'Other selection', exact: true }).click();
    await expect.poll(() => pageReads.length).toBe(1);
    await fulfillDraft(reads[0], 'Superseded revision');
    await expect.poll(() => aborted.length).toBe(1);
    await fulfillDraft(pageReads[0], 'Current selection', selection.nid, selection.langcode);
    await expect(page.locator('app-builder-list')).toContainText('Current selection');
    await expect(page.locator('app-builder-list')).not.toContainText('Superseded revision');
    await expect(page.locator('.revision-bar')).toHaveCount(0);
  });
}

test('revision loading preserves an unconfirmed draft and permits retry after failure', async ({
  context, page,
}) => {
  const reads: Route[] = [];
  const writes: string[] = [];
  page.on('request', request => {
    if (['POST', 'PATCH', 'DELETE'].includes(request.method())) writes.push(request.url());
  });
  await openHistory(context, page, route => route.fulfill({ json: revisions }));
  const storageKey = await page.evaluate(() => {
    const keys = Object.keys(localStorage).filter(key =>
      key.startsWith('ngx-webstorage') && key.endsWith('version'));
    if (keys.length !== 1) throw new Error('Expected one persisted builder version key.');
    localStorage.setItem(keys[0], JSON.stringify([{
      nid: '12', langcode: 'en', uuid: 'revision-page', title: 'Local unsaved draft',
      body: [{ type: 'text', body: '<p>Unsaved content</p>' }], current: true, dirty: true,
    }]));
    return keys[0];
  });
  const currentDraft = () => page.evaluate(key =>
    JSON.parse(localStorage.getItem(key) || '[]')
      .find((draft: { current: boolean }) => draft.current), storageKey
  );
  await page.reload();
  await expect(page.locator('app-builder-list')).toContainText('Unsaved content');
  await page.getByRole('button', { name: 'Revision fixture的更多操作', exact: true }).click();
  await page.getByRole('menuitem', { name: '历史版本', exact: true }).click();
  await context.route('**/api/v3/landingPage/revisions/12/*', route => { reads.push(route); });
  const preview = page.getByRole('button', { name: '载入历史版本 #29 到草稿', exact: true });
  const dialog = page.getByRole('dialog');
  await preview.click();
  await expect(dialog).toContainText(labels.BUILDER.REVISION.PREVIEW_TITLE);
  await dialog.getByRole('button', { name: '取消', exact: true }).click();
  expect(reads).toHaveLength(0);
  expect(await currentDraft()).toMatchObject({ title: 'Local unsaved draft', dirty: true });

  await preview.click();
  await dialog.getByRole('button', { name: labels.BUILDER.REVISION.PREVIEW_YES }).click();
  await expect.poll(() => reads.length).toBe(1);
  await reads[0].fulfill({ status: 503, json: { message: 'Synthetic failure' } });
  await expect(page.getByText(labels.BUILDER.REVISION.LOAD_FAIL, { exact: true })).toBeVisible();
  expect(await currentDraft()).toMatchObject({ title: 'Local unsaved draft', dirty: true });

  await preview.click();
  await dialog.getByRole('button', { name: labels.BUILDER.REVISION.PREVIEW_YES }).click();
  await expect.poll(() => reads.length).toBe(2);
  await fulfillDraft(reads[1], 'Restored after retry');
  await expect(page.locator('app-builder-list')).toContainText('Restored after retry');
  expect(await currentDraft()).toMatchObject({
    nid: '12', langcode: 'en', revisionVid: '29', vid: '31', dirty: true,
  });
  expect(writes).toEqual([]);
});
