import AxeBuilder from '@axe-core/playwright';
import type { BrowserContext, Page } from '@playwright/test';
import { resolve } from 'node:path';
import { expect, test } from './fixtures/test';

const schema = {
  fields: [{ key: 'body', fieldType: 'text_with_summary', label: '正文', required: true,
    textFormat: 'plain_text', editor: 'plain_text' }],
  baseFields: { title: 'title' },
  baseFieldNames: { title: 'title', status: 'status', langcode: 'langcode' },
  moderated: false, states: [], defaults: { state: 'published', promote: false, sticky: false },
  canDelete: false,
};

async function session(context: BrowserContext, page: Page, path: string): Promise<void> {
  // Every CMS request is synthetic, including unrelated builder navigation requests.
  await context.route('**/api/**', route => route.fulfill({ json: {} }));
  await context.route('**/assets/i18n/*.json', route => route.fulfill({
    path: resolve('src/assets/i18n', new URL(route.request().url()).pathname.split('/').pop()!),
    contentType: 'application/json',
  }));
  await context.route('**/api/v3/landingPage*', route => route.fulfill({ json:
    new URL(route.request().url()).searchParams.get('content') === '/core/base'
      ? { defaultTheme: 'light-theme', builder: { guard: false } } : {},
  }));
  await context.route('**/api/v3/node-form/**', route => route.fulfill({ json:
    new URL(route.request().url()).pathname.endsWith('/types')
      ? { data: [{ value: 'blog', label: '博客', desc: '' }] } : schema,
  }));
  await context.route('**/oauth/token', route => route.fulfill({ json: {
    access_token: 'synthetic-writer', refresh_token: 'synthetic-refresh',
    token_type: 'Bearer', expires_in: 3600,
  } }));
  await context.route('**/api/v3/accountProfile*', route => route.fulfill({ json: {
    uid: 7, name: 'writer', roles: ['authenticated', 'writer'],
  } }));
  await context.route('**/api/v1/user/user*', route => route.fulfill({ json: { data: [{
    id: 'writer-uuid', display_name: 'Writer', login: '2026-01-01T00:00:00+00:00',
    roles: [{ meta: { drupal_internal__target_id: 'writer' } }],
  }] } }));
  await page.addInitScript(returnUrl => {
    sessionStorage.setItem('xinshi-oauth-pkce', JSON.stringify({
      verifier: 'test-verifier', state: 'test-state', mode: 'redirect', returnUrl,
    }));
  }, path);
}

async function open(page: Page): Promise<void> {
  await page.goto('/me/login/callback?code=test-code&state=test-state');
  await expect(page).toHaveURL(/\/builder\/node\//);
}

test('ordinary writer fills a permitted form and submits no administrative fields', async ({ context, page }) => {
  await session(context, page, '/builder/node/add/blog');
  let payload: any;
  await context.route('**/api/v1/node/blog', route => {
    payload = route.request().postDataJSON();
    return route.fulfill({ status: 201, json: { data: { id: 'created', attributes: { title: 'Blog' } } } });
  });
  await open(page);
  const form = page.locator('app-node-add');
  await form.getByRole('textbox', { name: '标题', exact: true }).fill('普通用户博客');
  await form.getByRole('textbox', { name: '正文', exact: true }).fill('无需字段管理权限。');
  await expect(form.getByRole('combobox', { name: '发布状态' })).toHaveCount(0);
  await expect(form.getByRole('checkbox')).toHaveCount(0);
  const accessibility = await new AxeBuilder({ page }).include('app-node-add')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(accessibility.violations).toEqual([]);
  await form.getByRole('button', { name: '保存', exact: true }).click();
  await expect.poll(() => payload).toBeDefined();
  expect(payload.data.attributes).toEqual({ title: '普通用户博客',
    body: { value: '无需字段管理权限。', format: 'plain_text' } });
});

test('permission failure blocks save and a successful retry restores a title-only form', async ({ context, page }) => {
  await session(context, page, '/builder/node/add/blog');
  let denied = true;
  await context.route('**/api/v3/node-form/blog*', route => route.fulfill({
    status: denied ? 403 : 200,
    json: denied ? { code: 'permission_denied' } : { ...schema, fields: [] },
  }));
  await open(page);
  const form = page.locator('app-node-add');
  await expect(form.getByRole('heading', { name: '暂时无法创建此内容' })).toBeFocused();
  await expect(form.getByRole('alert')).toContainText('当前账户暂未获得');
  await expect(form.getByRole('button', { name: '保存', exact: true })).toHaveCount(0);
  await expect(form.locator('.node-aside')).toHaveCount(0);
  await expect(form.getByRole('link', { name: '返回管理中心' })).toHaveAttribute('href', '/builder/hub');
  const accessibility = await new AxeBuilder({ page }).include('app-node-add')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(accessibility.violations).toEqual([]);
  await form.getByRole('button', { name: '重新检查权限', exact: true }).click();
  await expect(form.getByRole('heading', { name: '暂时无法创建此内容' })).toBeFocused();
  denied = false;
  await form.getByRole('button', { name: '重新检查权限', exact: true }).click();
  await expect(form.getByRole('textbox', { name: '标题', exact: true })).toBeVisible();
  await expect(form.getByRole('alert')).toHaveCount(0);
});

test('denied edit returns to the management center in the current language', async ({ context, page }) => {
  const uuid = '11111111-1111-4111-8111-111111111111';
  await session(context, page, `/en/builder/node/edit/blog/${uuid}`);
  // Content access can fail even when the form description loads successfully.
  await context.route(`**/api/v1/node/blog/${uuid}*`, route => route.fulfill({
    status: 403, json: { errors: [{ status: '403' }] },
  }));
  await open(page);
  // The app chooses its interface language on bootstrap; the OAuth callback starts in Chinese.
  await page.reload();
  const form = page.locator('app-node-add');
  await expect(form.getByRole('heading', { name: 'You cannot edit this content yet' })).toBeFocused();
  const back = form.getByRole('link', { name: 'Management center', exact: true });
  await expect(back).toHaveAttribute('href', '/en/builder/hub');
  await page.keyboard.press('Tab');
  await expect(back).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/en\/builder\/hub$/);
});

