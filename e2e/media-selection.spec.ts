import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { expect, test } from './fixtures/test';

async function openMedia(page: Page, mode?: 'manage', theme = 'light-theme') {
  await page.route('**/__media-touch__/*.svg', route => route.fulfill({
    contentType: 'image/svg+xml',
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360">' +
      '<rect width="480" height="360" fill="#789"/></svg>',
  }));
  await page.route('**/api/**', route => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith('/landingPage')) {
      const content = url.searchParams.get('content');
      return route.fulfill({ json: content === '/core/base'
        ? { defaultTheme: theme, librariesUseLocal: true, builder: { guard: false } }
        : content === '/core/builder'
          ? { menu: [], manageMedia: { row: 2, sidebar: { form: [] } } }
          : content === '/builder/media-touch'
            ? { title: 'Media touch', body: [{ type: 'manage-media', mode, fullWidth: true }] }
            : {},
      });
    }
    if (url.pathname === '/api/v2/media') {
      return route.fulfill({ json: {
        rows: Array.from({ length: 24 }, (_, i) => ({
          id: String(i), uuid: `media-${i}`, title: `Image ${i}`,
          thumb: `/__media-touch__/${i}.svg`, source: `/__media-touch__/${i}.svg`,
        })),
        pager: { current_page: 0, total_pages: 1, total_items: 24, items_per_page: 24 },
      } });
    }
    return route.fulfill({ json: {} });
  });
  await page.goto('/builder/media-touch');
  await expect(page.locator('app-manage-media .masonry-item')).toHaveCount(24);
}

for (const viewport of [{ width: 390, height: 844 }, { width: 820, height: 1180 }]) {
  test.describe(`media touch ${viewport.width}`, () => {
    test.use({ viewport, hasTouch: true });

    test('selects the image in one tap and keeps preview separate', async ({ page }) => {
      await openMedia(page);
      const library = page.locator('app-manage-media');
      const tile = library.getByRole('button', { name: '选择: Image 0', exact: true });
      await tile.tap();
      await expect(tile).toHaveAttribute('aria-pressed', 'true');
      await expect(page.getByRole('dialog')).toHaveCount(0);

      const next = library.getByRole('button', { name: '选择: Image 1', exact: true });
      const preview = library.getByRole('button', { name: '预览: Image 1', exact: true });
      const bounds = (await preview.boundingBox())!;
      expect(bounds.width).toBeGreaterThanOrEqual(44);
      expect(bounds.height).toBeGreaterThanOrEqual(44);
      await preview.tap();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.getByRole('dialog').getByRole('button', { name: '关闭', exact: true }).tap();
      await expect(next).toHaveAttribute('aria-pressed', 'false');

      await next.focus();
      await page.keyboard.press('Space');
      await expect(next).toHaveAttribute('aria-pressed', 'true');
      await expect(tile).toHaveAttribute('aria-pressed', 'false');
      await tile.focus();
      await page.keyboard.press('Enter');
      await expect(tile).toHaveAttribute('aria-pressed', 'true');
      await library.locator('.media-scroll').evaluate(element => { element.scrollTop = 300; });
      await expect(tile).toHaveAttribute('aria-pressed', 'true');
      await library.screenshot({ path: `/tmp/media-touch-picker-${viewport.width}.png` });
      const audit = await new AxeBuilder({ page }).include('app-manage-media')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(audit.violations).toEqual([]);
    });

    test('keeps management actions inside each tile with separate touch targets', async ({ page }) => {
      await openMedia(page, 'manage', 'dark-theme');
      const library = page.locator('app-manage-media');
      const item = library.locator('.masonry-item').first();
      const tileBounds = (await item.boundingBox())!;
      const imageBounds = (await item.locator('.box').boundingBox())!;
      for (const button of await item.locator('.actions button').all()) {
        const bounds = (await button.boundingBox())!;
        expect(bounds.width).toBeGreaterThanOrEqual(44);
        expect(bounds.height).toBeGreaterThanOrEqual(44);
        expect(bounds.x).toBeGreaterThanOrEqual(tileBounds.x);
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(tileBounds.x + tileBounds.width);
        expect(bounds.y).toBeGreaterThanOrEqual(imageBounds.y + imageBounds.height);
      }
      await item.getByRole('checkbox').tap();
      await expect(library.getByRole('button', { name: '批量删除（1）' })).toBeVisible();
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await library.screenshot({ path: `/tmp/media-touch-manage-${viewport.width}.png` });
      const audit = await new AxeBuilder({ page }).include('app-manage-media')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(audit.violations).toEqual([]);
    });
  });
}
