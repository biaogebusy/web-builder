import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures/test';
import { mockPageList } from './fixtures/page-list';
import { openTextCanvas, readCurrentDraft as draft } from './fixtures/text-canvas';

for (const mode of ['raised', 'stroked', 'flat', 'text']) {
  for (const link of [false, true]) {
    test(`${mode} ${link ? 'link' : 'button'} recovers an empty label`, async ({ page }, info) => {
      const original = { type: 'btn', mode, label: 'Original button',
        ...(link ? { href: '/must-not-navigate' } : {}) };
      const neighbor = { type: 'text', body: '<p>Keep this paragraph.</p>' };
      const state = await openTextCanvas(page, [original, neighbor], link ? 390 : 1440);
      const host = page.getByRole('group', { name: '画布组件 1', exact: true })
        .locator('.content-wrapper > app-btn');
      const label = host.locator('[data-path="label"]');
      const editor = label.locator('.ProseMirror');
      await label.click({ position: { x: 2, y: 2 } });
      await expect(editor).toBeFocused();
      await page.evaluate(() => new Promise<void>(resolve => {
        requestAnimationFrame(() => resolve());
      }));
      await editor.fill('');
      await editor.press('Enter');
      const target = host.getByRole('button', { name: '编辑按钮文字', exact: true });
      await expect(target).toBeVisible();
      expect(await target.innerHTML()).toBe('');
      await expect(host.locator('button, a')).toHaveCount(0);
      const unchanged = await draft(page);
      expect(unchanged.body[0]).toEqual({ ...original, label: '' });
      await page.reload();
      await expect(target).toBeVisible();
      await target.click();
      await expect(editor).toBeFocused();
      await expect(editor).toBeVisible();
      expect((await editor.boundingBox())!.width).toBeGreaterThanOrEqual(48);
      await editor.fill('Discard this');
      await editor.press('Escape');
      await expect(target).toBeFocused();
      expect(await draft(page)).toEqual(unchanged);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(target).toBeFocused();
      if (mode === 'raised') {
        for (const theme of ['light-theme', 'dark-theme']) {
          await page.evaluate(theme => { document.documentElement.className = theme; }, theme);
          expect((await new AxeBuilder({ page })
            .include('[aria-label="画布组件 1"] .content-wrapper > app-btn')
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
          await page.screenshot({ path: info.outputPath(`empty-button-${theme}.png`) });
        }
      }
      await target.press('Space');
      await expect(editor).toBeFocused();
      await editor.fill('Recovered button');
      await editor.press(link ? 'Tab' : 'Enter');
      await expect(host.locator(link ? 'a' : 'button')).toHaveText('Recovered button');
      expect((await draft(page)).body).toEqual([{ ...original, label: 'Recovered button' }, neighbor]);
      await page.reload();
      await expect(label).toHaveText('Recovered button');
      await label.click({ position: { x: 2, y: 2 } });
      await expect(editor).toBeFocused();
      await editor.press('Escape');
      await expect(label).toHaveText('Recovered button');
      await expect(page).toHaveURL(/\/builder$/);
      expect(state.errors).toEqual([]);
      expect(state.writes).toEqual([]);
    });
  }
}

test('empty labels preserve icons and disabled controls in the canvas', async ({ page }) => {
  const state = await openTextCanvas(page, [
    { type: 'btn', mode: 'raised', label: '', icon: { svg: 'send' } },
    { type: 'btn', mode: 'raised', label: '', disabled: true, ariaLabel: 'Disabled action' },
    { type: 'btn', mode: 'icon', label: '', icon: { svg: 'send' }, ariaLabel: 'Icon action' },
  ], 390);
  const first = page.getByRole('group', { name: '画布组件 1', exact: true })
    .locator('.content-wrapper > app-btn');
  const target = first.getByRole('button', { name: '编辑按钮文字', exact: true });
  await expect(target).toBeVisible();
  await expect(first.locator('app-icon')).toBeVisible();
  await expect(target.locator('app-icon')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Disabled action', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Icon action', exact: true })).toBeVisible();
  await expect(page.locator('[data-contentedit-placeholder]')).toHaveCount(1);
  const unchanged = await draft(page);
  await target.press('Enter');
  await expect(first.locator('.ProseMirror')).toBeFocused();
  await first.locator('.ProseMirror').press('Enter');
  await expect(target).toBeVisible();
  expect(await draft(page)).toEqual(unchanged);
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});

test('public empty labels retain native controls and navigation without editing', async ({ page }) => {
  const { state } = await mockPageList(page);
  await page.context().route('**/api/v3/landingPage**', route => {
    const path = new URL(route.request().url()).searchParams.get('content');
    if (path !== '/empty-button' && path !== '/button-target') return route.fallback();
    return route.fulfill({ json: { title: 'Public buttons', publicPageKey: 'node:1:zh-hans:1',
      body: path === '/button-target' ? [{ type: 'text', body: '<p>Navigation target</p>' }] : [
        { type: 'btn', mode: 'raised', label: '', href: '/button-target', ariaLabel: 'Follow link' },
        { type: 'btn', mode: 'flat', label: '', ariaLabel: 'Empty action' },
      ],
    } });
  });
  await page.goto('/empty-button');
  await expect(page.getByRole('button', { name: 'Empty action', exact: true })).toBeVisible();
  await expect(page.locator('[data-contentedit-placeholder], .ProseMirror')).toHaveCount(0);
  await page.getByRole('link', { name: 'Follow link', exact: true }).click();
  await expect(page).toHaveURL(/\/button-target$/);
  await expect(page.getByText('Navigation target', { exact: true })).toBeVisible();
  await expect(page.locator('[data-contentedit-placeholder], .ProseMirror')).toHaveCount(0);
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});
