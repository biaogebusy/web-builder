import {
  getCookieExpirationDate,
  getJwtExpirationTime,
  getTokenExpirationTime,
  isMatchCurrentRole,
  isTokenExpired,
  parseServerCookie,
} from '@core/util/auth-token.util';

/** Build a valid JWT with a custom payload (header is fixed, signature is junk). */
function makeJwt(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload)).replace(/=+$/, '');
  return `${header}.${body}.fakesig`;
}

describe('auth-token util', () => {
  describe('getJwtExpirationTime', () => {
    it('returns null for an empty / falsy token', () => {
      expect(getJwtExpirationTime()).toBeNull();
      expect(getJwtExpirationTime('')).toBeNull();
      expect(getJwtExpirationTime(null as never)).toBeNull();
    });

    it('returns null for a malformed token with no dots', () => {
      expect(getJwtExpirationTime('not-a-jwt')).toBeNull();
    });

    it('returns null when the payload segment is missing', () => {
      expect(getJwtExpirationTime('headeronly.')).toBeNull();
    });

    it('returns null when the payload is not valid base64', () => {
      expect(getJwtExpirationTime('a.!!!.c')).toBeNull();
    });

    it('returns null when the payload is not valid JSON', () => {
      const badPayload = btoa('not-json');
      expect(getJwtExpirationTime(`a.${badPayload}.c`)).toBeNull();
    });

    it('returns null when exp is missing', () => {
      expect(getJwtExpirationTime(makeJwt({ sub: '1' }))).toBeNull();
    });

    it('returns null when exp is not a number', () => {
      expect(getJwtExpirationTime(makeJwt({ exp: 'soon' }))).toBeNull();
    });

    it('returns the exp timestamp in milliseconds', () => {
      const exp = 1700000000;
      expect(getJwtExpirationTime(makeJwt({ exp }))).toBe(exp * 1000);
    });

    it('handles url-safe base64 (JWT standard)', () => {
      // Build a payload whose base64 contains + or /, then swap to base64url
      const payload = { exp: 1700000000, data: '///+++' };
      const token = makeJwt(payload).replace(/\+/g, '-').replace(/\//g, '_');
      expect(getJwtExpirationTime(token)).toBe(1700000000 * 1000);
    });
  });

  describe('getTokenExpirationTime', () => {
    it('uses the JWT exp when the access token is parseable', () => {
      const exp = 1800000000;
      const token = makeJwt({ exp });
      const result = getTokenExpirationTime({ access_token: token, expires_in: 3600 });
      expect(result).toBe(exp * 1000);
    });

    it('falls back to expires_in when the token has no exp claim', () => {
      const before = Date.now();
      const result = getTokenExpirationTime({ access_token: makeJwt({ sub: '1' }), expires_in: 7200 });
      const after = Date.now();
      expect(result).toBeGreaterThanOrEqual(before + 7200 * 1000);
      expect(result).toBeLessThanOrEqual(after + 7200 * 1000);
    });

    it('falls back to expires_in when the access token is missing', () => {
      const before = Date.now();
      const result = getTokenExpirationTime({ access_token: undefined as never, expires_in: 60 });
      const after = Date.now();
      expect(result).toBeGreaterThanOrEqual(before + 60 * 1000);
      expect(result).toBeLessThanOrEqual(after + 60 * 1000);
    });

    it('returns a near-future timestamp when both exp and expires_in are missing', () => {
      const before = Date.now();
      const result = getTokenExpirationTime({} as never);
      const after = Date.now();
      expect(result).toBeGreaterThanOrEqual(before);
      expect(result).toBeLessThanOrEqual(after);
    });
  });

  describe('isTokenExpired', () => {
    it('returns true when there is no expires_at', () => {
      expect(isTokenExpired({ expires_at: 0 } as never)).toBe(true);
      expect(isTokenExpired({} as never)).toBe(true);
    });

    it('returns true when the token has expired', () => {
      expect(isTokenExpired({ expires_at: Date.now() - 1000 } as never)).toBe(true);
    });

    it('returns false when the token is still valid', () => {
      expect(isTokenExpired({ expires_at: Date.now() + 10000 } as never)).toBe(false);
    });

    it('returns true exactly at the expiration instant', () => {
      const now = Date.now();
      expect(isTokenExpired({ expires_at: now } as never)).toBe(true);
    });
  });

  describe('parseServerCookie', () => {
    it('extracts a simple cookie value', () => {
      expect(parseServerCookie('session=abc123; path=/', 'session')).toBe('abc123');
    });

    it('returns null when the cookie is absent', () => {
      expect(parseServerCookie('a=1; b=2', 'c')).toBeNull();
    });

    it('handles URL-encoded values', () => {
      expect(parseServerCookie('name=hello%20world', 'name')).toBe('hello world');
    });

    it('returns the raw value when URL decoding fails', () => {
      expect(parseServerCookie('bad=%E0%A4%A', 'bad')).toBe('%E0%A4%A');
    });

    it('skips cookie pairs without an equals sign', () => {
      expect(parseServerCookie('httponly; name=value', 'name')).toBe('value');
      expect(parseServerCookie('httponly', 'httponly')).toBeNull();
    });

    it('matches the first cookie with the given name', () => {
      expect(parseServerCookie('a=1; a=2', 'a')).toBe('1');
    });

    it('returns an empty string for an empty value', () => {
      expect(parseServerCookie('empty=', 'empty')).toBe('');
    });

    it('handles variable whitespace around the semicolons', () => {
      expect(parseServerCookie('a=1;b=2;   c=3', 'b')).toBe('2');
    });
  });

  describe('getCookieExpirationDate', () => {
    it('returns a date seconds in the future', () => {
      const before = new Date(Date.now() + 60 * 1000);
      const result = getCookieExpirationDate(60);
      const after = new Date(Date.now() + 60 * 1000);
      expect(result.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(result.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('returns a past date for negative seconds', () => {
      expect(getCookieExpirationDate(-100).getTime()).toBeLessThan(Date.now());
    });
  });

  describe('isMatchCurrentRole', () => {
    it('returns true when the user has at least one required role', () => {
      expect(isMatchCurrentRole(['admin', 'editor'], ['admin'])).toBe(true);
      expect(isMatchCurrentRole(['admin'], ['admin', 'user'])).toBe(true);
    });

    it('returns false when there is no role overlap', () => {
      expect(isMatchCurrentRole(['admin'], ['anonymous'])).toBe(false);
    });

    it('returns false when either array is empty', () => {
      expect(isMatchCurrentRole([], ['admin'])).toBe(false);
      expect(isMatchCurrentRole(['admin'], [])).toBe(false);
      expect(isMatchCurrentRole([], [])).toBe(false);
    });
  });
});