test('edit-only account uses an entity-specific form without create options', async ({ context, page }) => {
  const uuid = '11111111-1111-4111-8111-111111111111';
  await session(context, page, `/builder/node/edit/blog/${uuid}`);
  await context.route('**/api/v3/node-form/types', route => route.fulfill({ json: { data: [] } }));
  await context.route(`**/api/v1/node/blog/${uuid}*`, route => route.fulfill({ json: { data: {
    id: uuid, attributes: { title: '本人博客', status: true, langcode: 'zh-hans',
      changed: '2026-01-01T00:00:00+00:00', body: { value: '已有正文', format: 'plain_text' } },
  } } }));
  await open(page);
  const form = page.locator('app-node-add');
  await expect(form.getByRole('textbox', { name: '标题', exact: true })).toHaveValue('本人博客');
  await expect(form.getByRole('textbox', { name: '正文', exact: true })).toHaveValue('已有正文');
  await expect(form.getByRole('button', { name: '删除', exact: true })).toHaveCount(0);
});

test('comment author uses a plain-text editor and the comment bundle without an author override', async ({ context, page }) => {
  await session(context, page, '/preview');
  await page.addInitScript(() => {
    localStorage.setItem('ngx-webstorage:version', JSON.stringify([{
      title: 'Comment regression', current: true, body: [{
        type: 'question', title: 'Comment regression', body: '<p>Question</p>',
        editor: { placeholder: '填写评论', action: { label: '提交评论' } },
        params: { comment: { type: 'comment--discussion',
          attributes: { entity_type: 'node', field_name: 'field_comments' },
          relationships: {
            entity_id: { data: { type: 'node--blog', id: 'node-id' } },
            uid: { data: { type: 'user--user', id: 'legacy-author' } },
          },
        } },
      }],
    }]));
  });
  await context.route('**/api/v3/comment-form/discussion', route => route.fulfill({ json: {
    key: 'comment_body', textFormat: 'plain_text', editor: 'plain_text',
  } }));
  let payload: any;
  await context.route('**/api/v1/comment/discussion*', route => {
    if (route.request().method() === 'POST') {
      payload = route.request().postDataJSON();
      return route.fulfill({ status: 201, json: { data: { id: 'comment-id' } } });
    }
    return route.fulfill({ json: { data: [] } });
  });
  await page.goto('/me/login/callback?code=test-code&state=test-state');
  await expect(page).toHaveURL(/\/preview$/);
  // Hosts can initialize BuilderState before browser storage is ready. Sync the fixture draft
  // through the same event that a separate editor tab sends after the preview has opened.
  await expect(page.locator('app-preview')).toBeAttached();
  await page.evaluate(() => window.dispatchEvent(new StorageEvent('storage', {
    key: 'ngx-webstorage:version', newValue: localStorage.getItem('ngx-webstorage:version'),
  })));
  await page.getByRole('button', { name: '回答', exact: true }).click();
  const form = page.locator('app-comment-form');
  await form.getByRole('button', { name: '填写评论', exact: true }).click();
  const editor = form.getByRole('textbox', { name: '填写评论' });
  await expect(editor).toBeFocused();
  await editor.fill('保留 <tag> 和 & 字符');
  const accessibility = await new AxeBuilder({ page }).include('app-comment-form')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(accessibility.violations).toEqual([]);
  await form.getByRole('button', { name: '提交评论', exact: true }).click();
  await expect.poll(() => payload).toBeDefined();
  expect(payload.data.attributes.comment_body).toEqual({
    value: '保留 <tag> 和 & 字符', format: 'plain_text',
  });
  expect(payload.data.relationships.uid).toBeUndefined();
  await expect(editor).toHaveValue('');
});
