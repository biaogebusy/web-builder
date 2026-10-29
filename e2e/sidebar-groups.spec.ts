import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import type { Page } from '@playwright/test';
import { expect, test } from './fixtures/test';

async function openSidebar(page: Page, theme: string, english = false) {
  await page.route('**/api/**', route => {
    const content = new URL(route.request().url()).searchParams.get('content');
    return route.fulfill({ json: content === '/core/base'
      ? { defaultTheme: theme, librariesUseLocal: true, builder: { guard: false } }
      : content === '/core/builder'
        ? { menu: [], tour: { enable: false } }
        : content === '/core/branding'
          ? { header: { params: { userInfo: false }, mainMenu: [] }, footer: { mainMenu: [] } }
          : { data: [], rows: [], pager: { total_items: 0 } },
    });
  });
  await page.goto(`${english ? '/en' : ''}/builder/hub`);
  await expect(page.locator('app-hub')).toBeVisible();
  await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' });
}

for (const theme of ['light-theme', 'dark-theme']) {
  for (const expanded of [false, true]) {
    test(`sidebar group dividers: ${theme}, expanded=${expanded}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await openSidebar(page, theme);
      const sidebar = page.locator('app-builder-sidebar');
      if (expanded) {
        await sidebar.locator('.toggle .wrapper').click();
        await sidebar.locator('mat-expansion-panel-header').click();
      } else {
        await sidebar.locator('.menu-trigger').focus();
      }
      const selector = expanded
        ? 'app-builder-sidebar .accordion-menu app-accordion-menu'
        : 'app-builder-sidebar .child-menu';
      const menu = page.locator(selector);
      await expect(menu).toBeVisible();
      const labels = await menu.locator('.menu-group-heading').allTextContents();
      expect(labels.slice(0, 2)).toEqual(['内容与页面', '外观']);
      expect(labels.at(-1)).toBe('系统');
      await expect(menu.locator('.menu-group-divider')).toHaveCount(labels.length - 1);
      for (const heading of await menu.locator('.menu-group-heading').all()) {
        expect((await heading.boundingBox())!.width).toBeLessThanOrEqual(1);
      }
      await expect(menu.getByText('组件管理', { exact: true })).toHaveCount(0);
      await mkdir('test-results/sidebar-groups', { recursive: true });
      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 900 });
        await expect(menu).toBeVisible();
        const bounds = await menu.boundingBox();
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
        expect((await new AxeBuilder({ page }).include(selector).analyze()).violations).toEqual([]);
        await page.screenshot({ path:
          `test-results/sidebar-groups/${theme}-${expanded ? 'expanded' : 'collapsed'}-${width}.png`,
          animations: 'disabled',
        });
      }
    });
  }
}

test('English grouped navigation supports keyboard links and active route feedback', async ({ page }) => {
  await openSidebar(page, 'light-theme', true);
  const trigger = page.locator('app-builder-sidebar .menu-trigger');
  await trigger.focus();
  const menu = page.locator('app-builder-sidebar .child-menu');
  await expect(menu).toBeVisible();
  expect(await menu.locator('.menu-group-heading').first().textContent()).not.toContain('BUILDER.');
  await page.keyboard.press('Tab');
  await expect(menu.locator('a').first()).toBeFocused();
  const settings = menu.locator('a[href="/builder/settings"]');
  await settings.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/builder\/settings$/);
  await expect(settings).toHaveClass(/active/);
});

test('expanded menu moves the active parent to the selected page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await openSidebar(page, 'light-theme');
  const sidebar = page.locator('app-builder-sidebar');
  await sidebar.locator('.toggle .wrapper').click();
  await sidebar.locator('mat-expansion-panel-header').press('Space');
  const entries = sidebar.locator('.accordion-menu mat-list.no-child');
  const settings = entries.filter({ has: page.locator('a[href="/builder/settings"]') });
  const pages = entries.filter({ has: page.locator('a[href="/builder/page-list"]') });
  const group = sidebar.locator('.accordion-menu mat-expansion-panel').first();

  await settings.locator('a').click();
  await expect(page).toHaveURL(/\/builder\/settings$/);
  await expect(settings).toHaveClass(/\bactive\b/);
  await expect(pages).not.toHaveClass(/\bactive\b/);
  await expect(group).toHaveClass(/\bactive\b/);

  const header = group.locator('mat-expansion-panel-header');
  if (await header.getAttribute('aria-expanded') === 'false') await header.press('Space');
  await expect(pages.locator('a')).toBeVisible();
  await pages.locator('a').click();
  await expect(page).toHaveURL(/\/builder\/page-list$/);
  await expect(settings).not.toHaveClass(/\bactive\b/);
  await expect(pages).toHaveClass(/\bactive\b/);
  await expect(group).toHaveClass(/\bactive\b/);
});
