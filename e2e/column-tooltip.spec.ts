import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures/test';
import { openTextCanvas, readCurrentDraft } from './fixtures/text-canvas';

for (const width of [390, 1440]) {
  for (const theme of ['light-theme', 'dark-theme']) {
    for (const nested of [false, true]) {
      test(`column tooltip leaves actions reachable at ${width}px in ${theme} (nested: ${nested})`,
        async ({ page }, info) => {
          const layout = { type: 'layout-builder', elements: [
            { row: { xs: 6 }, elements: [{ type: 'btn', mode: 'text', label: 'First' }] },
            { row: { xs: 6 }, elements: [{ type: 'btn', mode: 'text', label: 'Second' }] },
          ] };
          const state = await openTextCanvas(page, nested ? [
            { type: 'layout-builder', elements: [{ row: { xs: 12 }, elements: [layout] }] },
          ] : [layout], width, theme);
          await page.waitForLoadState('networkidle');
          const component = page.locator(nested
            ? '#item-0 .item-layout-builder > app-dynamic-component'
            : '#item-0 > app-dynamic-component');
          const toolbar = component.locator(':scope > app-component-toolbar');
          const columns = component.locator(
            ':scope > .content-wrapper > app-layout-builder > .layout-builder > .layout-inner > .layout'
          );
          const tooltip = page.locator('.mat-mdc-tooltip-show .mat-mdc-tooltip-surface')
            .filter({ hasText: '配置当前栏' });
          const tooltipHost = page.locator('mat-tooltip-component')
            .filter({ hasText: '配置当前栏' });
          const closeTooltip = async () => {
            await page.keyboard.press('Escape');
            await expect(tooltip).toHaveCount(0);
            // A removed show class does not mean Material has detached the closing overlay.
            await expect(tooltipHost).toHaveCount(0);
          };
          const showTooltip = async (index: number) => {
            const column = columns.nth(index);
            await column.hover({ position: { x: 10, y: 10 } });
            const trigger = column.locator(':scope > .toolbar')
              .getByRole('button', { name: '配置当前栏', exact: true });
            await trigger.hover();
            await expect(tooltip).toBeVisible();
            await tooltip.evaluate(async element => {
              await Promise.all(element.parentElement!.getAnimations().map(item => item.finished));
            });
            return trigger;
          };
          for (const index of [0, 1]) {
            const trigger = await showTooltip(index);
            const geometry = await toolbar.evaluate(toolbar => {
              return [...toolbar.querySelectorAll('button')]
                .filter(button => button.checkVisibility({ visibilityProperty: true }))
                .map(button => {
                  const { x, y, width, height } = button.getBoundingClientRect();
                  const hit = document.elementFromPoint(x + width / 2, y + height / 2);
                  return { name: button.getAttribute('aria-label'), x, y, width, height,
                    hit: hit?.outerHTML.slice(0, 300),
                    receivesPointer: !!hit && button.contains(hit) };
                });
            });
            await info.attach(`column-${index}`, {
              body: JSON.stringify({ tooltip: await tooltip.boundingBox(), geometry }, null, 2),
              contentType: 'application/json',
            });
            expect(geometry.length).toBeGreaterThan(0);
            expect(geometry.every(button => button.receivesPointer)).toBe(true);
            const bounds = (await tooltip.boundingBox())!;
            expect(bounds.x).toBeGreaterThanOrEqual(0);
            expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
            await tooltip.hover();
            // Remain readable beyond Material's hide animation while the pointer is on the tooltip.
            await page.waitForTimeout(250);
            await expect(tooltip).toBeVisible();
            await closeTooltip();
            await trigger.click();
            await expect(page.getByRole('menu')).toBeVisible();
            await page.keyboard.press('Escape');
            await expect(page.getByRole('menu')).toHaveCount(0);
            await expect(trigger).toBeFocused();
            await page.mouse.move(1, 400);
            await page.keyboard.press('Tab');
            await expect(trigger).not.toBeFocused();
            await expect(tooltipHost).toHaveCount(0);
            await page.keyboard.press('Shift+Tab');
            await expect(trigger).toBeFocused();
            await expect(tooltip).toBeVisible();
            await closeTooltip();
          }
          await showTooltip(0);
          await page.screenshot({ path: info.outputPath('column-tooltip.png'), fullPage: true });
          expect((await new AxeBuilder({ page }).include('#builder-list')
            .include('.cdk-overlay-container')
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
          await toolbar.getByRole('button', { name: 'content-copy', exact: true }).click();
          await toolbar.getByRole('button', { name: 'content-paste', exact: true }).click();
          const { body } = await readCurrentDraft(page);
          expect(nested ? body[0].elements[0].elements : body).toEqual([layout, layout]);
          expect(state.errors).toEqual([]);
          expect(state.writes).toEqual([]);
        });
    }
  }
}
