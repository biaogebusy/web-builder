import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from '../service/loading.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private _loading: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this._loading.setLoading(true, request.url);
    return next
      .handle(request)
      .pipe(
        catchError((err) => {
          this._loading.setLoading(false, request.url);
          return err;
        })
      )
      .pipe(
        map((evt) => {
          if (evt instanceof HttpResponse) {
            this._loading.setLoading(false, request.url);
          }
          return evt;
        })
      );
  }
}
