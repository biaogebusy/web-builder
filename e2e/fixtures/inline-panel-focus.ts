import { expect, test } from './test';
import { openTextCanvas, readCurrentDraft as draft } from './text-canvas';

interface InlinePanel { selector: string; button: string; control: string }

export const linkPanel: InlinePanel = {
  selector: 'app-tiptap-link-panel', button: '链接', control: 'input',
};
export const stylePanel: InlinePanel = {
  selector: '.style-panel', button: '文字样式', control: 'select',
};

/** Panel handoffs must preserve the pending edit until cancellation or a real canvas exit. */
export function testInlinePanelHandoff(source: InlinePanel, destination: InlinePanel): void {
  for (const type of ['title', 'text'] as const) {
    test(`${type}: panel handoff ${source.button} -> ${destination.button}`, async ({ page }, info) => {
      const original = type === 'title'
        ? { type, style: 'none', label: 'Original title' }
        : { type, body: '<p>Original body.</p>' };
      const neighbor = { type: 'text', body: '<p>Keep this paragraph.</p>' };
      const state = await openTextCanvas(page, [original, neighbor], type === 'title' ? 1440 : 390);
      const host = page.locator(type === 'title'
        ? 'app-builder-list app-title' : 'app-builder-list .text-body').first();
      const target = type === 'title' ? host.locator('h2') : host;
      const editor = host.locator('.ProseMirror');
      const bubble = page.locator('app-tiptap-bubble-menu').getByRole('toolbar');
      const unchanged = await draft(page);

      for (const exit of ['cancel', 'blur'] as const) {
        await target.click({ position: { x: 20, y: 10 } });
        await expect(editor).toBeFocused();
        // Let Tiptap finish its initial scheduled focus before replacing the DOM selection.
        await page.evaluate(() => new Promise<void>(resolve => {
          requestAnimationFrame(() => resolve());
        }));
        await editor.fill('Pending switch title');
        await editor.press('ControlOrMeta+A');
        await bubble.getByRole('button', { name: source.button, exact: true }).click();
        const sourceControl = page.locator(source.selector).locator(source.control).first();
        if (source.control === 'select') await sourceControl.focus();
        await expect(sourceControl).toBeFocused();
        if (source.control === 'input') {
          await sourceControl.fill('https://example.test/pending');
          await bubble.getByRole('button', { name: source.button, exact: true }).click();
          await expect(sourceControl).toBeFocused();
          await expect(sourceControl).toHaveValue('https://example.test/pending');
        }
        expect(await draft(page)).toEqual(unchanged);

        await bubble.getByRole('button', { name: destination.button, exact: true }).click();
        const destinationPanel = page.locator(destination.selector);
        if (source.selector === destination.selector) {
          await expect(destinationPanel).toBeHidden();
        } else {
          await expect(page.locator(source.selector)).toBeHidden();
          await expect(destinationPanel).toBeVisible();
        }
        if (destination.control === 'input') {
          await expect(destinationPanel.locator('input').first()).toBeFocused();
          await destinationPanel.locator('input').first().press('Escape');
          await expect(destinationPanel).toBeHidden();
        }
        await expect(editor).toBeFocused();
        await expect(editor).toHaveText('Pending switch title');
        expect(await page.evaluate(() => window.getSelection()?.toString()))
          .toBe('Pending switch title');
        expect(await draft(page)).toEqual(unchanged);
        await page.screenshot({ path: info.outputPath(`handoff-${exit}.png`) });
        await page.keyboard.type('Continued edit');
        await expect(editor).toHaveText('Continued edit');
        if (exit === 'cancel') {
          await editor.press('Escape');
          await expect(editor).toHaveCount(0);
          expect(await draft(page)).toEqual(unchanged);
        } else {
          const next = page.locator('app-builder-list .text-body').last();
          await next.click({ position: { x: 20, y: 10 } });
          await expect(next.locator('.ProseMirror')).toBeFocused();
          await next.locator('.ProseMirror').press('Escape');
          await expect(editor).toHaveCount(0);
          expect((await draft(page)).body[0][type === 'title' ? 'label' : 'body'])
            .toBe(type === 'title' ? 'Continued edit' : '<p>Continued edit</p>');
          expect((await draft(page)).body[1]).toEqual(neighbor);
        }
      }
      expect(state.errors).toEqual([]);
      expect(state.writes).toEqual([]);
    });
  }
}

