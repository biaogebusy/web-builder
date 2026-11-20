import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures/test';

for (const mode of ['list', 'settings', 'rejected', 'missing'] as const) {
  test(`Multilingual page identity and deletion: ${mode}`, async ({ context, page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    let translated = true;
    const writes: string[] = [];
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const rows = () => [
      { nid: '12', uuid: 'page-12', langcode: 'en', title: 'Global services',
        default_langcode: true, translation_languages: ['en', ...(translated ? ['zh-hans'] : [])] },
      ...(translated ? [{ nid: '12', uuid: 'page-12', langcode: 'zh-hans', title: '全球服务',
        default_langcode: false, translation_languages: ['en', 'zh-hans'] }] : []),
      { nid: '13', uuid: 'page-13', langcode: 'zh-hans', title: '新品发布',
        default_langcode: true, translation_languages: ['zh-hans'] },
    ].map(row => ({ ...row, url: '/services', published: true }));
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
    await context.route('**/api/v2/node/landing-page*', route => route.fulfill({ json: {
      rows: rows(), pager: { current_page: 0, total_pages: 1,
        total_items: rows().length, items_per_page: 10 },
    } }));
    await context.route('**/api/v3/landingPage**', route => {
      const url = new URL(route.request().url());
      if (route.request().method() === 'POST') {
        writes.push(url.pathname);
        if (mode !== 'rejected') translated = false;
        return route.fulfill({ json: { status: mode !== 'rejected' } });
      }
      const nid = url.pathname.split('/').pop();
      if (nid === '12' || nid === '13') {
        const langcode = nid === '12' && url.pathname.startsWith('/en/') ? 'en' : 'zh-hans';
        return route.fulfill({ json: {
          status: true, published: true, nid, uuid: `page-${nid}`, langcode,
          title: nid === '13' ? '新品发布' : langcode === 'en' ? 'Global services' : '全球服务',
          body: [{ type: 'json', uuid: `block-${nid}`, attributes: {
            body: { type: 'text', body: '<p>Saved page content</p>' },
          } }],
        } });
      }
      return route.fulfill({ json: url.searchParams.get('content') === '/core/base'
        ? { defaultTheme: 'light-theme', builder: { guard: false, enable: true } } : {} });
    });
    await context.route('**/api/v3/node-form/landing_page/page-12*', route => route.fulfill({
      json: { fields: [], baseFields: { status: 'status' }, baseFieldNames: { status: 'status' },
        moderated: false, defaults: { state: 'published' }, canDelete: true,
        states: [{ value: 'published', label: '已发布' }, { value: 'unpublished', label: '未发布' }] },
    }));
    await context.route('**/api/v1/node/landing_page/page-12*', route => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.pathname.startsWith('/zh-hans/')) {
        return route.fulfill({ status: 404, json: {} });
      }
      if (request.method() !== 'GET') {
        writes.push(`${request.method()} ${url.pathname}`);
        return route.fulfill({ status: 204 });
      }
      const langcode = url.pathname.startsWith('/en/') ? 'en' : 'zh-hans';
      return route.fulfill({ json: {
        data: { id: 'page-12', type: 'node--landing_page', attributes: {
          title: langcode === 'en' ? 'Global services' : '全球服务', langcode,
          ...(mode === 'missing' ? {} : { default_langcode: langcode === 'en' }),
          drupal_internal__nid: 12, changed: '2026-10-29T01:00:00Z',
          path: { alias: '/services' }, meta_tags: {}, status: true,
        } },
        included: [{ type: 'user--user', attributes: { display_name: 'Fixture editor' } }],
      } });
    });
    await page.goto('/me/login/callback?code=test-code&state=test-state');
    await expect(page).toHaveURL(/\/builder\/page-list/);
    const original = page.locator('app-page-item').filter({ hasText: 'Global services' });
    const translation = page.locator('app-page-item').filter({ hasText: '全球服务' });
    await expect(original.locator('.language-row')).toContainText('原始版本');
    await expect(translation.locator('.language-row')).toContainText('中文');
    await expect(translation.locator('.language-row')).toContainText('翻译版本');

    if (mode === 'list') {
      await original.getByRole('button', { name: 'Global services', exact: true }).click();
      await expect(page.locator('app-builder-list')).toContainText('Saved page content');
      await original.locator('.more-trigger').click();
      await expect(page.getByRole('menuitem', { name: '编辑 中文 版本', exact: true })).toBeVisible();
      expect((await new AxeBuilder({ page }).include('app-page-item').include('.mat-mdc-menu-panel')
        .analyze()).violations).toEqual([]);
      await page.screenshot({ path: 'test-results/page-languages/01-language-actions.png', fullPage: true, animations: 'disabled' });
      await page.getByRole('menuitem', { name: '删除整页', exact: true }).click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toContainText('全部语言版本');
      await expect(dialog).toContainText('EN');
      await expect(dialog.getByRole('button', { name: '取消', exact: true })).toBeFocused();
      await page.screenshot({ path: 'test-results/page-languages/02-delete-all.png', fullPage: true, animations: 'disabled' });
      await dialog.getByRole('button', { name: '取消', exact: true }).click();
      expect(writes).toEqual([]);
      await expect(original.locator('.more-trigger')).toBeFocused();

      const newPage = page.locator('app-page-item').filter({ hasText: '新品发布' });
      await newPage.locator('.more-trigger').click();
      await page.getByRole('menuitem', { name: '创建 EN 翻译草稿', exact: true }).click();
      await expect(dialog).toContainText('文字不会自动翻译');
      await expect(dialog).toContainText('保存翻译');
      await page.screenshot({ path: 'test-results/page-languages/03-create-draft.png', fullPage: true, animations: 'disabled' });
      await dialog.getByRole('button', { name: '开始编辑草稿', exact: true }).click();
      await expect(page.locator('app-builder-toolbar')).toContainText('翻译草稿');
      await expect(page.locator('app-builder-toolbar')).toContainText('保存翻译');
      expect(writes).toEqual([]);
    }

    await translation.locator('.more-trigger').click();
    if (mode === 'settings') {
      await page.getByRole('menuitem', { name: '页面设置', exact: true }).click();
      const settings = page.locator('app-page-setting');
      const language = page.locator('.right-title .language-context');
      await expect(language).toContainText('中文');
      await expect(language).toContainText('翻译版本');
      await expect(language).toBeInViewport();
      await page.screenshot({ path: 'test-results/page-languages/05-settings-header-desktop.png',
        fullPage: true, animations: 'disabled' });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.addStyleTag({ content: '* { transition: none !important; }' });
      for (const theme of ['light', 'dark']) {
        await page.evaluate(dark => {
          document.documentElement.classList.toggle('light-theme', !dark);
          document.documentElement.classList.toggle('dark-theme', dark);
        }, theme === 'dark');
        expect((await new AxeBuilder({ page }).include('.page-settings-drawer').analyze()).violations)
          .toEqual([]);
        await page.screenshot({ path: `test-results/page-languages/05-settings-actions-${theme}.png`,
          fullPage: true, animations: 'disabled' });
      }
      await settings.getByRole('button', { name: '删除译文', exact: true }).click();
    } else {
      await page.getByRole('menuitem', { name: '仅删除 中文 版本', exact: true }).click();
    }
    if (mode === 'missing') {
      await expect(page.locator('mat-snack-bar-container').last()).toContainText('无法确认页面的语言和删除范围');
      await expect(page.getByRole('dialog')).toHaveCount(0);
      expect(writes).toEqual([]);
    } else {
      const dialog = page.getByRole('dialog');
      await expect(dialog).toContainText('其他语言版本将保留');
      if (mode === 'settings') {
        for (const theme of ['light', 'dark']) {
          await page.evaluate(dark => {
            document.documentElement.classList.toggle('light-theme', !dark);
            document.documentElement.classList.toggle('dark-theme', dark);
          }, theme === 'dark');
          await expect(dialog.getByRole('button', { name: '仅删除 中文 版本', exact: true }))
            .toBeInViewport();
          expect((await new AxeBuilder({ page }).include('mat-dialog-container').analyze()).violations)
            .toEqual([]);
          await page.screenshot({ path: `test-results/page-languages/04-delete-translation-${theme}.png`,
            fullPage: true, animations: 'disabled' });
        }
      }
      await dialog.getByRole('button', { name: '仅删除 中文 版本', exact: true }).click();
      await expect.poll(() => writes).toEqual(['/api/v3/landingPage/translations/delete/12/zh-hans']);
      if (mode === 'rejected') {
        await expect(page.locator('mat-snack-bar-container').last()).toContainText('失败');
        await expect(translation).toBeVisible();
      } else {
        await expect(page.locator('mat-snack-bar-container').last()).toContainText('已删除');
        await expect(translation).toHaveCount(0);
      }
      await expect(original).toHaveCount(1);
    }
    expect(errors).toEqual([]);
  });
}
