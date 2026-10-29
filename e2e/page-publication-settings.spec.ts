import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures/test';

for (const mode of ['allowed', 'read-only', 'moderated', 'rejected'] as const) {
  test(`Builder page publication settings: ${mode}`, async ({ context, page }) => {
    let published = true;
    let state = 'published';
    let canvasReads = 0;
    const writes: Record<string, unknown>[] = [];
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const editable = mode !== 'read-only';
    const moderated = mode === 'moderated';
    await context.route('**/api/**', route => route.fulfill({ json: { rows: [] } }));
    await context.route('**/session/token', route => route.fulfill({
      contentType: 'text/plain', body: 't'.repeat(43),
    }));
    await context.route('**/api/v3/landingPage**', route => {
      const url = new URL(route.request().url());
      if (url.pathname.endsWith('/json/12')) {
        canvasReads++;
        return route.fulfill({ json: {
          status: true, published, nid: '12', uuid: 'page-12', langcode: 'zh-hans',
          title: 'Status fixture', body: [{ type: 'json', uuid: 'block-12',
            attributes: { body: { type: 'text', body: '<p>Canvas content stays here</p>' } } }],
        } });
      }
      return route.fulfill({ json: url.searchParams.get('content') === '/core/base'
        ? { defaultTheme: 'light-theme', builder: { guard: false } } : {} });
    });
    await context.route('**/api/v2/node/landing-page*', route => route.fulfill({ json: {
      rows: [{ nid: '12', uuid: 'page-12', langcode: 'zh-hans',
        title: 'Status fixture', url: '/status-fixture', published }],
      pager: { current_page: 0, total_pages: 1, total_items: 1, items_per_page: 10 },
    } }));
    await context.route('**/api/v3/node-form/landing_page/page-12*', route => {
      expect(new URL(route.request().url()).searchParams.get('lang')).toBe('zh-hans');
      return route.fulfill({ json: {
        fields: [], baseFields: editable ? moderated ? { moderation_state: 'moderation_state' }
          : { status: 'status' } : {},
        baseFieldNames: { status: 'status' }, moderated,
        defaults: { state, promote: false, sticky: false }, canDelete: false,
        states: !editable ? [] : moderated
          ? [{ value: 'review', label: '待审核' }]
          : [{ value: 'published', label: 'Published' }, { value: 'unpublished', label: 'Unpublished' }],
      } });
    });
    await context.route('**/api/v1/node/landing_page/page-12*', route => {
      if (route.request().method() === 'PATCH') {
        const payload = route.request().postDataJSON();
        writes.push(payload.data.attributes);
        expect(payload.data.relationships).toEqual({});
        expect(route.request().headers()['x-csrf-token']).toBe('t'.repeat(43));
        if (mode === 'rejected') return route.fulfill({ status: 403, json: { errors: [] } });
        if (moderated) return route.fulfill({ json: {
          data: { attributes: { status: false, moderation_state: 'review' } },
        } });
        state = 'unpublished';
        published = false;
      }
      return route.fulfill({ json: {
        data: { id: 'page-12', type: 'node--landing_page', attributes: {
          title: 'Status fixture', langcode: 'zh-hans', drupal_internal__nid: 12,
          changed: '2026-10-29T01:00:00Z', path: { alias: '/status-fixture' },
          meta_tags: {}, status: published,
        } },
        included: [{ type: 'user--user', attributes: { display_name: 'Fixture author' } }],
      } });
    });
    await page.goto('/builder/page-list');
    const row = page.locator('app-page-item');
    await row.getByRole('button', { name: 'Status fixture', exact: true }).click();
    await expect(page.locator('app-builder-list')).toContainText('Canvas content stays here');
    const readsBefore = canvasReads;
    await row.locator('.more-trigger').click();
    await page.getByRole('menuitem', { name: '页面属性', exact: true }).click();
    const panel = page.locator('app-page-publication');
    const select = panel.getByRole('combobox', { name: '页面状态' });
    await expect(select).toBeVisible();
    if (!editable) {
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(select).toBeDisabled();
      await expect(panel).toContainText('当前账户不能修改页面状态');
      expect(writes).toEqual([]);
    } else {
      await select.click();
      await page.getByRole('option', { name: moderated ? '待审核' : '未发布', exact: true }).click();
      await panel.getByRole('button', { name: '更新状态', exact: true }).click();
      if (mode === 'rejected') {
        await expect(panel).toContainText('页面状态更新失败');
        expect(published).toBe(true);
      } else {
        await expect(panel).toContainText('页面状态已更新');
        if (moderated) {
          await expect(panel).toContainText('页面是否下线由审核流程决定');
          await expect(page.locator('app-builder-list .publication-bar')).toHaveCount(0);
          await expect(row.locator('.unpublished-badge')).toHaveCount(0);
        } else {
          await expect(page.locator('app-builder-list .publication-bar')).toContainText('未发布');
          await expect(row.locator('.unpublished-badge')).toHaveText('未发布');
        }
      }
      expect(writes).toEqual([moderated ? { moderation_state: 'review' } : { status: false }]);
      expect(canvasReads).toBe(readsBefore);
      await expect(page.locator('app-builder-list')).toContainText('Canvas content stays here');
    }
    expect((await new AxeBuilder({ page }).include('app-page-publication').analyze()).violations)
      .toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `test-results/publication-settings-${mode}.png`, fullPage: true });
  });
}
