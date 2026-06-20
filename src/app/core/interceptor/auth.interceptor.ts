import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { UserService } from '@core/service/user.service';
import { IUser } from '@core/interface/IUser';
import { environment } from 'src/environments/environment';

const PROACTIVE_REFRESH_LEEWAY_MS = 30 * 1000;
const ANONYMOUS_PATHS = ['/api/v3/otp/generate', '/api/v3/otp/login'];

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);

  if (req.url.includes(environment.oauth.tokenUrl)) {
    return next(req);
  }

  if (ANONYMOUS_PATHS.some(path => req.url.includes(path))) {
    return next(req);
  }

  if (req.headers.has('Authorization')) {
    return next(req).pipe(catchError(error => handleError(error, req, next, userService)));
  }

  const storedUser = userService.getStoredUser();

  if (!storedUser?.access_token) {
    return next(req).pipe(catchError(error => handleError(error, req, next, userService)));
  }

  // SSR: never refresh; render anonymously when token already expired.
  if (!userService.isBrowser) {
    if (isExpired(storedUser)) {
      return next(req);
    }
    return next(addToken(req, storedUser.access_token));
  }

  if (shouldProactivelyRefresh(storedUser)) {
    return refreshAndRetry(req, next, userService);
  }

  const authReq = addToken(req, storedUser.access_token);
  return next(authReq).pipe(catchError(error => handleError(error, req, next, userService)));
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
  userService: UserService
): Observable<HttpEvent<unknown>> {
  if (error.status === 401 && req.url.includes(environment.apiUrl) && userService.isBrowser) {
    const storedUser = userService.getStoredUser();
    if (storedUser?.refresh_token) {
      return refreshAndRetry(req, next, userService);
    }
  }
  return throwError(() => error);
}

function refreshAndRetry(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  userService: UserService
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return userService.refreshAccessToken().pipe(
      switchMap(tokenData => {
        isRefreshing = false;
        if (!tokenData) {
          userService.logoutUser();
          return throwError(() => new Error('Token refresh failed'));
        }
        userService.applyRefreshedToken(tokenData);
        refreshTokenSubject.next(tokenData.access_token);
        return next(addToken(req, tokenData.access_token));
      }),
      catchError(err => {
        isRefreshing = false;
        userService.logoutUser();
        return throwError(() => err);
      })
    );
  }

  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap(token => next(addToken(req, token!)))
  );
}
