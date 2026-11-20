import type { Page } from '@playwright/test';
import { expect } from './test';
import { mockPageList } from './page-list';
import { storageKey } from './storage';

/** Read persisted image data independently of the rendered canvas. */
export async function draftImage(page: Page, index = 0) {
  return page.evaluate(({ key, index }) => JSON.parse(localStorage.getItem(key) || '[]')
    .find((draft: { current: boolean }) => draft.current).body[index],
  { key: storageKey('version'), index });
}

/** Reach the property form through the canvas toolbar and wait for drawer motion. */
export async function openImagePanel(page: Page, alt = 'First image') {
  await page.locator(`app-builder-list img[alt="${alt}"]`).click();
  await page.locator('app-inline-image-bar button').nth(4).click();
  await expect(page.locator('app-inline-editor')).toBeVisible();
  await expect(page.locator('app-inline-editor').getByRole('spinbutton', { name: 'W', exact: true }))
    .toBeVisible();
  await page.locator('mat-drawer:has(app-inline-editor)').evaluate(async drawer => {
    await Promise.all(drawer.getAnimations().map(animation => animation.finished));
  });
}

/** Open two local images with synthetic login and CMS responses. */
export async function openImageCanvas(page: Page, width = 1440, theme = 'light-theme') {
  const { state } = await mockPageList(page);
  page.on('console', message => {
    if (message.type() === 'error') state.errors.push(message.text());
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.context().route('**/api/v3/node/component', route => route.fulfill({
    json: [{ label: 'Unused', elements: [] }, { label: 'Images', elements: [] }],
  }));
  await page.context().route('**/api/v3/landingPage**', route =>
    new URL(route.request().url()).searchParams.get('content') === '/core/builder'
      ? route.fulfill({ json: { manageMedia: { row: 2, sidebar: { form: [] } } } })
      : route.fallback());
  await page.route('**/image-properties.svg', route => route.fulfill({
    contentType: 'image/svg+xml',
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240"><rect width="320" height="240" fill="blue"/></svg>',
  }));
  await page.goto('/me/login/callback?code=test-code&state=test-state');
  await expect(page.locator('app-page-list')).toBeVisible({ timeout: 15_000 });
  await page.waitForLoadState('networkidle');
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
  expect(state.errors).toEqual([]);
  return state;
}
