import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, PLATFORM_ID } from '@angular/core';
import { HttpHeaders, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { CMS_CSRF_PROTECTION } from '@core/config/cms-http-context';
import { API_URL } from '@core/token/token-providers';
import { filter, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

/** Isolates CMS Bearer credentials and protects JSON:API or declared custom session writes. */
export const cmsCsrfInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isPlatformBrowser(inject(PLATFORM_ID))) {
    return next(req);
  }

  const document = inject(DOCUMENT);
  const apiUrl = inject(API_URL);
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

  let path = target.pathname.slice(basePath.length);
  const prefix = path.split('/')[1];
  if (environment.multiLang && environment.langs?.some(lang => lang.langCode === prefix)) {
    path = path.slice(prefix.length + 1);
  }
  const version = path.match(/^\/api\/v([123])(?:\/|$)/)?.[1];
  if (!version || req.headers.has('X-CSRF-Token')) {
    return next(req);
  }

  // Bearer requests do not need a Drupal session. Omit implicit cookies at the
  // browser so this also works without a proxy stripping them. Explicit cookie
  // credentials and caller-supplied CSRF tokens retain their session behavior.
  if (
    /^Bearer\s+\S+$/i.test(req.headers.get('Authorization') ?? '') &&
    !req.withCredentials && req.credentials === undefined
  ) {
    return next(req.clone({ credentials: 'omit' }));
  }

  if (
    ['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(req.method) ||
    (version !== '1' && !(version === '3' && req.context.get(CMS_CSRF_PROTECTION)))
  ) {
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
