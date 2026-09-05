import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateRandomString,
  generateState,
} from '@core/util/pkce.util';

// A real SHA-256 of "test-verifier" (32 bytes, base64url-encoded):
// echo -n "test-verifier" | sha256sum → 31a5ad...  but we just check shape + consistency.

describe('pkce util', () => {
  describe('generateRandomString', () => {
    it('produces a base64url string of the right approximate length', () => {
      const s = generateRandomString(32);
      // 32 bytes → 44 base64 chars, minus padding → ~43
      expect(s.length).toBeGreaterThanOrEqual(40);
      expect(s.length).toBeLessThanOrEqual(45);
      // base64url charset: A-Z, a-z, 0-9, -, _
      expect(s).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    it('never contains +, /, or = padding', () => {
      for (let i = 0; i < 20; i++) {
        const s = generateRandomString(48);
        expect(s).not.toMatch(/[+/=]/);
      }
    });

    it('throws when Web Crypto is not available', () => {
      const orig = (globalThis as unknown as { crypto?: Crypto }).crypto;
      Object.defineProperty(globalThis, 'crypto', {
        value: undefined,
        writable: true,
        configurable: true,
      });

      expect(() => generateRandomString(16)).toThrow('Web Crypto API not available');

      Object.defineProperty(globalThis, 'crypto', {
        value: orig,
        writable: true,
        configurable: true,
      });
    });

    it('generates unique values each call', () => {
      const values = new Set();
      for (let i = 0; i < 100; i++) {
        values.add(generateRandomString(16));
      }
      expect(values.size).toBe(100);
    });

    it('uses the requested byte count', () => {
      // Each 3 bytes → 4 base64 chars; 16 bytes → 22 chars (no padding)
      const s16 = generateRandomString(16);
      expect(s16.length).toBe(22);
      const s32 = generateRandomString(32);
      expect(s32.length).toBe(43); // 32 bytes = 256 bits → 43 base64url chars
    });
  });

  describe('generateCodeVerifier', () => {
    it('returns a 48-byte random string (64 chars in base64url)', () => {
      const v = generateCodeVerifier();
      // 48 bytes → 64 base64url chars exactly
      expect(v.length).toBe(64);
      expect(v).toMatch(/^[A-Za-z0-9_-]+$/);
    });
  });

  describe('generateState', () => {
    it('returns a 16-byte random string', () => {
      const s = generateState();
      expect(s.length).toBe(22); // 16 bytes → 22 base64url chars
      expect(s).toMatch(/^[A-Za-z0-9_-]+$/);
    });
  });

  describe('generateCodeChallenge', () => {
    it('produces a base64url SHA-256 digest', async () => {
      const verifier = 'test-verifier-string';
      const challenge = await generateCodeChallenge(verifier);

      expect(challenge).toMatch(/^[A-Za-z0-9_-]+$/);
      expect(challenge).not.toMatch(/[+/=]/);
      // SHA-256 is 32 bytes → 43 base64url chars
      expect(challenge.length).toBe(43);
    });

    it('is deterministic for the same verifier', async () => {
      const v = 'same-verifier';
      expect(await generateCodeChallenge(v)).toBe(await generateCodeChallenge(v));
    });

    it('produces different challenges for different verifiers', async () => {
      const a = await generateCodeChallenge('verifier-a');
      const b = await generateCodeChallenge('verifier-b');
      expect(a).not.toBe(b);
    });

    it('round-trips: verifier → challenge matches the real SHA-256', async () => {
      const verifier = 'abc123';
      const challenge = await generateCodeChallenge(verifier);

      // Independent verification via Web Crypto
      const data = new TextEncoder().encode(verifier);
      const digest = await crypto.subtle.digest('SHA-256', data);
      const bytes = new Uint8Array(digest);
      let binary = '';
      for (const byte of bytes) {
        binary += String.fromCharCode(byte);
      }
      const expected = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      expect(challenge).toBe(expected);
    });
  });
});
