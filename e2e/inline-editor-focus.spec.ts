import {
  linkPanel, stylePanel, testInlinePanelFocus, testInlinePanelHandoff,
} from './fixtures/inline-panel-focus';
import { expect, test } from './fixtures/test';
import { openTextCanvas, readCurrentDraft as draft } from './fixtures/text-canvas';

testInlinePanelFocus('app-tiptap-link-panel', '链接');
testInlinePanelHandoff(linkPanel, stylePanel);
testInlinePanelHandoff(stylePanel, linkPanel);
testInlinePanelHandoff(stylePanel, stylePanel);

test('applying and removing a link preserves the uncommitted text selection', async ({ page }) => {
  const state = await openTextCanvas(page, [{ type: 'text', body: '<p>Original body.</p>' }]);
  const body = page.locator('app-builder-list .text-body');
  const editor = body.locator('.ProseMirror');
  const bubble = page.locator('app-tiptap-bubble-menu');
  const panel = page.locator('app-tiptap-link-panel');
  const unchanged = await draft(page);
  await body.click({ position: { x: 20, y: 10 } });
  await expect(editor).toBeFocused();
  await editor.fill('Link selection');
  await editor.press('ControlOrMeta+A');
  await bubble.getByRole('button', { name: '链接', exact: true }).click();
  await expect(panel.getByRole('textbox')).toBeFocused();
  await panel.getByRole('textbox').fill('https://example.test/guide');
  await panel.getByRole('textbox').press('Enter');
  await expect(editor).toBeFocused();
  await expect(editor.locator('a')).toHaveAttribute('href', 'https://example.test/guide');
  expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('Link selection');
  expect(await draft(page)).toEqual(unchanged);
  await bubble.getByRole('button', { name: '链接', exact: true }).click();
  await expect(panel.getByRole('textbox')).toBeFocused();
  await panel.getByRole('button', { name: '移除链接', exact: true }).click();
  await expect(editor).toBeFocused();
  await expect(editor.locator('a')).toHaveCount(0);
  expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('Link selection');
  expect(await draft(page)).toEqual(unchanged);
  await editor.press('Escape');
  await expect(editor).toHaveCount(0);
  await expect(body).toHaveText('Original body.');
  expect(await draft(page)).toEqual(unchanged);
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});
