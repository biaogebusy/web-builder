import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures/test';
import { mockPageList } from './fixtures/page-list';
import { openTextCanvas, readCurrentDraft as draft } from './fixtures/text-canvas';

const content = [
  { type: 'title', style: 'none', label: 'Standalone heading' },
  { type: 'text', title: { style: 'style-v1', label: 'Nested decorated heading' },
    body: '<p>Keep this paragraph.</p>' },
];

test('cleared title can be entered again with the mouse after refresh', async ({ page }, info) => {
  const state = await openTextCanvas(page, content);
  const title = page.locator('app-builder-list app-title').first();
  await title.locator('h2').click({ position: { x: 20, y: 10 } });
  await expect(title.locator('.ProseMirror')).toBeFocused();
  await title.locator('.ProseMirror').fill('');
  await page.keyboard.press('Enter');
  await expect.poll(async () => (await draft(page)).body[0].label).toBe('');
  const target = title.getByRole('button', { name: '编辑标题' });
  await expect(target).toBeVisible();
  expect(await target.innerHTML()).toBe('');
  await expect(title.locator('h2')).toHaveCount(0);
  await page.waitForLoadState('networkidle');
  await page.reload();
  await expect(target).toBeVisible();
  await page.screenshot({ path: info.outputPath('empty-title-target.png') });
  await target.click({ position: { x: 20, y: 20 } });
  await expect(title.locator('.ProseMirror')).toBeFocused();
  await title.locator('.ProseMirror').fill('Recovered title');
  await page.keyboard.press('Enter');
  await expect(title.getByRole('heading', { name: 'Recovered title', level: 2 })).toBeVisible();
  await expect.poll(async () => (await draft(page)).body[0].label).toBe('Recovered title');
  await page.reload();
  await expect(title.locator('h2')).toHaveText('Recovered title');
  expect((await draft(page)).body[1]).toEqual(content[1]);
  expect(JSON.stringify(await draft(page))).not.toContain('编辑标题');
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});

for (const [width, theme] of [[1440, 'light-theme'], [390, 'dark-theme']] as const) {
  test(`empty title supports keyboard cancellation and recovery at ${width}px`, async ({ page }, info) => {
    const state = await openTextCanvas(page, content, width, theme);
    const title = page.locator('app-builder-list app-title').first();
    await title.locator('h2').click({ position: { x: 20, y: 10 } });
    await expect(title.locator('.ProseMirror')).toBeFocused();
    await title.locator('.ProseMirror').fill('');
    await page.keyboard.press('Enter');
    const target = title.getByRole('button', { name: '编辑标题' });
    await expect(target).toBeVisible();
    const unchanged = await draft(page);
    await target.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(target).toBeFocused();
    await page.screenshot({ path: info.outputPath('empty-title-focus.png') });
    expect((await new AxeBuilder({ page }).include('app-builder-list app-title')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await page.keyboard.press('Enter');
    await expect(title.locator('.ProseMirror')).toBeFocused();
    await title.locator('.ProseMirror').fill('Discard this');
    await page.keyboard.press('Escape');
    await expect(target).toBeFocused();
    expect(await draft(page)).toEqual(unchanged);
    await page.keyboard.press('Space');
    await expect(title.locator('.ProseMirror')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(target).toBeVisible();
    expect(await draft(page)).toEqual(unchanged);
    await target.focus();
    await page.keyboard.press('Enter');
    await expect(title.locator('.ProseMirror')).toBeFocused();
    await title.locator('.ProseMirror').fill('Keyboard title');
    await page.keyboard.press('Enter');
    await expect(title.getByRole('heading', { name: 'Keyboard title', level: 2 })).toBeVisible();
    expect((await draft(page)).body[0].label).toBe('Keyboard title');
    expect((await draft(page)).body[1]).toEqual(content[1]);
    expect(state.errors).toEqual([]);
    expect(state.writes).toEqual([]);
  });
}

test('nested decorated title keeps its styles and writes only its own label', async ({ page }) => {
  const state = await openTextCanvas(page, content);
  const title = page.locator('app-builder-list app-title').nth(1);
  const heading = title.locator('h2');
  await expect(heading).toBeVisible();
  const decoration = () => heading.evaluate(element => {
    const style = getComputedStyle(element);
    return [style.paddingBottom, style.marginBottom, style.textAlign];
  });
  const before = await decoration();
  await heading.click({ position: { x: 20, y: 10 } });
  await expect(title.locator('.ProseMirror')).toBeFocused();
  await title.locator('.ProseMirror').fill('');
  await page.keyboard.press('Enter');
  const target = title.getByRole('button', { name: '编辑标题' });
  await expect(target).toBeVisible();
  expect((await target.boundingBox())!.height).toBeGreaterThanOrEqual(48);
  await expect(title.locator('.title')).toHaveClass(/style-v1/);
  expect((await draft(page)).body[1].title.label).toBe('');
  await target.click({ position: { x: 20, y: 20 } });
  await expect(title.locator('.ProseMirror')).toBeFocused();
  await title.locator('.ProseMirror').fill('Recovered nested heading');
  await page.keyboard.press('Enter');
  await expect(heading).toHaveText('Recovered nested heading');
  expect(await decoration()).toEqual(before);
  expect((await draft(page)).body[0]).toEqual(content[0]);
  expect((await draft(page)).body[1].body).toBe(content[1].body);
  expect((await draft(page)).body[1].title.label).toBe('Recovered nested heading');
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});

test('public empty title retains its heading markup without an edit target', async ({ page }) => {
  const { state } = await mockPageList(page);
  page.on('console', message => {
    if (message.type() === 'error') state.errors.push(message.text());
  });
  await page.context().route('**/api/v3/landingPage**', route => {
    if (new URL(route.request().url()).searchParams.get('content') !== '/empty-title') {
      return route.fallback();
    }
    return route.fulfill({ json: { title: 'Public title', publicPageKey: 'node:1:zh-hans:1', body: [
      { type: 'title', style: 'none', label: '' },
      { type: 'title', style: 'style-v1', label: 'Public decorated title' },
    ] } });
  });
  await page.goto('/empty-title');
  await expect(page.locator('app-title h2')).toHaveCount(2);
  const empty = page.locator('app-title h2').first();
  expect(await empty.innerHTML()).toBe('');
  expect(await empty.getAttribute('tabindex')).toBeNull();
  const heading = page.getByRole('heading', { name: 'Public decorated title', level: 2 });
  await expect(heading).toBeVisible();
  await heading.click();
  await expect(page.locator('[data-contentedit-placeholder], .ProseMirror')).toHaveCount(0);
  expect(state.errors).toEqual([]);
  expect(state.writes).toEqual([]);
});
