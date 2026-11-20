import { test, expect } from './fixtures/test';
import { mockLoginNavigation, submitLogin } from './fixtures/login-navigation';

test('returns an anonymous profile viewer to login without listing users', async ({ page }) => {
  await mockLoginNavigation(page, '/me');
  const profileReads: string[] = [];
  await page.route('**/api/v1/user/user*', route => {
    profileReads.push(route.request().url());
    return route.fulfill({ json: { data: [] } });
  });

  await page.goto('/me');

  await expect(page).toHaveURL(/\/me\/login$/);
  await expect(page.locator('app-login')).toBeVisible();
  expect(profileReads).toEqual([]);
});

test('reads the signed-in profile using its authenticated UID', async ({ page }) => {
  await mockLoginNavigation(page, '/me');
  const requestedUids: (string | null)[] = [];
  await page.route('**/api/v1/user/user*', route => {
    requestedUids.push(new URL(route.request().url()).searchParams.get('filter[drupal_internal__uid]'));
    return route.fulfill({
      json: {
        data: [{
          id: 'login-test-user',
          name: 'profile-owner',
          display_name: 'Profile owner',
          roles: [{ meta: { drupal_internal__target_id: 'authenticated' } }],
        }],
      },
    });
  });

  await page.goto('/me/login');
  await submitLogin(page);
  await expect(page).toHaveURL(/\/home$/);
  await page.goto('/me');

  await expect(page.locator('app-user .username')).toHaveText('profile-owner');
  expect(requestedUids.length).toBeGreaterThan(0);
  expect(requestedUids.every(uid => uid === '7')).toBe(true);
});
