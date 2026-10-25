import { expect, test } from './fixtures/test';

const draft = (body: string) => [{
  title: 'Preview regression',
  current: true,
  body: [
    { type: 'text', body: `<p>${body}</p>` },
    { type: 'number-animate', value: 10, label: 'items' },
  ],
}];

test.beforeEach(async ({ context, page }) => {
  await context.route('**/api/v3/landingPage*', route => {
    const content = new URL(route.request().url()).searchParams.get('content');
    return route.fulfill({
      json: content === '/core/base'
        ? { defaultTheme: 'light-theme', builder: { guard: false } }
        : {},
    });
  });
  await context.route('**/assets/app/**/builder.json', route => route.fulfill({ json: {} }));
  await context.route('**/api/v3/node/component*', route => route.fulfill({ json: [] }));
  await page.addInitScript(value => {
    localStorage.setItem('ngx-webstorage:version', JSON.stringify(value));
  }, draft('Original draft'));
});

test('direct preview reads the saved draft through its lazy route provider', async ({ page }) => {
  await page.goto('/preview');
  await expect(page.locator('app-preview')).toContainText('Original draft');
  await page.reload();
  await expect(page.locator('app-preview')).toContainText('Original draft');
});

test('builder opens a draft preview that follows changes from the original tab', async ({ page }) => {
  await page.goto('/builder');
  await expect(page.locator('app-builder')).toBeVisible();
  await page.getByRole('button', { name: 'builder page', exact: true }).click();
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('menuitem', { name: '草稿预览' }).click();
  const preview = await popupPromise;
  await expect(preview).toHaveURL(/\/preview$/);
  await expect(preview.locator('app-preview')).toContainText('Original draft');

  await page.evaluate(value => {
    localStorage.setItem('ngx-webstorage:version', JSON.stringify(value));
  }, draft('Updated draft'));
  await expect(preview.locator('app-preview')).toContainText('Updated draft');
});

test('plain canvas editing saves through the route provider and reaches preview', async ({ page }) => {
  await page.goto('/builder');
  await expect(page.locator('app-builder')).toBeVisible({ timeout: 15_000 });
  const value = page.locator('.component-item app-number-animate [data-path="value"]');
  await expect(value).toBeVisible();
  await value.click();
  await expect(value).toHaveAttribute('contenteditable', 'true');
  await value.fill('42');
  const editedHtml = await value.innerHTML();
  await value.blur();
  await expect.poll(() => page.evaluate(() => {
    const pages = JSON.parse(localStorage.getItem('ngx-webstorage:version') ?? '[]');
    return pages[0]?.body[1]?.value;
  })).toBe(editedHtml);
  await page.getByRole('button', { name: 'builder page', exact: true }).click();
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('menuitem', { name: '草稿预览' }).click();
  const preview = await popupPromise;
  await expect(preview.locator('app-preview app-number-animate')).toContainText('42');
  const previewValue = preview.locator('app-number-animate [data-path="value"]');
  await previewValue.click();
  await expect(previewValue).not.toHaveAttribute('contenteditable', 'true');
});
