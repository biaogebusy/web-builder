import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
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
    // api with loading disable globel loading
    const isDisableLoading = request.urlWithParams.includes('loading');
    this.loadingService.setLoading(
      isDisableLoading ? false : true,
      request.url
    );
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
