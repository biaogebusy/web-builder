import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures/test';

const branding = {
  header: { params: { themeSwitch: false, userInfo: false }, mainMenu: [],
    search: { enable: false, placeholder: '', tooltip: '', link: '', type: '', key: '' }, actions: [] },
  footer: { params: { mode: 'light' }, logo: { label: 'Publication fixture' }, mainMenu: [] },
};
const body = [{ type: 'text', body: '<p>Publication fixture content</p>' }];
const notFound = {
  title: 'Custom page not found', nid: '404', publicPageKey: 'node:404:en:1',
  body: [{ type: 'text', containerClasses: 'custom-not-found text-center p-8',
    body: '<h1>页面已经离开</h1><p>请返回首页查看其他内容。</p><a href="/">返回首页</a>' }],
};

for (const [authenticated, custom404] of [
  [false, false], [true, false], [false, true], [true, true],
]) {
  test(`public withdrawal (${authenticated ? 'authenticated' : 'anonymous'}, ${custom404 ? 'custom' : 'default'} 404)`, async ({ context, page }) => {
    let published = true;
    const publicReads: URL[] = [];
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    if (authenticated) await context.setExtraHTTPHeaders({ Authorization: 'Bearer synthetic-admin' });
    await context.route('**/api/**', route => route.fulfill({ json: { rows: [] } }));
    await context.route('**/api/v3/landingPage*', route => {
      const url = new URL(route.request().url());
      const content = url.searchParams.get('content');
      if (content === '/core/base') return route.fulfill({ json: { defaultTheme: 'light-theme', builder: { guard: false } } });
      if (content === '/core/branding') return route.fulfill({ json: branding });
      publicReads.push(url);
      if (content === '/404') return route.fulfill({ status: custom404 ? 200 : 404, json: custom404 ? notFound : {} });
      return route.fulfill({ status: published ? 200 : 404, json: published ? { title: 'Public fixture', body, publicPageKey: 'node:1:en:1' } : { body: [{ type: 'text', body: 'Legacy configured JSON' }] } });
    });
    await page.goto('/publication-fixture');
    await expect(page.locator('app-page')).toContainText('Publication fixture content');
    published = false;
    await page.evaluate(() => window.dispatchEvent(new Event('focus')));
    const fallback = page.locator(custom404 ? '.custom-not-found' : '.public-unavailable');
    await expect(fallback).toBeVisible();
    await expect(page.locator('app-page')).not.toContainText('Publication fixture content');
    await expect(page.locator('app-page')).not.toContainText('Legacy configured JSON');
    if (!custom404) {
      await expect(fallback.locator('app-text .text-body')).toHaveText('页面不存在或已下线');
    }
    if (custom404) {
      await expect(fallback).toContainText('页面已经离开');
      await expect(fallback).toHaveCSS('text-align', 'center');
      await expect(page).toHaveTitle(notFound.title);
      await expect(page.locator('.public-unavailable')).toHaveCount(0);
      await expect(page.locator('.page-toolbar')).toHaveCount(0);
      await page.screenshot({ path: `test-results/custom-404-${authenticated}.png` });
    }
    await page.goto('/publication-fixture?preview=true&public=false');
    await expect(fallback).toBeVisible();
    expect(page.url()).toContain('/publication-fixture?');
    expect(publicReads.length).toBeGreaterThan(1);
    expect(publicReads.every(url => url.searchParams.get('public') === 'true')).toBe(true);
    expect((await new AxeBuilder({ page }).include(custom404 ? '.custom-not-found' : '.public-unavailable').analyze()).violations).toEqual([]);
    published = true;
    await page.evaluate(() => window.dispatchEvent(new Event('focus')));
    await expect(page.locator('app-page')).toContainText('Publication fixture content');
    await expect(fallback).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('unpublished /404 page opens in the builder and retains the private preview', async ({ context, page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.stack || error.message));
  await context.route('**/api/**', route => route.fulfill({ json: { rows: [] } }));
  await context.route('**/api/v3/landingPage**', route => {
    const url = new URL(route.request().url());
    const content = url.searchParams.get('content');
    if (url.pathname.endsWith('/json/12')) return route.fulfill({ json: {
      status: true, published: false, nid: '12', uuid: 'page-12', langcode: 'zh-hans', title: 'Draft fixture', body: [{ type: 'json', uuid: 'block-12', attributes: { body: body[0] } }],
    } });
    return route.fulfill({ json: content === '/core/base'
      ? { defaultTheme: 'light-theme', builder: { guard: false } }
      : content === '/core/branding' ? branding : {} });
  });
  await context.route('**/api/v2/node/landing-page*', route => route.fulfill({ json: {
    rows: [{ nid: '12', uuid: 'page-12', langcode: 'zh-hans', title: 'Draft fixture', url: '/404', published: false }],
    pager: { current_page: 0, total_pages: 1, total_items: 1, items_per_page: 10 },
  } }));
  await context.route('**/api/v3/node/component*', route => route.fulfill({ json: [] }));
  const reads: string[] = [];
  page.on('request', request => { if (request.url().includes('/api/')) reads.push(request.url()); });
  await page.goto('/builder/page-list');
  const row = page.locator('app-page-item');
  await expect(row.locator('.unpublished-badge')).toHaveText('未发布');
  await expect(row.locator('.unsaved-badge')).toHaveCount(0);
  await expect(row.locator('.preview-link')).toHaveCount(0);
  await row.getByRole('button', { name: 'Draft fixture', exact: true }).click();
  expect(errors).toEqual([]);
  await expect.poll(() => reads.filter(url => url.includes('/json/12'))).not.toEqual([]);
  await expect(page.locator('app-builder-list .publication-bar')).toContainText('未发布');
  await expect(page.locator('app-builder-list')).toContainText('Publication fixture content');
  expect((await new AxeBuilder({ page }).include('.publication-bar').include('app-page-item').analyze()).violations).toEqual([]);
  await page.screenshot({ path: 'test-results/publication-builder.png', fullPage: true });
  await page.goto('/preview');
  await expect(page.locator('app-preview')).toContainText('Publication fixture content');
  expect(errors).toEqual([]);
});
