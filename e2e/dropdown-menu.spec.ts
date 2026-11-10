import AxeBuilder from '@axe-core/playwright';
import { mockLoginNavigation } from './fixtures/login-navigation';
import { expect, test } from './fixtures/test';

for (const mode of ['text', 'raised', 'stroked', 'flat', 'icon', 'fab', 'mini-fab']) {
  test(`dropdown menu restores native button focus and exposes its state: ${mode}`, async ({
    page,
    context,
  }) => {
    await mockLoginNavigation(page, '/home');
    await context.route('**/api/v3/landingPage*', route => {
      if (new URL(route.request().url()).searchParams.get('content')?.startsWith('/core/')) {
        return route.fallback();
      }
      return route.fulfill({
        json: {
          title: 'Menu focus regression',
          publicPageKey: 'node:1:zh-hans:1',
          body: [
            {
              type: 'dropdown-menu',
              btn: { mode, label: 'Menu actions', icon: { svg: 'dots-vertical' } },
              child: [{ label: 'First action' }, { label: 'Second action' }],
            },
            { type: 'btn', label: 'After menu' },
          ],
        },
      });
    });
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Menu actions', exact: true });
    await expect(trigger).toBeVisible();
    for (const key of ['Enter', 'Space']) {
      await trigger.focus();
      await trigger.press(key);
      const menu = page.getByRole('menu');
      await expect(menu).toBeVisible();
      await expect(menu.getByRole('menuitem').first()).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(menu).toBeHidden();
      await expect(trigger).toBeFocused();
      await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await trigger.press('Tab');
      await expect(page.getByRole('button', { name: 'After menu', exact: true })).toBeFocused();
    }
    await expect(page.getByRole('button', { name: 'After menu', exact: true })).not.toHaveAttribute(
      'aria-expanded'
    );
    await trigger.click();
    const menu = page.getByRole('menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(trigger).toHaveAttribute('aria-controls', (await menu.getAttribute('id'))!);
    await menu.getByRole('menuitem').last().click();
    await expect(menu).toBeHidden();
    await expect(trigger).toBeFocused();
    expect(
      (await new AxeBuilder({ page }).include('app-dropdown-menu').analyze()).violations
    ).toEqual([]);
  });
}
