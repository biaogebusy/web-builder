import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { expect, test } from './fixtures/test';
import { mockPageList } from './fixtures/page-list';
import { storageKey } from './fixtures/storage';

async function draftImage(page: Page, index = 0) {
  return page.evaluate(({ key, index }) => JSON.parse(localStorage.getItem(key) || '[]')
    .find((draft: { current: boolean }) => draft.current).body[index],
  { key: storageKey('version'), index });
}

async function openPanel(page: Page, alt = 'First image') {
  await page.locator(`app-builder-list img[alt="${alt}"]`).click();
  await page.locator('app-inline-image-bar button').nth(4).click();
  await expect(page.locator('app-inline-editor')).toBeVisible();
  await expect(page.locator('app-inline-editor').getByRole('spinbutton', { name: 'W', exact: true }))
    .toBeVisible();
  await page.locator('mat-drawer:has(app-inline-editor)').evaluate(async drawer => {
    await Promise.all(drawer.getAnimations().map(animation => animation.finished));
  });
}

async function openImages(page: Page, width = 1440, theme = 'light-theme') {
  const { state } = await mockPageList(page);
  page.on('console', message => {
    if (message.type() === 'error') state.errors.push(message.text());
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.context().route('**/api/v3/node/component', route => route.fulfill({
    json: [{ label: 'Unused', elements: [] }, { label: 'Images', elements: [] }],
  }));
  await page.route('**/image-properties.svg', route => route.fulfill({
    contentType: 'image/svg+xml',
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240"><rect width="320" height="240" fill="blue"/></svg>',
  }));
  await page.goto('/me/login/callback?code=test-code&state=test-state');
  await expect(page.locator('app-page-list')).toBeVisible({ timeout: 15_000 });
  await page.evaluate(({ key, themeKey, theme }) => {
    const drafts = JSON.parse(localStorage.getItem(key)!);
    drafts.find((draft: { current: boolean }) => draft.current).body = [
      { type: 'img', src: `${location.origin}/image-properties.svg`, alt: 'First image',
        width: 320, height: 240, style: { borderRadius: '24px', opacity: '0.6',
          boxShadow: '0 2px 4px black', aspectRatio: '4 / 3', objectFit: 'cover' } },
      { type: 'img', src: `${location.origin}/image-properties.svg`, alt: 'Second image',
        width: 300, height: 200, style: { borderRadius: '12px' } },
    ];
    localStorage.setItem(key, JSON.stringify(drafts));
    localStorage.setItem(themeKey, JSON.stringify(theme));
  }, { key: storageKey('version'), themeKey: storageKey('themeMode'), theme });
  await page.goto('/builder');
  await expect(page.locator('html')).toHaveClass(new RegExp(theme));
  await page.setViewportSize({ width, height: 900 });
  await openPanel(page);
  expect(state.errors).toEqual([]);
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
