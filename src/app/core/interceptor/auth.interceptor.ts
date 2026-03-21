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
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private userService = inject(UserService);
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip token injection for OAuth token requests
    if (req.url.includes(environment.oauth.tokenUrl)) {
      return next.handle(req);
    }

    // Skip if request already has Authorization header
    if (req.headers.has('Authorization')) {
      return next.handle(req).pipe(
        catchError(error => this.handleError(error, req, next))
      );
    }

    // Add Bearer token if user is logged in
    const storedUser = this.userService.getStoredUser();
    if (storedUser?.access_token) {
      req = this.addToken(req, storedUser.access_token);
    }

    return next.handle(req).pipe(
      catchError(error => this.handleError(error, req, next))
    );
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
    if (error.status === 401) {
      return this.handle401Error(req, next);
    }
    return throwError(() => error);
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.userService.refreshAccessToken().pipe(
        switchMap((tokenData: any) => {
          this.isRefreshing = false;
          if (tokenData) {
            // Update stored user with new tokens
            const storedUser = this.userService.getStoredUser();
            if (storedUser) {
              storedUser.access_token = tokenData.access_token;
              storedUser.refresh_token = tokenData.refresh_token;
              storedUser.expires_in = tokenData.expires_in;
              this.userService.refreshLocalUser(storedUser);
            }
            this.refreshTokenSubject.next(tokenData.access_token);
            return next.handle(this.addToken(req, tokenData.access_token));
          }
          // Refresh failed, logout
          this.userService.logoutUser();
          return throwError(() => new Error('Token refresh failed'));
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.userService.logoutUser();
          return throwError(() => err);
        })
      );
    }

    // Wait for the ongoing refresh to complete
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.addToken(req, token!)))
    );
  }
}
