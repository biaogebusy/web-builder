import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {
  constructor(private transferState: TransferState) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (
          event instanceof HttpResponse &&
          (event.status === 200 || event.status === 202)
        ) {
          if (req.url.includes('landingPage')) {
            console.log(`server set cache,key:${req.url}`);
          }
          this.transferState.set(makeStateKey(req.url), event.body);
        } else {
          if (req.url.includes('landingPage')) {
            console.log(
              `server dont set cache, state:${
                event instanceof HttpResponse && event.status
              }, key:${req.url}`
            );
          }
        }
      })
    );
  }
}
