import { expect, test } from './fixtures/test';
import { mdiAccountFile, mdiAlphaABox } from '@mdi/js';

test('renders new and legacy icon values without loading the full sprite', async ({ page }) => {
  const names = ['account-file', 'alpha-abox', 'alpha-a-box', 'github'];
  const iconRequests: string[] = [];
  page.on('request', request => {
    const path = new URL(request.url()).pathname;
    if (path.includes('svg-icons/') || path.endsWith('/mdi.svg')) {
      iconRequests.push(path);
    }
  });
  await page.route('**/api/v3/landingPage*', route => {
    const content = new URL(route.request().url()).searchParams.get('content');
    return route.fulfill({
      json: content === '/core/base'
        ? { defaultTheme: 'light-theme' }
        : content === '/core/branding'
          ? {}
          : { title: 'Icon compatibility', body: names.map(svg => ({ type: 'icon', svg })) },
    });
  });
  // Use the client shell so SSR transfer data cannot bypass the browser's API fixtures.
  await page.route('**/icon-compatibility', async route => {
    await route.fulfill({ response: await page.request.get('/preview') });
  });

  await page.goto('/icon-compatibility');
  for (const [name, path] of [
    ['account-file', mdiAccountFile],
    ['alpha-abox', mdiAlphaABox],
    ['alpha-a-box', mdiAlphaABox],
  ]) {
    await expect(page.locator(`app-icon [data-mat-icon-name="${name}"] svg path`))
      .toHaveAttribute('d', path);
  }
  await expect(page.locator('app-icon [data-mat-icon-name="github"] svg'))
    .toHaveAttribute('viewBox', '0 0 1024 1024');
  for (const name of names) {
    expect(iconRequests).toContain(`/assets/svg-icons/${name}.svg`);
  }
  expect(iconRequests.some(path => path.endsWith('/mdi.svg') || path.endsWith('/names.json')))
    .toBe(false);
});
