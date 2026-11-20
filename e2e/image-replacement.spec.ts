import AxeBuilder from '@axe-core/playwright';
import type { Page, Route } from '@playwright/test';
import { expect, test } from './fixtures/test';
import { draftImage, openImageCanvas } from './fixtures/image-canvas';
import { storageKey } from './fixtures/storage';

const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240">'
  + '<rect width="320" height="240" fill="red"/></svg>';

async function uploads(page: Page) {
  const pending: Route[] = [];
  await page.route('**/api/v3/media/vector/upload', route => { pending.push(route); });
  await page.route('**/replacement-*.svg', route => route.fulfill({
    contentType: 'image/svg+xml', body: svg,
  }));
  return {
    async start(keyboard = false) {
      const index = pending.length;
      const chooser = page.waitForEvent('filechooser');
      const button = page.locator('app-inline-image-bar button').first();
      if (keyboard) {
        await button.focus();
        await page.keyboard.press('Enter');
      } else {
        await button.click();
      }
      await (await chooser).setFiles({
        name: 'replacement.svg', mimeType: 'image/svg+xml', buffer: Buffer.from(svg),
      });
      await expect.poll(() => pending.length).toBe(index + 1);
      return index;
    },
    source(index: number) { return new URL(`/replacement-${index}.svg`, page.url()).href; },
    async finish(index: number, failed = false) {
      await pending[index].fulfill(failed ? { status: 500, json: { error: 'Synthetic upload failure' } }
        : { json: { uuid: `media-${index}`, fileId: `file-${index}`, source: this.source(index),
          filename: 'replacement.svg', mimeType: 'image/svg+xml', private: false } });
    },
  };
}

async function selectImage(page: Page, alt = 'First image') {
  const image = page.locator(`app-builder-list img[alt="${alt}"]`);
  await image.click();
  await expect(image).toHaveClass(/inline-img-selected/);
}

for (const [width, theme] of [[1440, 'light-theme'], [390, 'dark-theme']] as const) {
  test(`a late upload cannot replace a newly selected image at ${width}px`, async ({ page }, info) => {
    const state = await openImageCanvas(page, width, theme);
    const upload = await uploads(page);
    const before = [await draftImage(page), await draftImage(page, 1)];
    await selectImage(page);
    const pending = await upload.start();
    await selectImage(page, 'Second image');
    await upload.finish(pending);
    await page.waitForLoadState('networkidle');
    expect([await draftImage(page), await draftImage(page, 1)]).toEqual(before);
    await page.screenshot({ path: info.outputPath('late-upload-ignored.png') });
    expect((await new AxeBuilder({ page }).include('app-inline-image-bar')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await page.reload();
    await expect(page.locator('app-builder-list img[alt="Second image"]'))
      .toHaveAttribute('src', before[1].src);
    expect([await draftImage(page), await draftImage(page, 1)]).toEqual(before);
    expect(state.errors).toEqual([]);
    expect(state.writes).toEqual([]);
  });
}

test('the latest upload wins and preserves other image fields after reload', async ({ page }) => {
  const state = await openImageCanvas(page);
  const upload = await uploads(page);
  const before = await draftImage(page);
  await selectImage(page);
  const older = await upload.start();
  const newer = await upload.start(true);
  await upload.finish(newer);
  await expect.poll(async () => (await draftImage(page)).src).toBe(upload.source(newer));
  await expect(page.locator('app-inline-image-bar button').first()).toBeFocused();
  await upload.finish(older);
  await page.waitForLoadState('networkidle');
  expect(await draftImage(page)).toEqual({ ...before, src: upload.source(newer) });
  await page.reload();
  await expect(page.locator('app-builder-list img[alt="First image"]'))
    .toHaveAttribute('src', upload.source(newer));
  expect(await draftImage(page)).toEqual({ ...before, src: upload.source(newer) });
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});

test('canceling and reselecting an image keeps its old upload invalid', async ({ page }) => {
  const state = await openImageCanvas(page);
  const upload = await uploads(page);
  const before = await draftImage(page);
  await selectImage(page);
  const old = await upload.start();
  await page.locator('app-inline-image-bar button').last().focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('app-inline-image-bar [role="toolbar"]')).toHaveCount(0);
  await selectImage(page);
  await upload.finish(old);
  await page.waitForLoadState('networkidle');
  expect(await draftImage(page)).toEqual(before);
  const retry = await upload.start();
  await upload.finish(retry);
  await expect.poll(async () => (await draftImage(page)).src).toBe(upload.source(retry));
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});

test('switching drafts while uploading preserves both drafts', async ({ page }) => {
  const state = await openImageCanvas(page);
  const upload = await uploads(page);
  const bodies = () => page.evaluate(key => JSON.parse(localStorage.getItem(key) || '[]')
    .map((draft: { body: unknown }) => draft.body), storageKey('version'));
  const before = await bodies();
  await selectImage(page);
  const pending = await upload.start();
  await page.locator('app-builder-version mat-list-item').nth(1).locator('mat-icon').first().click();
  await expect(page.locator('app-inline-image-bar [role="toolbar"]')).toHaveCount(0);
  await upload.finish(pending);
  await page.waitForLoadState('networkidle');
  expect(await bodies()).toEqual(before);
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});

test('an upload failure preserves the image and allows a new upload', async ({ page }) => {
  const state = await openImageCanvas(page);
  const upload = await uploads(page);
  const before = await draftImage(page);
  await selectImage(page);
  const failed = await upload.start();
  await upload.finish(failed, true);
  await expect(page.locator('mat-snack-bar-container').filter({ hasText: '上传失败' }))
    .toBeVisible();
  expect(await draftImage(page)).toEqual(before);
  const retry = await upload.start();
  await upload.finish(retry);
  await expect.poll(async () => (await draftImage(page)).src).toBe(upload.source(retry));
  expect(state.errors.filter(message => !message.includes('status of 500'))).toEqual([]);
  expect(state.writes).toEqual([]);
});

test('the media picker replaces its image and restores toolbar focus', async ({ page }) => {
  const state = await openImageCanvas(page);
  const upload = await uploads(page);
  const source = upload.source(0);
  await page.route('**/api/v3/media/capabilities', route => route.fulfill({
    json: { canViewAll: false, types: [] },
  }));
  await page.route('**/api/v3/media?*', route => route.fulfill({ json: {
    rows: [{ id: 'library-image', uuid: 'library-image', fileId: 'library-file', title: 'Library image',
      src: source, source, kind: 'vector', bundle: 'vector',
      mimeType: 'image/svg+xml', private: false }],
    nextCursor: null, scope: 'mine',
  } }));
  const before = await draftImage(page);
  await selectImage(page);
  const button = page.locator('app-inline-image-bar button').nth(1);
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('app-manage-media')).toBeVisible();
  const choice = page.locator('app-manage-media .masonry-item button').first();
  await expect(choice).toBeVisible();
  await choice.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('app-manage-media')).toHaveCount(0);
  await expect(button).toBeFocused();
  expect(await draftImage(page)).toEqual({ ...before, src: source });
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});
