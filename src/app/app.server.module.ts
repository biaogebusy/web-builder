import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerStateInterceptor } from '@core/interceptors/serverState-interceptor.service';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    FlexLayoutServerModule,
    ServerTransferStateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
