import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, makeStateKey, TransferState } from '@angular/core';

import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ApiService } from '@core/service/api.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BrowserStateInterceptor implements HttpInterceptor {
  public responseCache = new Map();

  constructor(
    private transferState: TransferState,
    private apiService: ApiService,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const cacheKey = req.url;
    const cache = this.responseCache.get(cacheKey);
    if (req.method === 'GET') {
      const key = makeStateKey(req.url);
      const storedResponse: any = this.transferState.get(key, null);
      // ssr cache
      if (storedResponse) {
        const response = new HttpResponse({
          body: storedResponse,
          status: 200,
        });
        this.apiService.configLoadDone$.next(true);
        return of(response);
      }

      // http cache
      if (cache && environment.cache) {
        const response = new HttpResponse({
          body: cache,
          status: 200,
        });
        return of(response);
      }
    }

    if (this.coreConfig?.access?.check) {
      req = req.clone({
        withCredentials: true,
      });
    }

    return next.handle(req).pipe(
      tap((event) => {
        if (
          event instanceof HttpResponse &&
          environment.cache &&
          (event.status === 200 || event.status === 202) &&
          !req.url.includes('preview') &&
          !req.url.includes('noCache') &&
          !req.url.includes('/user/') &&
          !req.url.includes('/session/')
        ) {
          this.responseCache.set(cacheKey, event.body);
        }
      }),
    );
  }
}