/** Exercise the same canvas focus contract for each floating editor panel. */
export function testInlinePanelFocus(panelSelector: string, buttonName: string): void {
  for (const type of ['title', 'text'] as const) {
    for (const close of ['Escape', 'button'] as const) {
      test(`${buttonName}: ${type} keeps editing after ${close}`, async ({ page }, info) => {
        const original = type === 'title'
          ? { type, style: 'none', label: 'Original title' }
          : { type, body: '<p>Original body.</p>' };
        const neighbor = { type: 'text', body: '<p>Keep this paragraph.</p>' };
        const state = await openTextCanvas(page, [original, neighbor]);
        const host = page.locator(type === 'title'
          ? 'app-builder-list app-title' : 'app-builder-list .text-body').first();
        const target = type === 'title' ? host.locator('h2') : host;
        const editor = host.locator('.ProseMirror');
        const panel = page.locator(panelSelector);
        const unchanged = await draft(page);
        const openPanel = async () => {
          await editor.press('ControlOrMeta+A');
          await page.locator('app-tiptap-bubble-menu')
            .getByRole('button', { name: buttonName, exact: true }).click();
          await expect(panel.getByRole('textbox')).toBeFocused();
        };
        const closePanel = async () => {
          if (close === 'Escape') {
            await panel.getByRole('textbox').press('Escape');
          } else {
            const button = panel.getByRole('button', { name: '关闭', exact: true });
            await button.focus();
            await expect(editor).toBeVisible();
            await button.click();
          }
          await expect(panel).toBeHidden();
          await expect(editor).toBeFocused();
        };

        await target.click({ position: { x: 20, y: 10 } });
        await expect(editor).toBeFocused();
        await editor.fill('Pending edit');
        await openPanel();
        await closePanel();
        expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('Pending edit');
        expect(await draft(page)).toEqual(unchanged);
        await page.screenshot({ path: info.outputPath('panel-focus-returned.png') });
        await editor.press('Escape');
        await expect(editor).toHaveCount(0);
        expect(await draft(page)).toEqual(unchanged);

        await target.click({ position: { x: 20, y: 10 } });
        await expect(editor).toBeFocused();
        await editor.fill('Replace this selection');
        await openPanel();
        await closePanel();
        await page.keyboard.type('Final edit');
        await expect(editor).toHaveText('Final edit');
        if (type === 'title') await editor.press('Enter');
        else await page.mouse.click(1200, 750);
        await expect(editor).toHaveCount(0);
        expect((await draft(page)).body[0][type === 'title' ? 'label' : 'body'])
          .toBe(type === 'title' ? 'Final edit' : '<p>Final edit</p>');
        expect((await draft(page)).body[1]).toEqual(neighbor);
        expect(state.errors).toEqual([]);
        expect(state.writes).toEqual([]);
      });
    }
  }

  test(`${buttonName}: leaving the open panel commits only its owning component`, async ({ page }) => {
    const state = await openTextCanvas(page, [
      { type: 'text', body: '<p>First paragraph.</p>' },
      { type: 'text', body: '<p>Second paragraph.</p>' },
    ]);
    const bodies = page.locator('app-builder-list .text-body');
    const first = bodies.nth(0).locator('.ProseMirror');
    const second = bodies.nth(1).locator('.ProseMirror');
    await bodies.nth(0).click({ position: { x: 20, y: 10 } });
    await expect(first).toBeFocused();
    await first.fill('Committed first');
    await first.press('ControlOrMeta+A');
    await page.locator('app-tiptap-bubble-menu')
      .getByRole('button', { name: buttonName, exact: true }).click();
    await expect(page.locator(panelSelector).getByRole('textbox')).toBeFocused();
    await bodies.nth(1).click({ position: { x: 20, y: 10 } });
    await expect(second).toBeFocused();
    await second.fill('Discard second');
    await second.press('Escape');
    await expect(second).toHaveCount(0);
    expect((await draft(page)).body.map((item: { body: string }) => item.body))
      .toEqual(['<p>Committed first</p>', '<p>Second paragraph.</p>']);
    expect(state.errors).toEqual([]);
    expect(state.writes).toEqual([]);
  });
}
