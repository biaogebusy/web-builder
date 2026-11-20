import AxeBuilder from '@axe-core/playwright';
import type { Route } from '@playwright/test';
import { mockPageList } from './fixtures/page-list';
import { expect, test } from './fixtures/test';

for (const view of ['manager', 'picker'] as const) {
  test(`component ${view} recovers after reopening without a document reload`, async ({
    context, page,
  }, testInfo) => {
    await mockPageList(page);
    await context.route('**/api/v3/accountProfile*', route => route.fulfill({ json: {
      uid: 7, name: 'editor', roles: ['authenticated', 'administrator'],
    } }));
    await context.route('**/api/v1/user/user*', route => route.fulfill({ json: { data: [{
      id: 'editor-uuid', display_name: 'Editor', login: '2026-01-01T00:00:00Z',
      roles: [{ meta: { drupal_internal__target_id: 'administrator' } }],
    }] } }));
    await context.route('**/api/v3/webform', route => route.fulfill({ status: 404, json: {} }));
    let failed = true;
    let failedRead: Route | undefined;
    let reads = 0;
    let documents = 0;
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (request.resourceType() === 'document') documents++; });
    await context.route('**/api/v3/node/component*', route => {
      reads++;
      if (failed) {
        failedRead = route;
        return;
      }
      return route.fulfill({ json: [{
          id: 'widgets', uuid: 'widgets', label: '基础组件', icon: 'widgets-outline', type: 'base',
          elements: [{ id: 'text', uuid: 'text', label: '文字', icon: 'text', child: [{
            id: 'recovered', uuid: 'recovered', label: 'Recovery component', icon: 'text',
            content: { type: 'text', body: '<p>Recovered library content</p>' },
          }] }],
        }] });
    });
    await page.goto('/me/login/callback?code=test-code&state=test-state');
    await expect(page).toHaveURL(/\/builder\/page-list$/);
    await page.locator('app-builder-sidebar a.menu-trigger[href="/builder/hub"]').click();
    await expect(page.locator('app-hub')).toBeVisible();
    const destination = view === 'manager' ? '/builder/node/uiux' : '/builder/settings';
    await page.locator(`app-hub a[href="${destination}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${destination}$`));

    const manager = page.locator('app-node-uiux');
    const picker = page.locator('app-widget-picker');
    const openPicker = async () => {
      const canvas = page.getByRole('group', { name: '画布组件 1', exact: true });
      await canvas.hover();
      await canvas.locator('.add-new-section button.new-widget').click();
      await page.getByRole('menuitem', { name: '选择组件', exact: true }).click();
      await expect(picker).toBeVisible();
    };
    const leaveManager = async () => {
      await page.locator('app-builder-sidebar a.menu-trigger[href="/builder/hub"]').click();
      await expect(page.locator('app-hub')).toBeVisible();
    };
    const enterManager = async () => {
      await page.locator('app-hub a[href="/builder/node/uiux"]').click();
      await expect(manager).toBeVisible();
    };
    if (view === 'picker') await openPicker();
    else await expect(manager).toBeVisible();
    await expect.poll(() => reads).toBe(1);
    // The picker also opens the library sidebar; fail their shared in-flight read together.
    await failedRead!.fulfill({ status: 503, json: { error: 'Synthetic library failure' } });
    const consumer = view === 'manager' ? manager : picker;
    await expect(consumer.locator(view === 'manager' ? '.state' : '[role="status"]'))
      .toBeVisible();
    await page.screenshot({ path: testInfo.outputPath('failed.png') });

    if (view === 'manager') await leaveManager();
    else {
      await page.locator('.right-drawer .right-header app-btn').click();
      await expect(picker).toHaveCount(0);
    }
    failed = false;
    if (view === 'manager') await enterManager();
    else await openPicker();
    await expect(consumer.getByText('Recovery component', { exact: true })).toBeVisible();
    expect(reads).toBe(2);
    expect(errors).toEqual([]);
    expect(documents).toBe(1);
    expect((await new AxeBuilder({ page }).include(view === 'manager' ? 'app-node-uiux'
      : 'app-widget-picker').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations)
      .toEqual([]);
    await page.screenshot({ path: testInfo.outputPath('recovered.png') });
    if (view === 'manager') {
      await leaveManager();
      await enterManager();
    } else {
      await page.locator('.right-drawer .right-header app-btn').click();
      await expect(picker).toHaveCount(0);
      await openPicker();
    }
    await expect(consumer.getByText('Recovery component', { exact: true })).toBeVisible();
    expect(reads).toBe(2);
    expect(documents).toBe(1);
  });
}
