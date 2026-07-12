import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SSR_RENDER_TIMEOUT_MS } from 'src/ssr.config';

export const ssrTimeoutInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isPlatformServer(inject(PLATFORM_ID))) {
    return next(req);
  }
  const start = Date.now();
  return next(req).pipe(
    timeout(SSR_RENDER_TIMEOUT_MS),
    catchError(err => {
      if (err?.name === 'TimeoutError') {
        const elapsed = Date.now() - start;
        console.error(`[SSR Timeout] ${req.method} ${req.urlWithParams} — ${elapsed}ms`);
        return throwError(
          () =>
            new HttpErrorResponse({
              status: 504,
              statusText: 'SSR Gateway Timeout',
              url: req.urlWithParams,
            })
        );
      }
      return throwError(() => err);
    })
  );
};
