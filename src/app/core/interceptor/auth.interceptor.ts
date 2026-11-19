import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from '@core/service/user.service';
import { IUser } from '@core/interface/IUser';
import { environment } from 'src/environments/environment';
import {
  captureTokenSession,
  isTokenSessionCurrent,
  refreshSessionToken,
  TokenSession,
} from '@core/util/token-refresh';

const PROACTIVE_REFRESH_LEEWAY_MS = 30 * 1000;
const ANONYMOUS_PATHS = ['/api/v3/otp/generate', '/api/v3/otp/login'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);

  if (req.url.includes(environment.oauth.tokenUrl)) {
    return next(req);
  }

  if (ANONYMOUS_PATHS.some(path => req.url.includes(path))) {
    return next(req);
  }

  const storedUser = userService.getStoredUser();
  const session = captureTokenSession(storedUser);

  if (req.headers.has('Authorization')) {
    if (!session || req.headers.get('Authorization') !== `Bearer ${session.accessToken}`) {
      return next(req);
    }
    return next(req).pipe(
      catchError(error => handleError(error, req, next, userService, session))
    );
  }

  if (!storedUser?.access_token || !session) {
    return next(req);
  }

  // SSR: never refresh; render anonymously when token already expired.
  if (!userService.isBrowser) {
    if (isExpired(storedUser)) {
      return next(req);
    }
    return next(addToken(req, storedUser.access_token));
  }

  if (shouldProactivelyRefresh(storedUser)) {
    return refreshAndRetry(req, next, userService, session);
  }

  const authReq = addToken(req, storedUser.access_token);
  return next(authReq).pipe(
    catchError(error => handleError(error, req, next, userService, session))
  );
};

function isExpired(user: IUser): boolean {
  return !!user.expires_at && Date.now() >= user.expires_at;
}

function shouldProactivelyRefresh(user: IUser): boolean {
  if (!user.expires_at || !user.refresh_token) {
    return false;
  }
  return Date.now() >= user.expires_at - PROACTIVE_REFRESH_LEEWAY_MS;
}

function addToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handleError(
  error: HttpErrorResponse,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  userService: UserService,
  session: TokenSession
): Observable<HttpEvent<unknown>> {
  if (error.status === 401 && req.url.includes(environment.apiUrl) && userService.isBrowser) {
    if (session.refreshToken && isTokenSessionCurrent(userService, session)) {
      return refreshAndRetry(req, next, userService, session);
    }
  }
  return throwError(() => error);
}

function refreshAndRetry(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  userService: UserService,
  session: TokenSession
): Observable<HttpEvent<unknown>> {
  return refreshSessionToken(userService, session).pipe(
    switchMap(token => next(addToken(req, token)))
  );
}
