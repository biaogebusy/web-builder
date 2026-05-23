const VERIFIER_BYTES = 48;
const STATE_BYTES = 16;

function isBrowserCryptoAvailable(): boolean {
  return typeof window !== 'undefined' && !!window.crypto?.subtle;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function generateRandomString(byteLength: number): string {
  if (!isBrowserCryptoAvailable()) {
    throw new Error('Web Crypto API not available');
  }
  const bytes = new Uint8Array(byteLength);
  window.crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

export function generateCodeVerifier(): string {
  return generateRandomString(VERIFIER_BYTES);
}

export function generateState(): string {
  return generateRandomString(STATE_BYTES);
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  if (!isBrowserCryptoAvailable()) {
    throw new Error('Web Crypto API not available');
  }
  const data = new TextEncoder().encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(digest));
}
