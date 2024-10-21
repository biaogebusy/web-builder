import { Title, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule, Inject } from '@angular/core';
import zhHans from '@angular/common/locales/zh-Hans';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxWebstorageModule, LocalStorageService } from 'ngx-webstorage';
import { BrandingModule } from '@core/branding/branding.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from '@core/interceptors';
import {
  BRANDING,
  BUILDER_FULL_SCREEN,
  CORE_CONFIG,
  DEBUG_ANIMATE,
  IS_BUILDER_MODE,
  LANG,
  MEDIA_ASSETS,
  NOTIFY_CONTENT,
  USER,
} from '@core/token/token-providers';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { API_URL, THEME } from '@core/token/token-providers';
import { RenderModule } from '@modules/render/render.module';
import {
  apiUrlFactory,
  brandingFactory,
  builderFullScreenFactory,
  initApp,
  debugAnimateFactory,
  isBuilderModeFactory,
  langFactory,
  mediaAssetsFactory,
  notifyFactory,
  themeFactory,
  userFactory,
} from '@core/factory/factory';
registerLocaleData(zhHans, 'zh-hans');
import { Router } from '@angular/router';
import { BuilderState } from '@core/state/BuilderState';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSidenavModule,
    NgxWebstorageModule.forRoot(),
    RenderModule,
    BrandingModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
  ],
  providers: [
    Title,
    httpInterceptorProviders,
    CookieService,
    provideHttpClient(withFetch()),
    provideClientHydration(),
    {
      provide: CORE_CONFIG,
      useValue: {},
    },
    {
      provide: BRANDING,
      useFactory: brandingFactory,
    },
    {
      provide: THEME,
      useFactory: themeFactory,
      deps: [[new Inject(CORE_CONFIG)], LocalStorageService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [[new Inject(CORE_CONFIG)]],
      multi: true,
    },
    {
      provide: LANG,
      useFactory: langFactory,
    },
    {
      provide: API_URL,
      useFactory: apiUrlFactory,
    },
    {
      provide: USER,
      useFactory: userFactory,
    },
    {
      provide: NOTIFY_CONTENT,
      useFactory: notifyFactory,
      deps: [[new Inject(CORE_CONFIG)]],
    },
    {
      provide: BUILDER_FULL_SCREEN,
      useFactory: builderFullScreenFactory,
      deps: [Router, LocalStorageService, BuilderState],
    },
    {
      provide: DEBUG_ANIMATE,
      useFactory: debugAnimateFactory,
    },
    {
      provide: IS_BUILDER_MODE,
      useFactory: isBuilderModeFactory,
      deps: [Router],
    },
    {
      provide: MEDIA_ASSETS,
      useFactory: mediaAssetsFactory,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
