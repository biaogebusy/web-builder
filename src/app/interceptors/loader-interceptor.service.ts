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
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.loadingService.setLoading(true, request.url);
    return next
      .handle(request)
      .pipe(
        catchError((err) => {
          this.loadingService.setLoading(false, request.url);
          return err;
        })
      )
      .pipe(
        map((evt) => {
          if (evt instanceof HttpResponse) {
            this.loadingService.setLoading(false, request.url);
          }
          return evt;
        })
      );
  }
}
