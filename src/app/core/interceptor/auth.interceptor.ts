import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { UserService } from '@core/service/user.service';
import { IUser } from '@core/interface/IUser';
import { environment } from 'src/environments/environment';

const PROACTIVE_REFRESH_LEEWAY_MS = 30 * 1000;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private userService = inject(UserService);
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(environment.oauth.tokenUrl)) {
      return next.handle(req);
    }

    if (req.headers.has('Authorization')) {
      return next.handle(req).pipe(catchError(error => this.handleError(error, req, next)));
    }

    const storedUser = this.userService.getStoredUser();

    if (!storedUser?.access_token) {
      return next.handle(req).pipe(catchError(error => this.handleError(error, req, next)));
    }

    // SSR: never refresh; render anonymously when token already expired.
    if (!this.userService.isBrowser) {
      if (this.isExpired(storedUser)) {
        return next.handle(req);
      }
      return next.handle(this.addToken(req, storedUser.access_token));
    }

    if (this.shouldProactivelyRefresh(storedUser)) {
      return this.refreshAndRetry(req, next);
    }

    const authReq = this.addToken(req, storedUser.access_token);
    return next.handle(authReq).pipe(catchError(error => this.handleError(error, req, next)));
  }

  private isExpired(user: IUser): boolean {
    return !!user.expires_at && Date.now() >= user.expires_at;
  }

  private shouldProactivelyRefresh(user: IUser): boolean {
    if (!user.expires_at || !user.refresh_token) {
      return false;
    }
    return Date.now() >= user.expires_at - PROACTIVE_REFRESH_LEEWAY_MS;
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleError(
    error: HttpErrorResponse,
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      error.status === 401 &&
      req.url.includes(environment.apiUrl) &&
      this.userService.isBrowser
    ) {
      const storedUser = this.userService.getStoredUser();
      if (storedUser?.refresh_token) {
        return this.refreshAndRetry(req, next);
      }
    }
    return throwError(() => error);
  }

  private refreshAndRetry(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.userService.refreshAccessToken().pipe(
        switchMap((tokenData: any) => {
          this.isRefreshing = false;
          if (!tokenData) {
            this.userService.logoutUser();
            return throwError(() => new Error('Token refresh failed'));
          }
          this.userService.applyRefreshedToken(tokenData);
          this.refreshTokenSubject.next(tokenData.access_token);
          return next.handle(this.addToken(req, tokenData.access_token));
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.userService.logoutUser();
          return throwError(() => err);
        })
      );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.addToken(req, token!)))
    );
  }
}
