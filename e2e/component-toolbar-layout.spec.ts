import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures/test';
import { openTextCanvas, readCurrentDraft } from './fixtures/text-canvas';

for (const width of [390, 1440]) {
  for (const theme of ['light-theme', 'dark-theme']) {
    test(`toolbar leaves short and nested content reachable at ${width}px in ${theme}`,
      async ({ page }, info) => {
        const state = await openTextCanvas(page, [
          { type: 'btn', mode: 'raised', label: 'Original button', href: '/must-not-navigate' },
          { type: 'btn', mode: 'text', label: 'Adjacent button' },
          { type: 'layout-builder', elements: [
            { row: { xs: 6 }, elements: [{ type: 'btn', mode: 'text', label: 'Nested button' }] },
            { row: { xs: 6 }, elements: [{ type: 'text', body: '<p>Nested paragraph</p>' }] },
          ] },
        ], width, theme);
        const unchanged = await readCurrentDraft(page);
        for (const [index, selector] of [
          '#item-0 > app-dynamic-component',
          '#item-1 > app-dynamic-component',
          '#item-2 .item-btn > app-dynamic-component',
        ].entries()) {
          const component = page.locator(selector);
          const toolbar = component.locator(':scope > app-component-toolbar');
          const label = component.locator(':scope > .content-wrapper > app-btn [data-path="label"]');
          await expect(toolbar.locator('button[aria-label="content-copy"]'))
            .toHaveCount(1);
          await label.scrollIntoViewIfNeeded();
          const before = (await label.boundingBox())!;
          const group = index < 2 ? page.locator(`#item-${index}`) : component;
          await group.focus();
          await expect(toolbar.getByRole('button', { name: 'content-copy', exact: true }))
            .toBeVisible();
          await page.mouse.move(before.x + before.width / 2, before.y + before.height / 2);
          const geometry = await label.evaluate(label => {
            const rect = (element: Element) => {
              const { x, y, left, right, top, bottom, width, height } =
                element.getBoundingClientRect();
              return { x, y, left, right, top, bottom, width, height };
            };
            const component = label.closest('app-dynamic-component')!;
            const bounds = label.getBoundingClientRect();
            const hit = document.elementFromPoint(
              bounds.x + bounds.width / 2, bounds.y + bounds.height / 2
            );
            const buttons = [...component.querySelectorAll(
              ':scope > app-component-toolbar .actions button'
            )].filter(button => button.getBoundingClientRect().width > 0).map(rect);
            return { label: rect(label), component: rect(component), buttons,
              hit: hit?.outerHTML.slice(0, 400),
              receivesPointer: hit === label || !!hit && label.contains(hit) };
          });
          await info.attach(`geometry-${index}`, {
            body: JSON.stringify(geometry, null, 2), contentType: 'application/json',
          });
          expect(geometry.receivesPointer).toBe(true);
          expect(geometry.buttons.length).toBeGreaterThan(0);
          expect(geometry.label.y).toBeCloseTo(before.y, 0);
          for (const button of geometry.buttons) {
            // The bar disables Material's invisible halo, so the button itself carries
            // the WCAG 2.5.8 minimum target size and must stay clear of the content below.
            expect(button.width).toBeGreaterThanOrEqual(24);
            expect(button.height).toBeGreaterThanOrEqual(24);
            expect(button.left).toBeGreaterThanOrEqual(geometry.component.left);
            expect(button.right).toBeLessThanOrEqual(geometry.component.right);
            expect(button.bottom).toBeLessThanOrEqual(geometry.label.top);
          }
          await label.click();
          const editor = label.locator('.ProseMirror');
          await expect(editor).toBeFocused();
          await editor.press('Escape');
          await expect(editor).toHaveCount(0);
          await group.focus();
          for (const action of await toolbar.getByRole('button').all()) {
            await action.click({ trial: true });
          }
        }
        const columnMenu = page.locator('#item-2 .layout-0 > .toolbar')
          .getByRole('button', { name: 'tune-vertical-variant', exact: true });
        await columnMenu.click();
        await expect(page.getByRole('menu')).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(columnMenu).toBeFocused();
        await page.locator('#item-2 .item-btn > app-dynamic-component').focus();
        await page.screenshot({ path: info.outputPath('toolbar-layout.png'), fullPage: true });
        expect((await new AxeBuilder({ page }).include('#builder-list')
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
        expect(await readCurrentDraft(page)).toEqual(unchanged);
        await expect(page).toHaveURL(/\/builder$/);
        expect(state.errors).toEqual([]);
        expect(state.writes).toEqual([]);
      });
  }
}

for (const nested of [false, true]) {
  test(`toolbar keyboard actions retain their targets (nested: ${nested})`, async ({ page }) => {
    const first = { type: 'btn', mode: 'text', label: 'First button' };
    const second = { type: 'btn', mode: 'text', label: 'Second button' };
    const state = await openTextCanvas(page, nested ? [
      { type: 'layout-builder', elements: [{ row: { xs: 12 }, elements: [first, second] }] },
    ] : [first, second], 390);
    const items = async () => {
      const { body } = await readCurrentDraft(page);
      return nested ? body[0].elements[0].elements : body;
    };
    const group = page.locator(nested ? '#item-0 .item-btn > app-dynamic-component' : '#item-0')
      .first();
    const toolbar = group.locator('app-component-toolbar');
    await expect(toolbar.locator('button[aria-label="content-copy"]')).toHaveCount(1);
    await group.focus();
    await page.keyboard.press('Tab');
    const down = toolbar.getByRole('button', { name: 'arrow-collapse-down', exact: true });
    await expect(down).toBeFocused();
    await down.press('Enter');
    expect(await items()).toEqual([second, first]);
    await expect(group.locator('[data-path="label"]')).toHaveText('Second button');
    await group.focus();
    await toolbar.getByRole('button', { name: 'content-copy', exact: true }).press('Enter');
    await expect(group).toBeFocused();
    const paste = toolbar.getByRole('button', { name: 'content-paste', exact: true });
    await expect(paste).toBeVisible();
    await paste.press('Enter');
    expect(await items()).toEqual([second, second, first]);
    const top = page.locator('#item-0');
    await top.hover();
    const menu = top.getByRole('button', { name: '选择组件', exact: true });
    await menu.click();
    await expect(page.getByRole('menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    expect(state.errors).toEqual([]);
    expect(state.writes).toEqual([]);
  });
}
