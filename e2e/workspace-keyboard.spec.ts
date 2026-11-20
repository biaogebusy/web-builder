import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures/test';
import { mockPageList } from './fixtures/page-list';
import { storageKey } from './fixtures/storage';

test.beforeEach(async ({ page, context }) => {
  await mockPageList(page);
  await context.route('**/api/v3/landingPage*', route => {
    if (new URL(route.request().url()).searchParams.get('content') !== '/core/builder') {
      return route.fallback();
    }
    return route.fulfill({ json: {
      menu: [{ label: 'Pages', href: '/builder/page-list', icon: { svg: 'file-document-outline' } }],
      tour: { enable: false },
    } });
  });
});

test('workspace reentry keeps one shortcut and ignores keys after leaving', async ({ page }, info) => {
  let documents = 0;
  const errors: string[] = [];
  page.on('request', request => { if (request.resourceType() === 'document') documents++; });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/me/login/callback?code=test-code&state=test-state');
  const workspace = page.locator('app-builder-workspace');
  const toggle = workspace.locator('#toolbar-right [role="switch"]').first();
  const draftKey = storageKey('version');
  const layoutKey = storageKey('builderFullScreen');
  await expect(page.locator('app-page-list app-page-item')).toHaveCount(10);
  const draft = await page.evaluate(key => localStorage.getItem(key), draftKey);
  for (let visit = 0; visit < 3; visit++) {
    await expect(toggle).not.toBeChecked();
    await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
    await page.keyboard.press('s');
    await expect(toggle).toBeChecked();
    await expect.poll(() => page.evaluate(key => localStorage.getItem(key), layoutKey)).toBe('true');
    await page.locator('app-builder-sidebar a.menu-trigger[href="/builder/hub"]').click();
    await expect(page.locator('app-hub')).toBeVisible();
    await expect(workspace).toHaveCount(0);
    await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
    await page.keyboard.press('s');
    expect(await page.evaluate(key => localStorage.getItem(key), layoutKey)).toBe('true');
    await page.locator('app-builder-sidebar a.menu-trigger[href="/builder/page-list"]').click();
    await expect(page.locator('app-page-list app-page-item')).toHaveCount(10);
  }
  await page.screenshot({ path: info.outputPath('reentered-workspace.png') });
  expect(await page.evaluate(key => localStorage.getItem(key), draftKey)).toBe(draft);
  expect(documents).toBe(1);
  expect(errors).toEqual([]);
});

for (const theme of ['light', 'dark']) {
  test(`drawer events and editing leave full width unchanged: ${theme}`, async ({ page }, info) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/me/login/callback?code=test-code&state=test-state');
    const list = page.locator('app-page-list');
    await expect(list.locator('app-page-item')).toHaveCount(10);
    if (theme === 'dark') {
      await page.locator('app-builder-sidebar app-btn:has([data-mat-icon-name="white-balance-sunny"]) button')
        .click();
    }
    const drawer = page.locator('app-builder-workspace mat-drawer.sidebar');
    const toggle = page.locator('app-builder-workspace #toolbar-right [role="switch"]').first();
    const layoutKey = storageKey('builderFullScreen');
    const initialLayout = await page.evaluate(key => localStorage.getItem(key), layoutKey);
    // The side-mode drawer is not focusable; dispatch directly to cover this event target.
    for (const code of ['ArrowDown', 'ArrowUp', 'Escape', 'KeyA', 'Tab']) {
      await drawer.dispatchEvent('keydown', { code, bubbles: true });
      expect(await page.evaluate(key => localStorage.getItem(key), layoutKey)).toBe(initialLayout);
      await expect(toggle).not.toBeChecked();
      await expect(list).toBeVisible();
    }
    await list.locator('.filter-toggle').focus();
    await page.keyboard.press('Tab');
    await expect(list.locator('.title-btn').first()).toBeFocused();
    const search = list.getByRole('textbox', { name: '搜索标题', exact: true });
    await search.fill('s');
    await search.press('s');
    await expect(search).toHaveValue('ss');
    await expect(toggle).not.toBeChecked();
    await search.fill('');
    await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
    for (const key of ['Shift+s', 'Alt+s', 'Control+s', 'Meta+s']) {
      await page.keyboard.press(key);
      await expect(toggle).not.toBeChecked();
    }
    await page.keyboard.press('s');
    await expect(toggle).toBeChecked();
    await toggle.click();
    await expect(toggle).not.toBeChecked();
    expect((await new AxeBuilder({ page }).include('app-page-list')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await page.screenshot({ path: info.outputPath(`${theme}-desktop.png`) });
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(toggle).toBeChecked();
    await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
    await page.keyboard.press('s');
    await expect(toggle).not.toBeChecked();
    await expect(list).toBeVisible();
    await search.focus();
    await page.keyboard.press('ArrowDown');
    await expect(search).toBeFocused();
    await expect(toggle).not.toBeChecked();
    expect((await new AxeBuilder({ page }).include('app-page-list')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await page.screenshot({ path: info.outputPath(`${theme}-narrow.png`) });
  });
}
