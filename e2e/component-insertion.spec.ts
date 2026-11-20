import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { expect, test } from './fixtures/test';
import { mockPageList } from './fixtures/page-list';
import { storageKey } from './fixtures/storage';

async function openInsertion(page: Page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  const fixture = await mockPageList(page);
  await page.context().route('**/api/v3/node/component', route => route.fulfill({ json: [
    { label: 'Unused', elements: [] },
    { label: 'Insertion fixtures', elements: [{ label: 'Text', child: [
      { label: 'First widget', content: { type: 'text', body: '<p>First inserted widget</p>' } },
      { label: 'Second widget', content: { type: 'text', body: '<p>Second inserted widget</p>' } },
    ] }] },
  ] }));
  await page.goto('/me/login/callback?code=test-code&state=test-state');
  await expect(page.locator('app-page-list')).toBeVisible();
  await page.goto('/builder');
  const first = page.locator('app-builder-panel .item').filter({ hasText: 'First widget' });
  await expect(first).toBeVisible();
  await expect(page.locator('app-builder-list #item-0')).toBeVisible();
  const start = new Date('2026-11-12T00:00:00Z');
  await page.clock.install({ time: start });
  await page.clock.pauseAt(new Date(start.valueOf() + 1000));
  // Observe actual browser scroll requests without replacing their behavior.
  await page.evaluate(() => {
    const original = Element.prototype.scrollIntoView;
    const calls: string[] = [];
    Object.assign(window, { insertionScrolls: calls });
    Element.prototype.scrollIntoView = function (...args) {
      if (this.id.startsWith('item-')) calls.push(this.id);
      original.apply(this, args);
    };
  });
  return { ...fixture, first };
}

async function insert(page: Page, entry: 'panel' | 'showcase') {
  const first = page.locator('app-builder-panel .item').filter({ hasText: 'First widget' });
  if (entry === 'panel') {
    await first.hover();
    await first.locator('.add button').click();
  } else {
    await first.locator('.inner').focus();
    await page.keyboard.press('Enter');
    await page.clock.runFor(32);
    const action = page.locator('app-builder-showcase .actions button').last();
    await action.click();
  }
  await page.clock.runFor(32);
  await expect(page.locator('app-builder-list #item-1')).toContainText('First inserted widget');
  const drafts = await page.evaluate(key => JSON.parse(localStorage.getItem(key) || '[]'),
    storageKey('version'));
  expect(drafts[0].body).toHaveLength(2);
}

async function scrolls(page: Page): Promise<string[]> {
  return page.evaluate(() =>
    (window as unknown as { insertionScrolls: string[] }).insertionScrolls);
}

for (const entry of ['panel', 'showcase'] as const) {
  test(`${entry} insertion keeps its normal scroll and persisted draft`, async ({ page }, info) => {
    const { state } = await openInsertion(page);
    await insert(page, entry);
    await page.clock.runFor(800);
    expect(await scrolls(page)).toEqual(['item-1']);
    if (entry === 'showcase') await expect(page.locator('app-builder-showcase')).toHaveCount(0);
    const canvasItem = page.locator('app-builder-list #item-1');
    await canvasItem.focus();
    await expect(canvasItem).toBeFocused();
    await page.clock.resume();
    expect((await new AxeBuilder({ page }).include('app-builder-list #item-1')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await page.screenshot({ path: info.outputPath(`${entry}-inserted.png`) });
    expect(state.writes).toEqual([]);
    expect(state.errors).toEqual([]);
    await page.reload();
    await expect(page.locator('app-builder-list #item-1')).toContainText('First inserted widget');
  });

  test(`${entry} insertion stops after a new draft selection`, async ({ page }) => {
    const { state } = await openInsertion(page);
    await insert(page, entry);
    const version = page.locator('app-builder-version mat-list-item').nth(1);
    await version.locator('mat-icon').first().click();
    await page.clock.runFor(800);
    expect(await scrolls(page)).toEqual([]);
    const drafts = await page.evaluate(key => JSON.parse(localStorage.getItem(key) || '[]'),
      storageKey('version'));
    expect(drafts[0].body).toHaveLength(2);
    expect(drafts[1].current).toBe(true);
    expect(state.writes).toEqual([]);
    expect(state.errors).toEqual([]);
  });

  test(`${entry} insertion stops after leaving the workspace`, async ({ page }) => {
    const { state } = await openInsertion(page);
    await insert(page, entry);
    await page.locator('app-builder-sidebar a.menu-trigger[href="/builder/hub"]').click();
    await expect(page).toHaveURL(/\/builder\/hub$/);
    await page.clock.runFor(32);
    await expect(page.locator('app-builder-workspace')).toHaveCount(0);
    await page.clock.runFor(800);
    expect(await scrolls(page)).toEqual([]);
    expect(state.errors).toEqual([]);
  });
}

test('a new fixed preview survives the previous preview insertion', async ({ page }) => {
  const { state } = await openInsertion(page);
  await insert(page, 'showcase');
  const second = page.locator('app-builder-panel .inner').filter({ hasText: 'Second widget' });
  await second.focus();
  await page.keyboard.press('Enter');
  await page.clock.runFor(800);
  await expect(page.locator('app-builder-showcase')).toContainText('Second inserted widget');
  await expect(second).toHaveClass(/active/);
  await expect(second).toBeFocused();
  expect(await scrolls(page)).toEqual([]);
  await page.clock.resume();
  expect((await new AxeBuilder({ page }).include('app-builder-showcase .showcase-footer')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  expect(state.errors).toEqual([]);
});
