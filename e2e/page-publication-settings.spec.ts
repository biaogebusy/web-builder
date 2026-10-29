import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures/test';

for (const mode of ['allowed', 'read-only', 'moderated', 'rejected', 'two-step'] as const) {
  test(`Builder page publication settings: ${mode}`, async ({ context, page }) => {
    const twoStep = mode === 'two-step';
    if (twoStep) await page.setViewportSize({ width: 1440, height: 1000 });
    let published = !twoStep;
    let state = twoStep ? 'unpublished' : 'published';
    let title = 'Status fixture';
    let canvasReads = 0;
    const writes: Record<string, unknown>[] = [];
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const editable = mode !== 'read-only';
    const moderated = mode === 'moderated' || twoStep;
    await context.route('**/api/**', route => route.fulfill({ json: { rows: [] } }));
    await context.route('**/session/token', route => route.fulfill({
      contentType: 'text/plain', body: 't'.repeat(43),
    }));
    await context.route('**/oauth/token', route => route.fulfill({ json: {
      access_token: 'synthetic-editor', refresh_token: 'synthetic-refresh',
      token_type: 'Bearer', expires_in: 3600,
    } }));
    await context.route('**/api/v3/accountProfile*', route => route.fulfill({ json: {
      uid: 7, name: 'editor', roles: ['authenticated', 'editor'],
    } }));
    await context.route('**/api/v1/user/user*', route => route.fulfill({ json: { data: [{
      id: 'editor-uuid', display_name: 'Editor', login: '2026-01-01T00:00:00+00:00',
      roles: [{ meta: { drupal_internal__target_id: 'editor' } }],
    }] } }));
    await page.addInitScript(() => {
      sessionStorage.setItem('xinshi-oauth-pkce', JSON.stringify({
        verifier: 'test-verifier', state: 'test-state', mode: 'redirect',
        returnUrl: '/builder/page-list',
      }));
    });
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
        title, url: '/status-fixture', published,
        ...(twoStep ? { moderation_state: state, moderation_state_label: state } : {}) }],
      pager: { current_page: 0, total_pages: 1, total_items: 1, items_per_page: 10 },
    } }));
    await context.route('**/api/v3/node-form/landing_page/page-12*', route => {
      expect(new URL(route.request().url()).searchParams.get('lang')).toBe('zh-hans');
      return route.fulfill({ json: {
        fields: [], baseFields: editable ? moderated ? { moderation_state: 'moderation_state' }
          : { status: 'status' } : {},
        baseFieldNames: { status: 'status' }, moderated,
        defaults: { state, promote: false, sticky: false }, canDelete: false,
        states: !editable ? [] : twoStep
          ? state === 'unpublished' ? [{ value: 'draft', label: '草稿' }]
            : [{ value: 'draft', label: '草稿' }, { value: 'published', label: '已发布' }]
          : moderated
          ? [{ value: 'review', label: '待审核' }]
          : [{ value: 'published', label: 'Published' }, { value: 'unpublished', label: 'Unpublished' }],
      } });
    });
    await context.route('**/api/v1/node/landing_page/page-12*', route => {
      if (route.request().method() === 'PATCH') {
        const payload = route.request().postDataJSON();
        writes.push(payload.data.attributes);
        expect(payload.data.relationships).toEqual({
          uid: { data: { type: 'user--user', id: 'editor-uuid' } }, group: { data: null },
        });
        expect(route.request().headers()['authorization']).toBe('Bearer synthetic-editor');
        if (mode === 'rejected') return route.fulfill({ status: 403, json: { errors: [] } });
        title = payload.data.attributes.title;
        if (twoStep) {
          state = payload.data.attributes.moderation_state;
          published = state === 'published';
        } else if (moderated) {
          state = 'review';
          return route.fulfill({ json: {
            data: { attributes: { status: false, moderation_state: state, title } },
          } });
        } else {
          published = payload.data.attributes.status;
          state = published ? 'published' : 'unpublished';
        }
      }
      return route.fulfill({ json: {
        data: { id: 'page-12', type: 'node--landing_page', attributes: {
          title, langcode: 'zh-hans', drupal_internal__nid: 12,
          changed: '2026-10-29T01:00:00Z', path: { alias: '/status-fixture' },
          meta_tags: {}, status: published,
        } },
        included: [{ type: 'user--user', attributes: { display_name: 'Fixture author' } }],
      } });
    });
    await page.goto('/me/login/callback?code=test-code&state=test-state');
    await expect(page).toHaveURL(/\/builder\/page-list/);
    const row = page.locator('app-page-item');
    await row.getByRole('button', { name: 'Status fixture', exact: true }).click();
    await expect(page.locator('app-builder-list')).toContainText('Canvas content stays here');
    const readsBefore = canvasReads;
    await row.locator('.more-trigger').click();
    if (twoStep) {
      await expect(page.getByRole('menuitem', { name: '页面属性', exact: true })).toBeVisible();
      await page.mouse.move(1000, 100);
      await page.screenshot({ path: 'test-results/publication-audit/01-entry.png',
        fullPage: true, animations: 'disabled' });
    }
    await page.getByRole('menuitem', { name: '页面属性', exact: true }).click();
    const panel = page.locator('app-page-setting');
    const select = panel.getByRole('combobox', { name: '页面状态' });
    await expect(select).toBeVisible();
    await expect(panel.getByRole('button', { name: '更新状态', exact: true })).toHaveCount(0);
    if (!editable) {
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(select).toBeDisabled();
      await expect(panel.getByRole('button', { name: '更新', exact: true })).toBeEnabled();
      expect(writes).toEqual([]);
    } else if (twoStep) {
      await expect(row.locator('.unpublished-badge')).toHaveText('未发布');
      await select.click();
      await expect(page.getByRole('option', { name: '已发布', exact: true })).toHaveCount(0);
      await page.screenshot({ path: 'test-results/publication-audit/02-unpublished-options.png', fullPage: true, animations: 'disabled' });
      await page.getByRole('option', { name: '草稿', exact: true }).click();
      await panel.getByRole('button', { name: '更新', exact: true }).click();
      await expect(row.locator('.draft-badge')).toHaveText('草稿');
      await expect(row.locator('.unpublished-badge')).toHaveCount(0);
      await expect(row.locator('.preview-link')).toHaveCount(0);
      await expect(select).toContainText('草稿');
      await expect(page.locator('app-builder-list .publication-bar')).toContainText('未发布');
      await select.scrollIntoViewIfNeeded();
      await page.screenshot({ path: 'test-results/publication-audit/03-draft-saved.png', fullPage: true, animations: 'disabled' });
      await select.click();
      await expect(page.getByRole('option', { name: '已发布', exact: true })).toBeVisible();
      await page.screenshot({ path: 'test-results/publication-audit/04-publish-options.png', fullPage: true, animations: 'disabled' });
      await page.getByRole('option', { name: '已发布', exact: true }).click();
      await panel.getByRole('button', { name: '更新', exact: true }).click();
      await expect(row.locator('.published-badge')).toHaveText('已发布');
      await expect(row.locator('.draft-badge')).toHaveCount(0);
      await expect(row.locator('.preview-link')).toBeVisible();
      await expect(page.locator('app-builder-list .publication-bar')).toHaveCount(0);
      expect(writes.map(write => write.moderation_state)).toEqual(['draft', 'published']);
      for (const write of writes) {
        expect(write).not.toHaveProperty('body');
        expect(write).not.toHaveProperty('status');
      }
      expect(canvasReads).toBe(readsBefore);
      await expect(page.locator('app-builder-list')).toContainText('Canvas content stays here');
      await select.scrollIntoViewIfNeeded();
      await page.screenshot({ path: 'test-results/publication-audit/05-published.png', fullPage: true, animations: 'disabled' });
    } else {
      await panel.getByRole('textbox', { name: '标题', exact: true }).fill('Updated status fixture');
      await select.click();
      await page.getByRole('option', { name: moderated ? '待审核' : '未发布', exact: true }).click();
      await panel.getByRole('button', { name: '更新', exact: true }).click();
      if (mode === 'rejected') {
        await expect(panel).toContainText('页面更新失败');
        expect(published).toBe(true);
      } else {
        await expect(row).toContainText('Updated status fixture');
        if (moderated) {
          await expect(page.locator('app-builder-list .publication-bar')).toHaveCount(0);
          await expect(row.locator('.unpublished-badge')).toHaveCount(0);
        } else {
          await expect(page.locator('app-builder-list .publication-bar')).toContainText('未发布');
          await expect(row.locator('.unpublished-badge')).toHaveText('未发布');
        }
      }
      expect(writes).toHaveLength(1);
      expect(writes[0]).toMatchObject({ title: 'Updated status fixture',
        ...(moderated ? { moderation_state: 'review' } : { status: false }) });
      expect(writes[0]).not.toHaveProperty('body');
      expect(writes[0]).not.toHaveProperty(moderated ? 'status' : 'moderation_state');
      expect(canvasReads).toBe(readsBefore);
      await expect(page.locator('app-builder-list')).toContainText('Canvas content stays here');
      if (mode === 'allowed') {
        await expect(panel.getByRole('textbox', { name: '标题', exact: true }))
          .toHaveValue('Updated status fixture');
        await expect(select).toContainText('未发布');
        await select.click();
        await page.getByRole('option', { name: '已发布', exact: true }).click();
        await panel.getByRole('button', { name: '更新', exact: true }).click();
        await expect(page.locator('app-builder-list .publication-bar')).toHaveCount(0);
        await expect(row.locator('.unpublished-badge')).toHaveCount(0);
        await expect(select).toContainText('已发布');
        expect(writes).toHaveLength(2);
        expect(writes[1].status).toBe(true);
        expect(writes[1].title).toBe('Updated status fixture');
        expect(canvasReads).toBe(readsBefore);
      }
    }
    expect((await new AxeBuilder({ page }).include('app-page-setting').analyze()).violations)
      .toEqual([]);
    expect((await new AxeBuilder({ page }).include('app-page-item').analyze()).violations)
      .toEqual([]);
    expect(errors).toEqual([]);
    await select.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/publication-settings-${mode}.png`, fullPage: true });
  });
}
