import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserStateInterceptor } from './browserState-interceptor.service';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BrowserStateInterceptor,
    multi: true,
  },
];
