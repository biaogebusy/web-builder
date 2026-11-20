import type { Page } from '@playwright/test';
import { expect } from './test';
import { mockPageList } from './page-list';
import { storageKey } from './storage';

/** Read the saved draft independently of the rendered text editor. */
export async function readCurrentDraft(page: Page) {
  return page.evaluate(key => JSON.parse(localStorage.getItem(key) || '[]')
    .find((item: { current: boolean }) => item.current), storageKey('version'));
}

/** Open text components using synthetic CMS responses and local drafts. */
export async function openTextCanvas(
  page: Page, body: Record<string, unknown>[], width = 1440, theme = 'light-theme'
) {
  const { state } = await mockPageList(page);
  page.on('console', message => {
    if (message.type() === 'error') state.errors.push(message.text());
  });
  await page.context().route('**/api/v3/node/component', route => route.fulfill({
    json: [{ label: 'Unused', elements: [] }, { label: 'Text', elements: [] }],
  }));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/me/login/callback?code=test-code&state=test-state');
  await expect(page.locator('app-page-list')).toBeVisible({ timeout: 15_000 });
  await page.waitForLoadState('networkidle');
  await page.evaluate(({ key, themeKey, theme, body }) => {
    const drafts = JSON.parse(localStorage.getItem(key)!);
    drafts.find((item: { current: boolean }) => item.current).body = body;
    localStorage.setItem(key, JSON.stringify(drafts));
    localStorage.setItem(themeKey, JSON.stringify(theme));
  }, { key: storageKey('version'), themeKey: storageKey('themeMode'), theme, body });
  await page.goto('/builder');
  await expect(page.locator('html')).toHaveClass(new RegExp(theme));
  await expect(page.locator('app-builder-list')).toBeVisible();
  await page.setViewportSize({ width, height: 900 });
  return state;
}
