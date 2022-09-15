import {
  BrowserModule,
  BrowserTransferStateModule,
  Title,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule, Inject } from '@angular/core';
import zhHans from '@angular/common/locales/zh-Hans';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { MobxModule } from '@core/mobx/mobx.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrandingModule } from '@core/branding/branding.module';
import { AppComponent } from './app.component';
import { AppState } from './core/mobx/AppState';
import { httpInterceptorProviders } from '@core/interceptors';
import { Angulartics2Module } from 'angulartics2';
import { CORE_CONFIG } from '@core/token/core.config';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
import { ToastrModule } from 'ngx-toastr';
import { UiuxModule } from '@uiux/uiux.module';
registerLocaleData(zhHans, 'zh-hans');
export function initConfig(appState: AppState, coreConfig: object) {
  return () => appState.loadConfig(coreConfig);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'xinshi' }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    CommonModule,
    MatSidenavModule,
    NgxWebstorageModule.forRoot(),
    Angulartics2Module.forRoot(),
    MobxModule.forRoot(),
    UiuxModule,
    ToastrModule.forRoot({
      maxOpened: 6,
      easeTime: 300,
      newestOnTop: true,
      preventDuplicates: true,
    }),
    BrandingModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
  ],
  providers: [
    Title,
    AppState,
    httpInterceptorProviders,
    {
      provide: CORE_CONFIG,
      useValue: {},
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppState, [new Inject(CORE_CONFIG)]],
      multi: true,
    },
    {
      provide: API_URL,
      useFactory: apiUrlFactory,
      deps: [],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
