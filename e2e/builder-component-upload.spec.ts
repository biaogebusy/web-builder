import AxeBuilder from '@axe-core/playwright';
import type { BrowserContext, Locator, Page } from '@playwright/test';
import { expect, test } from './fixtures/test';
import { storageKey } from './fixtures/storage';

const versionKey = storageKey('version');

interface CanvasSession {
  failCategories?: boolean;
  onCategories?: () => void;
  onCreate?: (payload: unknown) => void;
}

const stubCanvasSession = async (
  context: BrowserContext,
  page: Page,
  body: Record<string, unknown>,
  { failCategories = false, onCategories, onCreate }: CanvasSession = {}
): Promise<void> => {
  await context.route('**/api/v3/landingPage*', route => {
    const content = new URL(route.request().url()).searchParams.get('content');
    return route.fulfill({
      json: content === '/core/base'
        ? { defaultTheme: 'light-theme', builder: { guard: false } }
        : {},
    });
  });
  await context.route('**/api/v3/node/component*', route => {
    onCategories?.();
    if (failCategories) {
      return route.fulfill({ status: 500, json: {} });
    }
    return route.fulfill({ json: [{
      uuid: 'sections', label: 'Sections', icon: 'widgets-outline',
      elements: [{ uuid: 'hero-category', label: 'Hero', child: [] }],
    }] });
  });
  await context.route('**/api/v1/node/component', route => {
    onCreate?.(route.request().postDataJSON());
    return route.fulfill({ status: 201, json: { data: { id: 'saved-component' } } });
  });
  await context.route('**/oauth/token', route => route.fulfill({ json: {
    access_token: 'stub-access-token', refresh_token: 'stub-refresh-token',
    token_type: 'Bearer', expires_in: 3600,
  } }));
  await context.route('**/api/v3/accountProfile*', route => route.fulfill({ json: {
    uid: 7, name: 'test-admin', roles: ['authenticated', 'administrator'],
  } }));
  await context.route('**/api/v1/user/user*', route => route.fulfill({ json: { data: [{
    id: 'admin-uuid', display_name: 'Test Admin', mail: 'admin@example.com',
    login: '2026-01-01T00:00:00+00:00',
    roles: [{ meta: { drupal_internal__target_id: 'administrator' } }],
  }] } }));
  await page.addInitScript(({ body, versionKey }) => {
    sessionStorage.setItem('xinshi-oauth-pkce', JSON.stringify({
      verifier: 'test-verifier', state: 'test-state', mode: 'redirect', returnUrl: '/builder',
    }));
    localStorage.setItem(versionKey, JSON.stringify([{
      title: 'Component upload', current: true, body: [body],
    }]));
  }, { body, versionKey });

  await page.goto('/me/login/callback?code=test-code&state=test-state');
  await expect(page).toHaveURL(/\/builder$/);
};

const tabTo = async (page: Page, target: Locator, maxSteps = 12): Promise<void> => {
  const isFocused = () => target.evaluate(el => el === document.activeElement);
  for (let i = 0; i < maxSteps && !await isFocused(); i++) {
    await page.keyboard.press('Tab');
  }
  await expect(target).toBeFocused();
};

