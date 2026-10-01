import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { HttpHeaders, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { API_URL } from '@core/token/token-providers';
import { filter, switchMap, take } from 'rxjs/operators';

/** Optional modules register only their cookie-authenticated write paths. */
export const CMS_CSRF_ADDITIONAL_PATHS = new InjectionToken<readonly RegExp[]>(
  'CMS CSRF additional paths',
  { providedIn: 'root', factory: () => [] }
);

const PAGE_WRITE_PATHS = [
  /^\/api\/v3\/landingPage\/(builder|update|alias|translations|drafts)(?:\/|$)/,
  /^\/api\/v3\/node\/translations\/add\//,
];

/** Pair a browser write with a token from the same CMS session. */
export const cmsCsrfInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    !isPlatformBrowser(inject(PLATFORM_ID)) ||
    ['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(req.method) ||
    req.headers.has('X-CSRF-Token')
  ) {
    return next(req);
  }

  const document = inject(DOCUMENT);
  const apiUrl = inject(API_URL);
  const additionalPaths = inject(CMS_CSRF_ADDITIONAL_PATHS);
  const pageOrigin = document.location.origin;
  const target = new URL(req.url, document.baseURI);
  const backend = new URL(apiUrl, document.baseURI);
  const backendPath = backend.pathname.replace(/\/$/, '');
  let basePath: string;
  if (target.origin === backend.origin && target.pathname.startsWith(`${backendPath}/`)) {
    basePath = backendPath;
  } else if (target.origin === pageOrigin) {
    // Relative CMS paths go through the frontend's same-origin proxy.
    basePath = '';
  } else {
    return next(req);
  }

  const path = target.pathname.slice(basePath.length)
    .replace(/^\/[a-z][a-z0-9-]*\/(?=api\/v3\/)/i, '/');
  if (![...PAGE_WRITE_PATHS, ...additionalPaths].some(pattern => pattern.test(path))) {
    return next(req);
  }

  // Match FetchBackend's credentials precedence. Pure cross-origin Bearer
  // requests cannot carry the Drupal session and do not need a CSRF token.
  const credentials = req.withCredentials ? 'include' : (req.credentials ?? 'same-origin');
  if (credentials === 'omit' || (credentials === 'same-origin' && target.origin !== pageOrigin)) {
    return next(req);
  }

  // Use the public token endpoint with the same cookie policy. Do not cache a
  // session token across login/logout, forward write headers, or replay writes.
  const tokenRequest = new HttpRequest('GET', `${target.origin}${basePath}/session/token`, {
    responseType: 'text',
    headers: new HttpHeaders({ Accept: 'text/plain' }),
    withCredentials: req.withCredentials,
    credentials: req.withCredentials ? undefined : credentials,
    cache: 'no-store',
    redirect: 'error',
    transferCache: false,
  });
  return next(tokenRequest).pipe(
    filter((event): event is HttpResponse<string> => event instanceof HttpResponse),
    take(1),
    switchMap(response => {
      const token = response.body?.trim();
      if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) {
        throw new Error('Invalid CMS CSRF token response');
      }
      return next(req.clone({ setHeaders: { 'X-CSRF-Token': token } }));
    })
  );
};
