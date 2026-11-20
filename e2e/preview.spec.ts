import { expect, test } from './fixtures/test';
import { storageKey } from './fixtures/storage';
import type { Page } from '@playwright/test';

const versionKey = storageKey('version');

const draft = (body: string, title = 'Preview regression') => [{
  title,
  current: true,
  body: [
    { type: 'text', body: `<p>${body}</p>` },
    { type: 'number-animate', value: 10, label: 'items' },
  ],
}];

async function writeStorage(writer: Page, preview: Page, key: string, value: string | null) {
  // Unchanged-target assertions must run after the storage event and zoneless rendering.
  await preview.evaluate(key => {
    delete document.documentElement.dataset.previewStorageRendered;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      window.removeEventListener('storage', onStorage);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        document.documentElement.dataset.previewStorageRendered = 'true';
      }));
    };
    window.addEventListener('storage', onStorage);
  }, key);
  await writer.evaluate(({ key, value }) => {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  }, { key, value });
  await expect(preview.locator('html')).toHaveAttribute('data-preview-storage-rendered', 'true');
}

test.beforeEach(async ({ context, page }) => {
  await context.route('**/api/v3/landingPage*', route => {
    const content = new URL(route.request().url()).searchParams.get('content');
    return route.fulfill({
      json: content === '/core/base'
        ? { defaultTheme: 'light-theme', builder: { guard: false } }
        : {},
    });
  });
  await context.route('**/assets/app/**/builder.json', route => route.fulfill({ json: {} }));
  await context.route('**/api/v3/node/component*', route => route.fulfill({ json: [] }));
  await page.addInitScript(({ key, pages }) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(pages));
  }, { key: versionKey, pages: draft('Original draft') });
});

test('direct preview reads the saved draft through its lazy route provider', async ({ page }) => {
  await page.goto('/preview');
  await expect(page.locator('app-preview')).toContainText('Original draft');
  await page.reload();
  await expect(page.locator('app-preview')).toContainText('Original draft');
});

test('builder opens a draft preview that follows changes from the original tab', async ({ page }) => {
  await page.goto('/builder');
  await expect(page.locator('app-builder')).toBeVisible();
  await page.getByRole('button', { name: 'builder page', exact: true }).click();
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('menuitem', { name: '草稿预览' }).click();
  const preview = await popupPromise;
  await expect(preview).toHaveURL(/\/preview$/);
  await expect(preview.locator('app-preview')).toContainText('Original draft');

  await page.evaluate(({ key, pages }) => {
    localStorage.setItem(key, JSON.stringify(pages));
  }, { key: versionKey, pages: draft('Updated draft', 'Updated preview') });
  await expect(preview.locator('app-preview')).toContainText('Updated draft');
  await expect(preview).toHaveTitle(/Updated preview/);
  await page.evaluate(({ key, pages }) => {
    localStorage.setItem(key, JSON.stringify(pages));
  }, { key: versionKey, pages: draft('Final draft', 'Final preview') });
  await expect(preview.locator('app-preview')).toContainText('Final draft');
  await expect(preview).toHaveTitle(/Final preview/);
});

test('plain canvas editing saves through the route provider and reaches preview', async ({ page }) => {
  await page.goto('/builder');
  await expect(page.locator('app-builder')).toBeVisible({ timeout: 15_000 });
  const value = page.locator('.component-item app-number-animate [data-path="value"]');
  await expect(value).toBeVisible();
  await value.click();
  await expect(value).toHaveAttribute('contenteditable', 'true');
  await value.fill('42');
  const editedHtml = await value.innerHTML();
  await value.blur();
  await expect.poll(() => page.evaluate(key => {
    const pages = JSON.parse(localStorage.getItem(key) ?? '[]');
    return pages[0]?.body[1]?.value;
  }, versionKey)).toBe(editedHtml);
  await page.getByRole('button', { name: 'builder page', exact: true }).click();
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('menuitem', { name: '草稿预览' }).click();
  const preview = await popupPromise;
  await expect(preview.locator('app-preview app-number-animate')).toContainText('42');
  const previewValue = preview.locator('app-number-animate [data-path="value"]');
  await previewValue.click();
  await expect(previewValue).not.toHaveAttribute('contenteditable', 'true');
});

test('direct preview follows selection and ignores invalid or unrelated storage events',
  async ({ context, page }) => {
    await page.goto('/preview');
    await expect(page.locator('app-preview')).toContainText('Original draft');
    const writer = await context.newPage();
    await writer.goto('/preview');
    const pages = [
      { ...draft('Other draft')[0], current: false },
      draft('Selected draft', 'Selected preview')[0],
    ];
    await writer.evaluate(({ key, pages }) => {
      localStorage.setItem(key, JSON.stringify(pages));
    }, { key: versionKey, pages });
    await expect(page.locator('app-preview')).toContainText('Selected draft');
    await expect(page).toHaveTitle(/Selected preview/);

    const ignored: [string, string | null][] = [
      [versionKey, '{'], [versionKey, '[]'], [versionKey, '{}'], [versionKey, null],
      [`${versionKey}-other`, JSON.stringify(draft('Unrelated draft'))],
    ];
    for (const [key, value] of ignored) {
      await writeStorage(writer, page, key, value);
      await expect(page.locator('app-preview')).toContainText('Selected draft');
      await expect(page).toHaveTitle(/Selected preview/);
    }
  });

for (const [lang, expected] of [['en', 'English target'], ['zh-hans', 'Chinese target']]) {
  test(`requested ${lang} preview stays on its local page when the current draft changes`,
    async ({ context, page }) => {
      await page.goto('/preview');
      const pages = [
        { ...draft('Current draft')[0], nid: '90', langcode: 'zh-hans' },
        { ...draft('English target', 'English target')[0], nid: '12', langcode: 'en', current: false },
        { ...draft('Chinese target', 'Chinese target')[0], nid: '12', langcode: 'zh-hans', current: false },
      ];
      await page.evaluate(({ key, pages }) => {
        localStorage.setItem(key, JSON.stringify(pages));
      }, { key: versionKey, pages });
      await page.goto(`/preview?nid=12&lang=${lang}`);
      await expect(page.locator('app-preview')).toContainText(expected);
      const writer = await context.newPage();
      await writer.goto('/preview');
      await writeStorage(writer, page, versionKey, JSON.stringify(pages.map(item => item.current ? {
        ...item, title: 'Changed current draft', body: draft('Changed current draft')[0].body,
      } : item)));
      await expect(page.locator('app-preview')).toContainText(expected);
      await expect(page.locator('app-preview')).not.toContainText('Changed current draft');
      await expect(page).toHaveTitle(new RegExp(expected));
    });
}
