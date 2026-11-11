import AxeBuilder from '@axe-core/playwright';
import { mockLoginNavigation } from './fixtures/login-navigation';
import { storageKey } from './fixtures/storage';
import { expect, test } from './fixtures/test';

for (const view of ['default', 'custom'] as const) {
  test(`builder ${view} page recovers on reentry without reloading or changing drafts`, async ({
    page, context,
  }, testInfo) => {
    await mockLoginNavigation(page, '/builder/hub', { builderGuard: false });
    const path = view === 'default' ? '/builder' : '/builder/ref108';
    const contentPath = view === 'default' ? '/builder/default-page' : path;
    const host = view === 'default' ? 'app-default-page' : 'app-manage-page';
    let failed = true;
    let reads = 0;
    let failures = 0;
    let documents = 0;
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error' && message.text().includes('Failed to load page content:')) {
        failures++;
      }
    });
    page.on('request', request => { if (request.resourceType() === 'document') documents++; });
    await context.route('**/api/v3/node/component*', route => route.fulfill({ json: [] }));
    await context.route('**/api/v3/landingPage*', route => {
      const content = new URL(route.request().url()).searchParams.get('content');
      if (content === '/core/base') {
        return route.fulfill({ json: {
          defaultTheme: 'light-theme', librariesUseLocal: true,
          builder: { enable: true, guard: false },
        } });
      }
      if (content === '/core/builder') {
        return route.fulfill({ json: {
          menu: [{ label: 'Recovery page', href: path, icon: { svg: 'file-document-outline' } }],
          tour: { enable: false },
        } });
      }
      if (content !== contentPath) return route.fallback();
      reads++;
      return failed
        ? route.fulfill({ status: 503, json: { error: 'Synthetic page failure' } })
        : route.fulfill({ json: { title: 'Recovered page', body: [
          { type: 'text', body: '<h2>Recovered page content</h2>' },
        ] } });
    });
    await page.addInitScript(() => {
      sessionStorage.setItem('xinshi-oauth-pkce', JSON.stringify({
        verifier: 'test-verifier', state: 'test-state', mode: 'redirect', returnUrl: '/builder/hub',
      }));
    });
    await page.goto('/me/login/callback?code=test-code&state=test-state');
    await expect(page.locator('app-hub')).toBeVisible();
    const enter = async () => {
      await page.locator(`app-builder-sidebar a.menu-trigger[href="${path}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(page.locator(host)).toBeAttached();
    };
    const leave = async () => {
      await page.locator('app-builder-sidebar a.menu-trigger[href="/builder/hub"]').click();
      await expect(page.locator('app-hub')).toBeVisible();
    };
    await enter();
    await expect.poll(() => failures).toBe(1);
    expect(reads).toBe(2);
    const draftKey = storageKey('version');
    const draft = await page.evaluate(key => localStorage.getItem(key), draftKey);
    await page.screenshot({ path: testInfo.outputPath('failed.png') });
    await leave();
    failed = false;
    await enter();
    await expect(page.getByRole('heading', { name: 'Recovered page content' })).toBeVisible();
    expect(reads).toBe(3);
    expect((await new AxeBuilder({ page }).include(host)
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath('recovered.png') });
    await leave();
    await enter();
    await expect(page.getByRole('heading', { name: 'Recovered page content' })).toBeVisible();
    expect(reads).toBe(3);
    expect(documents).toBe(1);
    expect(errors).toEqual([]);
    expect(await page.evaluate(key => localStorage.getItem(key), draftKey)).toBe(draft);
  });
}
