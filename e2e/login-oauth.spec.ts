import { expect, test, type Page } from '@playwright/test';

// The chain these specs guard is the one unit tests structurally cannot reach: it spans a real
// browser navigation, sessionStorage that has to survive it, and a single-use authorization code.
// Every backend call is stubbed, so the suite needs no CMS — only /assets/i18n is served locally by
// the dev server (it is not in the proxy list), which is what keeps the localized copy assertions
// meaningful.

/** Mirrors UserService.pkceStorageKey. */
const PKCE_KEY = 'xinshi-oauth-pkce';

interface PkceStash {
  verifier: string;
  state: string;
  mode: 'redirect' | 'popup';
  returnUrl: string;
}

/** Writes the stash before app code runs, standing in for an authorize request already in flight. */
async function seedStash(page: Page, stash: PkceStash): Promise<void> {
  await page.addInitScript(
    ([key, value]) => window.sessionStorage.setItem(key, value),
    [PKCE_KEY, JSON.stringify(stash)] as const
  );
}

async function readStash(page: Page): Promise<PkceStash | null> {
  const raw = await page.evaluate(key => window.sessionStorage.getItem(key), PKCE_KEY);
  return raw ? (JSON.parse(raw) as PkceStash) : null;
}

/**
 * The page boots through the landing-page endpoint with `content=/core/base` — a query parameter,
 * not a path segment (see ContentService.getLandingPageUrl). An empty answer would leave login
 * config undefined and the recovery buttons pointing nowhere, so the fixture pins loginRedirect.
 */
async function stubCoreConfig(page: Page): Promise<void> {
  await page.route(
    url => url.pathname.endsWith('/api/v3/landingPage'),
    route => {
      if (new URL(route.request().url()).searchParams.get('content') !== '/core/base') {
        return route.fulfill({ json: {} });
      }
      return route.fulfill({
        json: {
          defaultTheme: 'light-theme',
          login: {
            loginRedirect: '/home',
            oauthLogin: { enable: true, submitLabel: '' },
            phoneLogin: { enable: false },
          },
        },
      });
    }
  );
}

/**
 * Captures authorize hand-offs. Aborting rather than fulfilling matters: fulfilling would commit a
 * new document, and `addInitScript` re-runs on every document — it would write the stale stash back
 * over the fresh one the retry just created. An aborted navigation leaves the tab where it is.
 */
async function captureAuthorize(page: Page): Promise<URL[]> {
  const seen: URL[] = [];
  await page.route('**/oauth/authorize*', async route => {
    seen.push(new URL(route.request().url()));
    await route.abort();
  });
  return seen;
}

test.beforeEach(async ({ page }) => {
  await stubCoreConfig(page);
});

test.describe('OAuth callback', () => {
  test('explains an incomplete callback URL in the user language', async ({ page }) => {
    await page.goto('/me/login/callback');

    // Copy, not a raw key: proves the callback screen is wired to the translation loader. Before
    // this was localized the page rendered internal English like "Missing code or state".
    await expect(page.getByRole('alert')).toContainText('登录链接不完整');
    await expect(page.getByRole('button', { name: '重新登录' })).toBeVisible();
    await expect(page.getByRole('button', { name: '返回登录页' })).toBeVisible();
  });

  test('retry starts a brand-new authorize request instead of replaying the spent code', async ({
    page,
  }) => {
    const authorizeRequests = await captureAuthorize(page);
    const staleState = 'stale-state-from-the-failed-attempt';
    await seedStash(page, {
      verifier: 'stale-verifier',
      state: staleState,
      mode: 'redirect',
      returnUrl: '/builder',
    });

    // A state that does not match the stash: the shape of a callback that cannot be completed.
    await page.goto(`/me/login/callback?code=already-used-code&state=${staleState}-mismatch`);
    await expect(page.getByRole('alert')).toContainText('登录校验未通过');

    await page.getByRole('button', { name: '重新登录' }).click();
    await expect.poll(() => authorizeRequests.length).toBe(1);

    const params = authorizeRequests[0].searchParams;
    expect(params.get('response_type')).toBe('code');
    expect(params.get('code_challenge_method')).toBe('S256');
    expect(params.get('code_challenge')).toBeTruthy();
    // The old code was single-use and is already spent, so replaying the old challenge would fail
    // identically every time. Only a fresh one can recover.
    expect(params.get('state')).not.toBe(staleState);
    expect(await readStash(page)).toMatchObject({ state: params.get('state') });
  });

  test('retry heads back to the page the failed attempt was aimed at', async ({ page }) => {
    const authorizeRequests = await captureAuthorize(page);
    await seedStash(page, {
      verifier: 'v',
      state: 'state-a',
      mode: 'redirect',
      returnUrl: '/builder',
    });

    await page.goto('/me/login/callback?code=c&state=state-b');
    await page.getByRole('button', { name: '重新登录' }).click();
    await expect.poll(() => authorizeRequests.length).toBe(1);

    // returnUrl has to survive the failure, or a retry silently relocates the user.
    expect(await readStash(page)).toMatchObject({ returnUrl: '/builder' });
  });

  test('keeps the PKCE stash after a failure so recovery is still possible', async ({ page }) => {
    await seedStash(page, {
      verifier: 'v',
      state: 'state-a',
      mode: 'redirect',
      returnUrl: '/builder',
    });

    await page.goto('/me/login/callback?code=c&state=state-b');
    await expect(page.getByRole('alert')).toBeVisible();

    // Dropping the stash on failure used to make every recovery attempt die with
    // "Missing PKCE session" — the retry button could never work twice.
    expect(await readStash(page)).not.toBeNull();
  });

  test('sends a user with no attempt in flight to the app login route', async ({ page }) => {
    await page.goto('/me/login/callback');

    await page.getByRole('button', { name: '返回登录页' }).click();

    // /me/login, not the CMS /user/login: the old handler fell through to the ** catch-all.
    await expect(page).toHaveURL(/\/me\/login$/);
  });

  test('lands on the returnUrl the authorize request started from', async ({ page }) => {
    await page.route('**/oauth/token', route =>
      route.fulfill({
        json: {
          access_token: 'stub-access-token',
          refresh_token: 'stub-refresh-token',
          token_type: 'Bearer',
          expires_in: 3600,
        },
      })
    );
    await page.route('**/api/v3/accountProfile*', route =>
      route.fulfill({ json: { uid: 7, name: 'e2e-user', roles: ['authenticated'] } })
    );
    await page.route('**/api/v1/user/user*', route =>
      route.fulfill({
        json: {
          data: [
            {
              id: 'uuid-7',
              display_name: 'e2e-user',
              mail: 'e2e@example.com',
              login: '2026-01-01T00:00:00+00:00',
              roles: [{ meta: { drupal_internal__target_id: 'authenticated' } }],
            },
          ],
        },
      })
    );

    // A real route under /me, so the assertion does not depend on the ** catch-all fetching a page.
    await seedStash(page, {
      verifier: 'matching-verifier',
      state: 'matching-state',
      mode: 'redirect',
      returnUrl: '/me',
    });

    await page.goto('/me/login/callback?code=fresh-code&state=matching-state');

    // waitForURL resolves on the first match: UserComponent redirects to /me/login when it sees no
    // user, so an assertion that polled the current URL could catch that later state instead.
    await page.waitForURL(/\/me$/);
    // Cleared only once the login completed, which is what lets the failure paths above retry.
    expect(await readStash(page)).toBeNull();
  });
});
