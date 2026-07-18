import type { IncomingHttpHeaders } from 'node:http';

const CACHE_KEY_QUERY_PARAMS = new Set(['version']);
const CACHE_BYPASS_QUERY_PARAMS = new Set(['nocache', 'preview']);
const IGNORED_QUERY_PARAMS = new Set(['fbclid', 'gclid']);
const SESSION_COOKIE_PATTERNS = [/^sess/i, /^ssess/i, /^connect\.sid$/i, /^session(id)?$/i];

export interface SsrCacheRequest {
  headers: IncomingHttpHeaders;
  method: string;
  originalUrl: string;
}

export interface SsrCachePolicyOptions {
  authCookieNames?: string[];
}

export type SsrCacheDecision =
  | { cacheable: true; key: string; reason: 'public-get' }
  | { cacheable: false; reason: string };

export function getSsrCacheDecision(
  request: SsrCacheRequest,
  options: SsrCachePolicyOptions = {}
): SsrCacheDecision {
  if (request.method !== 'GET') {
    return { cacheable: false, reason: 'method' };
  }

  if (request.headers.authorization) {
    return { cacheable: false, reason: 'authorization' };
  }

  if (hasSessionCookie(request.headers.cookie, options.authCookieNames ?? [])) {
    return { cacheable: false, reason: 'session-cookie' };
  }

  const url = new URL(request.originalUrl, 'http://ssr.local');
  const cacheParams = new Map<string, string[]>();

  for (const [rawKey, value] of url.searchParams) {
    const key = rawKey.toLowerCase();

    if (CACHE_BYPASS_QUERY_PARAMS.has(key)) {
      return { cacheable: false, reason: `query:${key}` };
    }

    if (IGNORED_QUERY_PARAMS.has(key) || key.startsWith('utm_')) {
      continue;
    }

    if (!CACHE_KEY_QUERY_PARAMS.has(key)) {
      return { cacheable: false, reason: `unknown-query:${key}` };
    }

    const values = cacheParams.get(key) ?? [];
    values.push(value);
    cacheParams.set(key, values);
  }

  const normalizedParams = new URLSearchParams();
  [...cacheParams.keys()].sort().forEach(key => {
    cacheParams
      .get(key)!
      .sort()
      .forEach(value => normalizedParams.append(key, value));
  });

  const query = normalizedParams.toString();
  return {
    cacheable: true,
    key: query ? `${url.pathname}?${query}` : url.pathname,
    reason: 'public-get',
  };
}

export function getAuthCookieName(apiUrl: string): string | undefined {
  try {
    const hostname = new URL(apiUrl).host;
    return hostname
      .split(/[^a-zA-Z0-9]+/)
      .filter(Boolean)
      .map((part, index) =>
        index === 0 ? part.toLowerCase() : `${part[0].toUpperCase()}${part.slice(1).toLowerCase()}`
      )
      .join('');
  } catch {
    return undefined;
  }
}

function hasSessionCookie(cookieHeader: string | undefined, authCookieNames: string[]): boolean {
  if (!cookieHeader) {
    return false;
  }

  const authCookies = new Set(authCookieNames.map(name => name.toLowerCase()));
  return cookieHeader.split(';').some(cookie => {
    const separator = cookie.indexOf('=');
    const name = (separator >= 0 ? cookie.slice(0, separator) : cookie).trim();
    return (
      authCookies.has(name.toLowerCase()) ||
      SESSION_COOKIE_PATTERNS.some(pattern => pattern.test(name))
    );
  });
}
