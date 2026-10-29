import type { Locator, Page } from '@playwright/test';

/** Synthetic login endpoints shared by public-page and deployment-specific navigation tests. */
export async function mockLoginNavigation(
  page: Page,
  target: string,
  options: { theme?: string; builderGuard?: boolean } = {}
) {
  const destination = new URL(target, 'http://localhost');
  const token = { access_token: 'login-navigation-token', refresh_token: 'login-navigation-refresh',
    token_type: 'Bearer', expires_in: 3600 };
  await page.context().route('**/api/**', route => {
    const url = new URL(route.request().url());
    const content = url.searchParams.get('content');
    let json: object = { data: [], rows: [], pager: { total_items: 0 } };
    if (url.pathname.endsWith('/otp/login')) json = token;
    else if (url.pathname.endsWith('/accountProfile')) {
      json = { uid: 7, name: 'login-test', roles: ['authenticated'] };
    } else if (url.pathname.endsWith('/api/v1/user/user')) {
      json = { data: [{ id: 'login-test-user', display_name: 'Login test',
        login: '2026-10-30T00:00:00Z',
        roles: [{ meta: { drupal_internal__target_id: 'authenticated' } }] }] };
    } else if (content === '/core/base') {
      json = { defaultTheme: options.theme || 'light-theme', librariesUseLocal: true,
        builder: { guard: options.builderGuard ?? true },
        login: { loginRedirect: '/home', oauthLogin: { enable: true, submitLabel: '账户登录' },
          phoneLogin: { enable: true } } };
    } else if (content === '/core/branding') {
      json = { header: { params: { themeSwitch: false, userInfo: false }, mainMenu: [],
        search: { enable: false }, actions: [] },
      footer: { params: { mode: 'light' }, logo: { label: 'Login test' }, mainMenu: [] } };
    } else if (content === '/core/builder') {
      json = { menu: [], tour: { enable: false } };
    } else if (url.pathname.endsWith('/landingPage')) {
      json = { title: 'Login navigation', publicPageKey: 'node:1:zh-hans:1',
        body: [{ type: 'link', label: '受保护入口',
        href: destination.pathname, queryParams: Object.fromEntries(destination.searchParams),
        fragment: destination.hash.slice(1) }] };
    }
    return route.fulfill({ json });
  });
  await page.context().route('**/oauth/token', route => route.fulfill({ json: token }));
}

/** Complete the existing SMS form against the synthetic authentication endpoint. */
export async function submitLogin(page: Page | Locator) {
  const form = page.locator('app-login .phone-form');
  await form.locator('[formControlName="phone"]').fill('13800138000');
  await form.locator('[formControlName="code"]').fill('123456');
  await form.locator('button[type="submit"]').click();
}
