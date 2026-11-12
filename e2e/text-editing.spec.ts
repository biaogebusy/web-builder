import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { expect, test } from './fixtures/test';
import { mockPageList } from './fixtures/page-list';
import { openTextCanvas, readCurrentDraft as draft } from './fixtures/text-canvas';

const paragraphs = [
  { type: 'text', body: '<p>First editable paragraph.</p>' },
  { type: 'text', body: '<p>Second editable paragraph.</p>' },
];

async function openText(page: Page, width = 1440, theme = 'light-theme') {
  const state = await openTextCanvas(page, paragraphs, width, theme);
  await expect(page.locator('app-builder-list .text-body')).toHaveCount(2);
  return state;
}

test('cleared body can be entered again with the mouse and survives refresh', async ({ page }, info) => {
  const state = await openText(page);
  const body = page.locator('app-builder-list .text-body').first();
  await body.click({ position: { x: 20, y: 10 } });
  await expect(body.locator('.ProseMirror')).toBeFocused();
  await body.locator('.ProseMirror').fill('');
  await page.mouse.click(1200, 750);
  await expect.poll(async () => (await draft(page)).body[0].body).toBe('');
  const target = page.locator('app-builder-list').getByRole('button', { name: '编辑文本' });
  await expect(target).toBeVisible();
  expect(await target.innerHTML()).toBe('');
  await page.waitForLoadState('networkidle');
  await page.reload();
  await expect(target).toBeVisible();
  await page.screenshot({ path: info.outputPath('empty-text-target.png') });
  await target.click({ position: { x: 20, y: 20 } });
  await expect(body.locator('.ProseMirror')).toBeFocused();
  await expect(target).toHaveCount(0);
  await expect(body.locator('.ProseMirror')).toBeFocused();
  await body.locator('.ProseMirror').fill('Restored paragraph.');
  await page.mouse.click(1200, 750);
  await expect.poll(async () => (await draft(page)).body[0].body)
    .toBe('<p>Restored paragraph.</p>');
  expect((await draft(page)).body[1]).toEqual(paragraphs[1]);
  await page.reload();
  await expect(body).toHaveText('Restored paragraph.');
  expect(JSON.stringify(await draft(page))).not.toContain('编辑文本');
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});

for (const [width, theme] of [[1440, 'light-theme'], [390, 'dark-theme']] as const) {
  test(`empty body supports keyboard cancellation and recovery at ${width}px`, async ({ page }, info) => {
    const state = await openText(page, width, theme);
    const body = page.locator('app-builder-list .text-body').first();
    await body.click({ position: { x: 20, y: 10 } });
    await expect(body.locator('.ProseMirror')).toBeFocused();
    await body.locator('.ProseMirror').fill('');
    // Tab moves outside the editor without relying on a desktop-only blank coordinate.
    await page.keyboard.press('Tab');
    const target = page.locator('app-builder-list').getByRole('button', { name: '编辑文本' });
    await expect(target).toBeVisible();
    const unchanged = await draft(page);
    await target.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(target).toBeFocused();
    await page.screenshot({ path: info.outputPath('empty-text-keyboard-focus.png') });
    expect((await new AxeBuilder({ page }).include('app-builder-list app-text')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await page.keyboard.press('Enter');
    await expect(body.locator('.ProseMirror')).toBeFocused();
    await body.locator('.ProseMirror').fill('Discard this.');
    await page.keyboard.press('Escape');
    await expect(target).toBeFocused();
    expect(await draft(page)).toEqual(unchanged);
    await page.keyboard.press('Space');
    await expect(body.locator('.ProseMirror')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(target).toBeVisible();
    await expect(target).not.toBeFocused();
    expect(await draft(page)).toEqual(unchanged);
    await target.focus();
    await page.keyboard.press('Enter');
    await expect(body.locator('.ProseMirror')).toBeFocused();
    await body.locator('.ProseMirror').fill('Keyboard recovery.');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Second line.');
    await page.keyboard.press('Tab');
    await expect.poll(async () => (await draft(page)).body[0].body)
      .toBe('<p>Keyboard recovery.</p><p>Second line.</p>');
    expect((await draft(page)).body[1]).toEqual(paragraphs[1]);
    expect(state.errors).toEqual([]);
    expect(state.writes).toEqual([]);
  });
}

test('normal paragraph switching preserves both edits', async ({ page }) => {
  const state = await openText(page);
  const bodies = page.locator('app-builder-list .text-body');
  await bodies.nth(0).click({ position: { x: 20, y: 10 } });
  await expect(bodies.nth(0).locator('.ProseMirror')).toBeFocused();
  await bodies.nth(0).locator('.ProseMirror').fill('First changed.');
  await bodies.nth(1).click({ position: { x: 20, y: 10 } });
  await expect(bodies.nth(1).locator('.ProseMirror')).toBeFocused();
  await bodies.nth(1).locator('.ProseMirror').fill('Second changed.');
  await page.mouse.click(1200, 750);
  await expect.poll(async () => (await draft(page)).body.map((item: { body: string }) => item.body))
    .toEqual(['<p>First changed.</p>', '<p>Second changed.</p>']);
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});

test('public empty bodies have no editing target and load no editor runtime', async ({ page }) => {
  const { state } = await mockPageList(page);
  page.on('console', message => {
    if (message.type() === 'error') state.errors.push(message.text());
  });
  await page.context().route('**/api/v3/landingPage**', route => {
    const path = new URL(route.request().url()).searchParams.get('content');
    if (path !== '/empty-text') return route.fallback();
    return route.fulfill({ json: { title: 'Public text', publicPageKey: 'node:1:zh-hans:1', body: [
      { type: 'text', body: '' },
      paragraphs[1],
    ] } });
  });
  await page.goto('/empty-text');
  await expect(page.locator('app-text')).toHaveCount(2);
  await expect(page.locator('app-text').first().locator('.text-body')).toHaveCount(0);
  await expect(page.locator('app-text').nth(1)).toContainText('Second editable paragraph.');
  await page.locator('app-text').nth(1).click();
  await expect(page.locator('[data-contentedit-placeholder], .ProseMirror')).toHaveCount(0);
  const scripts = await page.evaluate(() => performance.getEntriesByType('resource')
    .filter(entry => /\.js(?:\?|$)/.test(entry.name)).map(entry => entry.name));
  for (const url of scripts) {
    const response = await page.request.get(url);
    expect(await response.text()).not.toMatch(
      /ProseMirror|class InlineEditorService|class InlineImageService/
    );
  }
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});
