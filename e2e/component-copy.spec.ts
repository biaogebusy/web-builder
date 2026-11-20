import type { Locator, Page } from '@playwright/test';
import { expect, test } from './fixtures/test';
import { openTextCanvas, readCurrentDraft } from './fixtures/text-canvas';
import { storageKey } from './fixtures/storage';

const first = { row: { xs: 6 }, elements: [{ type: 'btn', label: 'First', mode: 'text' }] };
const second = { row: { xs: 6 }, elements: [{ type: 'btn', label: 'Second', mode: 'text' }] };
const layout = { type: 'layout-builder', elements: [first, second] };

async function toolbarAction(component: Locator, name: string) {
  await component.hover();
  await component.locator(':scope > app-component-toolbar')
    .getByRole('button', { name, exact: true }).click();
}

async function swapColumns(page: Page, component: Locator) {
  await toolbarAction(component, 'tune-vertical');
  const rows = page.locator('app-layout-setting .loop-elements mat-list-item');
  await expect(rows).toHaveCount(2);
  await rows.last().scrollIntoViewIfNeeded();
  const source = (await rows.first().boundingBox())!;
  const target = (await rows.last().boundingBox())!;
  await page.mouse.move(source.x + 24, source.y + source.height / 2);
  await page.mouse.down();
  await page.mouse.move(source.x + 34, source.y + source.height / 2);
  await page.mouse.move(target.x + 24, target.y + target.height / 2, { steps: 12 });
  await page.mouse.up();
  await page.locator('.right-drawer .right-header')
    .getByRole('button', { name: 'page-last', exact: true }).click();
  await expect(page.locator('app-layout-setting')).toHaveCount(0);
}

test('copy keeps its original layout after the source columns are reordered', async ({ page }) => {
  const state = await openTextCanvas(page, [{
    ...layout, extra: { uuid: 'source-block' }, relationships: { page: 'source-page' },
  }]);
  const source = page.locator('#item-0 > app-dynamic-component');
  await toolbarAction(source, 'content-copy');
  await swapColumns(page, source);
  await expect.poll(async () => (await readCurrentDraft(page)).body[0])
    .toEqual({ ...layout, elements: [second, first] });
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), storageKey('cck')))
    .toEqual(layout);

  await toolbarAction(source, 'content-paste');
  expect((await readCurrentDraft(page)).body).toEqual([
    { ...layout, elements: [second, first] }, layout,
  ]);
  await page.reload();
  expect((await readCurrentDraft(page)).body[1]).toEqual(layout);
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});

test('reordering a nested pasted layout leaves the source layout unchanged', async ({ page }) => {
  const state = await openTextCanvas(page, [layout, {
    type: 'layout-builder', elements: [{
      row: { xs: 12 }, elements: [{ type: 'btn', label: 'Paste here', mode: 'text' }],
    }],
  }]);
  await toolbarAction(page.locator('#item-0 > app-dynamic-component'), 'content-copy');
  await toolbarAction(page.locator('#item-1 .item-btn > app-dynamic-component'), 'content-paste');
  const copied = page.locator('#item-1 .item-layout-builder > app-dynamic-component');
  await expect(copied).toHaveCount(1);
  await swapColumns(page, copied);
  await expect.poll(async () => (await readCurrentDraft(page)).body[1].elements[0].elements[1])
    .toEqual({ ...layout, elements: [second, first] });
  expect((await readCurrentDraft(page)).body[0]).toEqual(layout);
  await page.reload();
  expect((await readCurrentDraft(page)).body[0]).toEqual(layout);
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});
