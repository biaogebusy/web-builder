import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { expect, test } from './fixtures/test';
import { draftImage, openImageCanvas, openImagePanel as openPanel } from './fixtures/image-canvas';
import { storageKey } from './fixtures/storage';

async function openImages(page: Page, width?: number, theme?: string) {
  const state = await openImageCanvas(page, width, theme);
  await openPanel(page);
  return state;
}

for (const [width, theme] of [[1440, 'light-theme'], [390, 'dark-theme']] as const) {
  test(`cleared image styles survive editing and reload at ${width}px`, async ({ page }, info) => {
    const state = await openImages(page, width, theme);
    const panel = page.locator('app-inline-editor');
    const clear = panel.getByRole('button', { name: '清空样式', exact: true });
    await clear.focus();
    await page.keyboard.press('Enter');
    await expect.poll(async () => (await draftImage(page)).style).toEqual({});
    const field = panel.getByRole('spinbutton', { name: 'W', exact: true });
    await field.fill('321');
    await expect.poll(async () => (await draftImage(page)).width).toBe(321);
    expect((await draftImage(page)).style).toEqual({});
    await expect(field).toBeFocused();
    await expect(page.locator('app-builder-list img[alt="First image"]'))
      .toHaveAttribute('width', '321');
    expect((await draftImage(page, 1)).style).toEqual({ borderRadius: '12px' });
    await page.screenshot({ path: info.outputPath('cleared-image-panel.png') });
    expect((await new AxeBuilder({ page }).include('app-inline-editor')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await page.locator('.right-header button').click();
    await expect(panel).toHaveCount(0);
    await openPanel(page);
    await expect(panel.getByRole('spinbutton', { name: 'W', exact: true })).toHaveValue('321');
    await page.reload();
    const img = page.locator('app-builder-list img[alt="First image"]');
    await expect(img).toHaveAttribute('width', '321');
    await expect(img).not.toHaveCSS('border-radius', '24px');
    expect((await draftImage(page)).style).toEqual({});
    expect(state.writes).toEqual([]);
    expect(state.errors).toEqual([]);
  });
}

test('invalid dimensions retain the last valid image until corrected', async ({ page }) => {
  const state = await openImages(page);
  const panel = page.locator('app-inline-editor');
  for (const [name, original] of [['W', 320], ['H', 240]] as const) {
    const field = panel.getByRole('spinbutton', { name, exact: true });
    const key = name === 'W' ? 'width' : 'height';
    for (const value of ['', '0', '-1', '1.5']) {
      await field.fill(value);
      await expect(field).toHaveValue(value);
      await expect(field).toBeFocused();
      expect((await draftImage(page))[key]).toBe(original);
    }
    await field.fill('480');
    await expect.poll(async () => (await draftImage(page))[key]).toBe(480);
  }
  await page.locator('.right-header button').click();
  await openPanel(page, 'Second image');
  await expect(panel.getByRole('spinbutton', { name: 'W', exact: true })).toHaveValue('300');
  await panel.getByRole('button', { name: '清空样式', exact: true }).click();
  await panel.getByRole('spinbutton', { name: 'H', exact: true }).fill('250');
  await expect.poll(async () => (await draftImage(page, 1)).height).toBe(250);
  expect((await draftImage(page)).width).toBe(480);
  expect((await draftImage(page)).style.borderRadius).toBe('24px');
  expect((await draftImage(page, 1)).style).toEqual({});
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});

test('selecting another draft closes the old image property panel', async ({ page }) => {
  const state = await openImages(page);
  await page.locator('app-builder-version mat-list-item').nth(1).locator('mat-icon').first().click();
  await expect(page.locator('app-inline-editor')).toHaveCount(0);
  await expect(page.locator('app-builder-list img[alt="First image"]')).toHaveCount(0);
  const drafts = await page.evaluate(key => JSON.parse(localStorage.getItem(key) || '[]'),
    storageKey('version'));
  expect(drafts[1].current).toBe(true);
  expect(drafts[0].body[0]).toMatchObject({ width: 320, height: 240,
    style: { borderRadius: '24px', opacity: '0.6' } });
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});
