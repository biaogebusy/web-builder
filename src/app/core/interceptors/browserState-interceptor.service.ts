import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ApiService } from '@core/service/api.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrowserStateInterceptor implements HttpInterceptor {
  constructor(
    private transferState: TransferState,
    private apiService: ApiService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method === 'GET') {
      const key = makeStateKey(req.url);
      const storedResponse: any = this.transferState.get(key, null);
      if (req.url.includes('landingPage')) {
        console.log(`browser request start!url:${req.url}`);
      }
      if (storedResponse) {
        const response = new HttpResponse({
          body: storedResponse,
          status: 200,
        });
        this.apiService.configLoadDone$.next(true);
        if (req.url.includes('landingPage')) {
          console.log(`browser get ssr cache state,url:${req.url}`);
        }
        return of(response);
      }
      if (req.url.includes('landingPage')) {
        console.log(`browser dont get ssr cache state, url:${req.url}`);
      }
    }

    return next.handle(req);
  }
}
