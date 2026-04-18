import { NgModule, Injectable } from '@angular/core';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { withRoutes, provideServerRendering } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';
import {
  HTTP_INTERCEPTORS,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

const SSR_TIMEOUT = 5000;

@Injectable()
class SsrTimeoutInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(timeout(SSR_TIMEOUT));
  }
}

@NgModule({
  imports: [AppModule],
  bootstrap: [AppComponent],
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SsrTimeoutInterceptor,
      multi: true,
    },
  ],
})
export class AppServerModule {}
