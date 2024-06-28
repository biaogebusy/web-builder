import { Title, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule, Inject } from '@angular/core';
import zhHans from '@angular/common/locales/zh-Hans';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DOCUMENT, registerLocaleData } from '@angular/common';
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
  MANAGE_SIDEBAR_STATE,
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
  manageSidebarStateFactory,
  mediaAssetsFactory,
  notifyFactory,
  themeFactory,
  userFactory,
} from '@core/factory/factory';
registerLocaleData(zhHans, 'zh-hans');
import { ContentService } from '@core/service/content.service';
import { UserService } from '@core/service/user.service';
import { NotifyService } from '@core/service/notify.service';
import { Router } from '@angular/router';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenService } from '@core/service/screen.service';
import { ManageService } from '@core/service/manage.service';
import { NodeService } from '@core/service/node.service';
import { ContentState } from '@core/state/ContentState';
import { CookieService } from 'ngx-cookie-service';
import { ComponentService } from '@core/service/component.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
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
    provideClientHydration(),
    {
      provide: CORE_CONFIG,
      useValue: {},
    },
    {
      provide: BRANDING,
      useFactory: brandingFactory,
      deps: [[new Inject(LANG)]],
    },
    {
      provide: THEME,
      useFactory: themeFactory,
      deps: [[new Inject(CORE_CONFIG)], LocalStorageService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [[new Inject(CORE_CONFIG)], [new Inject(LANG)]],
      multi: true,
    },
    {
      provide: LANG,
      useFactory: langFactory,
      deps: [ContentService, ScreenService],
    },
    {
      provide: API_URL,
      useFactory: apiUrlFactory,
      deps: [],
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
      provide: MANAGE_SIDEBAR_STATE,
      useFactory: manageSidebarStateFactory,
      deps: [BRANDING, [new Inject(USER)], DOCUMENT],
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
