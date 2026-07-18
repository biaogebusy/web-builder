import { getAuthCookieName, getSsrCacheDecision } from './ssr-cache-policy';

describe('SSR cache policy', () => {
  function decide(
    originalUrl: string,
    options: { headers?: Record<string, string>; method?: string } = {}
  ) {
    return getSsrCacheDecision(
      {
        headers: options.headers ?? {},
        method: options.method ?? 'GET',
        originalUrl,
      },
      { authCookieNames: ['builderDesign'] }
    );
  }

  it('caches a public GET request', () => {
    expect(decide('/article/example')).toEqual({
      cacheable: true,
      key: '/article/example',
      reason: 'public-get',
    });
  });

  it('normalizes allowed query parameters and ignores tracking parameters', () => {
    expect(decide('/article?version=2&utm_source=test&version=1')).toEqual({
      cacheable: true,
      key: '/article?version=1&version=2',
      reason: 'public-get',
    });
  });

  it('bypasses preview and nocache requests', () => {
    expect(decide('/article?preview=true')).toMatchObject({
      cacheable: false,
      reason: 'query:preview',
    });
    expect(decide('/article?nocache=1')).toMatchObject({
      cacheable: false,
      reason: 'query:nocache',
    });
  });

  it('bypasses unknown content-affecting query parameters', () => {
    expect(decide('/search?keywords=angular')).toMatchObject({
      cacheable: false,
      reason: 'unknown-query:keywords',
    });
  });

  it('bypasses authorization and session cookies', () => {
    expect(decide('/account', { headers: { authorization: 'Bearer token' } })).toMatchObject({
      cacheable: false,
      reason: 'authorization',
    });
    expect(decide('/account', { headers: { cookie: 'builderDesign=encrypted' } })).toMatchObject({
      cacheable: false,
      reason: 'session-cookie',
    });
    expect(decide('/account', { headers: { cookie: 'SSESS123=session' } })).toMatchObject({
      cacheable: false,
      reason: 'session-cookie',
    });
  });

  it('does not cache non-GET requests', () => {
    expect(decide('/article', { method: 'POST' })).toMatchObject({
      cacheable: false,
      reason: 'method',
    });
  });

  it('derives the authentication cookie name from the API URL', () => {
    expect(getAuthCookieName('https://builder.design')).toBe('builderDesign');
    expect(getAuthCookieName('http://localhost:4200')).toBe('localhost4200');
  });
});
