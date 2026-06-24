import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// 15秒用于SSR请求超时，防止长时间阻塞
const SSR_REQUEST_TIMEOUT = 15000;

export const ssrTimeoutInterceptor: HttpInterceptorFn = (req, next) => {
  if (isPlatformServer(inject(PLATFORM_ID))) {
    return next(req).pipe(
      timeout(SSR_REQUEST_TIMEOUT),
      catchError(error => {
        console.warn(`[HTTP Timeout] ${req.method} ${req.url} exceeded ${SSR_REQUEST_TIMEOUT}ms`);
        // 返回空响应而不是抛出异常，防止SSR崩溃
        throw error;
      })
    );
  }
  return next(req);
};
