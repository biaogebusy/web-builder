import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

const SSR_TIMEOUT = 10000;

export const ssrTimeoutInterceptor: HttpInterceptorFn = (req, next) => {
  if (isPlatformServer(inject(PLATFORM_ID))) {
    return next(req).pipe(timeout(SSR_TIMEOUT));
  }
  return next(req);
};
