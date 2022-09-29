import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import type { ICoreConfig } from '@core/mobx/IAppConfig';
import { ApiService } from '@core/service/api.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrowserStateInterceptor implements HttpInterceptor {
  constructor(
    private transferState: TransferState,
    private apiService: ApiService,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method === 'GET') {
      const key = makeStateKey(req.url);
      const storedResponse: any = this.transferState.get(key, null);
      if (storedResponse) {
        const response = new HttpResponse({
          body: storedResponse,
          status: 200,
        });
        this.apiService.configLoadDone$.next(true);
        return of(response);
      }
    }

    if (this.coreConfig?.access?.check) {
      req = req.clone({
        withCredentials: true,
      });
    }

    return next.handle(req);
  }
}
