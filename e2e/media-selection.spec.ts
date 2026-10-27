import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { expect, test } from './fixtures/test';

async function openMedia(page: Page, mode?: 'manage', theme = 'light-theme') {
  await page.route('**/__media-touch__/*.svg', route => route.fulfill({
    contentType: 'image/svg+xml',
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="270" height="480">' +
      '<rect width="270" height="480" fill="#789"/></svg>',
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

for (const viewport of [
  { width: 390, height: 844 }, { width: 744, height: 1133 }, { width: 1133, height: 744 },
]) {
  test.describe(`media touch ${viewport.width}`, () => {
    test.use({ viewport, hasTouch: true });

    test('selects the image in one tap and keeps preview separate', async ({ page }, info) => {
      await openMedia(page);
      const library = page.locator('app-manage-media');
      const tile = library.getByRole('button', { name: '选择: Image 0', exact: true });
      await tile.tap();
      await expect(tile).toHaveAttribute('aria-pressed', 'true');
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await expect(library.locator('.media-name').first()).toHaveText('Image 0');

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
      await library.screenshot({ path: info.outputPath('01-picker.png') });
      const audit = await new AxeBuilder({ page }).include('app-manage-media')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(audit.violations).toEqual([]);
    });

    test('keeps media menus and batch selection independent on touch and keyboard', async ({
      page,
    }, info) => {
      await openMedia(page, 'manage', viewport.width === 1133 ? 'dark-theme' : 'light-theme');
      const library = page.locator('app-manage-media');
      const item = library.locator('.masonry-item').first();
      const picture = item.getByRole('button', { name: '预览: Image 0', exact: true });
      const checkbox = item.getByRole('checkbox', { name: '批量选择: Image 0', exact: true });
      const more = item.getByRole('button', { name: '更多操作: Image 0', exact: true });
      const imageBounds = (await picture.boundingBox())!;
      expect(imageBounds.width / imageBounds.height).toBeCloseTo(4 / 3, 1);
      expect((await more.boundingBox())!.width).toBeGreaterThanOrEqual(44);
      expect((await more.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      await expect(item.getByRole('button')).toHaveCount(2);
      await expect(library.locator('.media-name').first()).toHaveText('Image 0');
      await picture.focus();
      await page.keyboard.press('Tab');
      await expect(checkbox).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(more).toBeFocused();
      await library.screenshot({ path: info.outputPath('02-manage.png') });

      await more.tap();
      await expect(more).toHaveAttribute('aria-expanded', 'true');
      const menu = page.getByRole('menu');
      await expect(menu.getByRole('menuitem', { name: '重命名', exact: true })).toBeVisible();
      await expect(menu.getByRole('menuitem', { name: '复制路径', exact: true })).toBeVisible();
      await expect(menu.getByRole('menuitem', { name: '选择', exact: true })).toHaveCount(0);
      await expect(menu).toHaveCSS('opacity', '1');
      await page.screenshot({ path: info.outputPath('03-menu.png') });
      const menuAudit = await new AxeBuilder({ page }).include('app-manage-media')
        .include('.cdk-overlay-container')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(menuAudit.violations).toEqual([]);
      await page.keyboard.press('Escape');
      await expect(more).toBeFocused();

      await checkbox.tap();
      await expect(checkbox).toBeChecked();
      await expect(item).toHaveClass(/is-selected/);
      const batch = library.getByRole('group', { name: '批量操作', exact: true });
      await expect(batch.getByRole('status')).toHaveText('已选 1 项');
      await more.tap();
      await menu.getByRole('menuitem', { name: '预览', exact: true }).tap();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.getByRole('dialog').getByRole('button', { name: '关闭', exact: true }).tap();
      await expect(checkbox).toBeChecked();
      await expect(more).toBeFocused();
      await more.tap();
      await menu.getByRole('menuitem', { name: '重命名', exact: true }).tap();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.getByRole('dialog').getByRole('button', { name: '取消', exact: true }).tap();
      await expect(more).toBeFocused();
      await expect(checkbox).toBeChecked();
      await batch.getByRole('button', { name: '选择已加载', exact: true }).tap();
      await expect(batch.getByRole('status')).toHaveText('已选 24 项');
      await expect(library.getByRole('checkbox', { checked: true })).toHaveCount(24);
      await library.screenshot({ path: info.outputPath('04-batch.png') });
      const audit = await new AxeBuilder({ page }).include('app-manage-media')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(audit.violations).toEqual([]);
      expect(await library.locator('.media-scroll').evaluate(el => el.scrollWidth <= el.clientWidth))
        .toBe(true);
      await batch.getByRole('button', { name: '取消选择', exact: true }).tap();
      await expect(batch).toHaveCount(0);
      await expect(library.getByRole('checkbox', { checked: true })).toHaveCount(0);
      await expect(library.locator('.media-scroll')).toBeFocused();
    });
  });
}