test('administrator uploads a canvas snapshot with category and icon using the keyboard', async ({
  context, page,
}) => {
  const component = {
    type: 'text',
    body: '<p>Reusable draft content</p>',
    extra: { uuid: 'page-block-uuid' },
  };
  let libraryReads = 0;
  let created: { data: unknown } | undefined;
  await stubCanvasSession(context, page, component, {
    onCategories: () => libraryReads++,
    onCreate: payload => (created = payload as { data: unknown }),
  });

  const canvasItem = page.getByRole('group', { name: '画布组件 1', exact: true });
  await expect(canvasItem).toBeVisible();
  await canvasItem.focus();
  const upload = canvasItem.getByRole('button', { name: '上传到组件库', exact: true });
  await expect(upload).toBeVisible();
  // Focus enters the visible toolbar from the canvas group without needing a mouse hover.
  await tabTo(page, upload, 5);
  await page.keyboard.press('Enter');

  const dialog = page.getByRole('dialog', { name: '上传到组件库' });
  await expect(dialog).toBeVisible();
  const title = dialog.getByRole('textbox', { name: '标题' });
  await title.fill('Reusable section');
  await dialog.getByRole('button', { name: '保存', exact: true }).click();
  await expect(dialog).toBeVisible();
  expect(created).toBeUndefined();
  await dialog.getByRole('combobox', { name: '分类' }).click();
  await page.getByRole('option', { name: 'Sections > Hero', exact: true }).click();
  await page.keyboard.press('Escape');
  // A whitespace-only title stays invalid even with the category selected: Formly
  // rebuilds control validators from the field config, so only the config-side
  // pattern rejects it — asserted here against the real dialog.
  await title.fill('   ');
  await dialog.getByRole('button', { name: '保存', exact: true }).click();
  await expect(dialog).toBeVisible();
  expect(created).toBeUndefined();
  await title.fill('Reusable section');
  await dialog.getByRole('combobox', { name: '图标' }).click();
  await expect(page.getByPlaceholder('搜索', { exact: true })).toBeFocused();
  await page.keyboard.type('star-box-outline');
  await page.getByRole('option', { name: 'star-box-outline', exact: true }).click();

  const accessibility = await new AxeBuilder({ page })
    .include('[role="dialog"]')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  const readsBeforeSave = libraryReads;
  await dialog.getByRole('button', { name: '保存', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect.poll(() => created).toBeDefined();
  expect(created?.data).toMatchObject({
    type: 'node--component',
    attributes: {
      title: 'Reusable section', icon: 'star-box-outline', status: true,
      body: JSON.stringify({ type: 'text', body: component.body }),
    },
    relationships: {
      category: { data: [{ type: 'taxonomy_term--component_type', id: 'hero-category' }] },
    },
  });
  await expect.poll(() => libraryReads).toBeGreaterThan(readsBeforeSave);
  await expect(canvasItem).toBeFocused();
  await expect(canvasItem).toContainText('Reusable draft content');
  expect(await page.evaluate(versionKey => {
    const pages = JSON.parse(localStorage.getItem(versionKey) ?? '[]');
    return pages[0].body[0].extra;
  }, versionKey)).toEqual(component.extra);
});

test('nested canvas widgets expose a keyboard focus target for their toolbar', async ({
  context, page,
}) => {
  const nestedText = { type: 'text', body: '<p>Nested draft</p>' };
  let created: { data: unknown } | undefined;
  await stubCanvasSession(context, page, {
    type: 'layout-builder',
    elements: [{ row: { xs: 12 }, elements: [nestedText] }],
  }, { onCreate: payload => (created = payload as { data: unknown }) });

  const canvasItem = page.getByRole('group', { name: '画布组件 1', exact: true });
  await expect(canvasItem).toBeVisible();
  await canvasItem.focus();
  // The nested text widget has no focusable content, so it carries its own focus
  // stop; focusing it reveals its toolbar through the canvas :focus-within rules.
  const nestedGroup = page.getByRole('group', { name: '组件 text', exact: true });
  await expect(nestedGroup).toBeVisible();
  await tabTo(page, nestedGroup);
  const nestedUpload = nestedGroup.getByRole('button', { name: '上传到组件库', exact: true });
  await expect(nestedUpload).toBeVisible();
  await tabTo(page, nestedUpload);
  await page.keyboard.press('Enter');

  const dialog = page.getByRole('dialog', { name: '上传到组件库' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('combobox', { name: '分类' }).click();
  await page.getByRole('option', { name: 'Sections > Hero', exact: true }).click();
  await page.keyboard.press('Escape');
  await dialog.getByRole('button', { name: '保存', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect.poll(() => created).toBeDefined();
  expect(created?.data).toMatchObject({
    attributes: {
      title: 'text',
      body: JSON.stringify(nestedText),
    },
  });
  await expect(nestedGroup).toBeFocused();
});

test('restores canvas focus when category loading fails', async ({ context, page }) => {
  await stubCanvasSession(context, page, { type: 'text', body: '<p>Draft</p>' }, {
    failCategories: true,
  });

  const canvasItem = page.getByRole('group', { name: '画布组件 1', exact: true });
  await expect(canvasItem).toBeVisible();
  await canvasItem.focus();
  const upload = canvasItem.getByRole('button', { name: '上传到组件库', exact: true });
  await expect(upload).toBeVisible();
  await tabTo(page, upload, 5);
  await page.keyboard.press('Enter');
  await expect(page.getByText('加载分类失败，请稍后重试')).toBeVisible();
  // The busy state recreates the toolbar button, so the early exit must hand focus
  // back to the canvas group instead of dropping it to BODY and hiding the toolbar.
  await expect(canvasItem).toBeFocused();
});
