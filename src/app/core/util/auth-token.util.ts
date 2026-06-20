import { intersection } from 'lodash-es';
import type { IUser, OAuthTokenResponse } from '@core/interface/IUser';

export function getJwtExpirationTime(accessToken?: string): number | null {
  if (!accessToken) {
    return null;
  }
  try {
    const payload = accessToken.split('.')[1];
    if (!payload) {
      return null;
    }
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(normalized));
    const exp = Number(decoded?.exp);
    return Number.isFinite(exp) ? exp * 1000 : null;
  } catch {
    return null;
  }
}

export function getTokenExpirationTime(tokenData: Pick<OAuthTokenResponse, 'access_token' | 'expires_in'>): number {
  const expiresAt = getJwtExpirationTime(tokenData?.access_token);
  return expiresAt ?? Date.now() + Number(tokenData?.expires_in || 0) * 1000;
}

export function isTokenExpired(user: IUser): boolean {
  return !user.expires_at || Date.now() >= user.expires_at;
}

export function parseServerCookie(header: string, name: string): string | null {
  const pairs = header.split(/;\s*/);
  for (const pair of pairs) {
    const idx = pair.indexOf('=');
    if (idx < 0) {
      continue;
    }
    if (pair.slice(0, idx) === name) {
      try {
        return decodeURIComponent(pair.slice(idx + 1));
      } catch {
        return pair.slice(idx + 1);
      }
    }
  }
  return null;
}

export function getCookieExpirationDate(seconds: number): Date {
  return new Date(Date.now() + seconds * 1000);
}

export function isMatchCurrentRole(roles: string[], currentUserRoles: string[]): boolean {
  return intersection(currentUserRoles, roles).length > 0;
}
