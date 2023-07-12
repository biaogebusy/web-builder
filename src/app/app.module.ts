import {
  BrowserModule,
  BrowserTransferStateModule,
  Title,
} from '@angular/platform-browser';
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
import { Angulartics2Module } from 'angulartics2';
import {
  BRANDING,
  BUILDER_FULL_SCREEN,
  CORE_CONFIG,
  DEBUG_ANIMATE,
  DISABLE_BRAND,
  ENABLE_TOOLBAR,
  MANAGE_SIDEBAR_STATE,
  MEDIA_ASSETS,
  NOTIFY_CONTENT,
  USER,
} from '@core/token/token-providers';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { API_URL, THEME } from '@core/token/token-providers';
import { BlockModule } from '@uiux/combs/block/block.module';
import {
  apiUrlFactory,
  brandingFactory,
  builderFullScreenFactory,
  coreConfigFactory,
  debugAnimateFactory,
  disableBrandFactory,
  enableToolbarFactory,
  manageSidebarStateFactory,
  mediaAssetsFactory,
  notifyFactory,
  themeFactory,
  userFactory,
} from '@core/factory/factory';
registerLocaleData(zhHans, 'zh-hans');
import { ContentService } from '@core/service/content.service';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
import { NotifyService } from '@core/service/notify.service';
import { Router } from '@angular/router';
import { BuilderState } from '@core/state/BuilderState';
import { of } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import { ManageService } from '@core/service/manage.service';
import { NodeService } from '@core/service/node.service';
import { ContentState } from '@core/state/ContentState';

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
    BlockModule,
    BrandingModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
  ],
  providers: [
    Title,
    httpInterceptorProviders,
    {
      provide: CORE_CONFIG,
      useValue: {},
    },
    {
      provide: BRANDING,
      useFactory: brandingFactory,
      deps: [ContentService],
    },
    {
      provide: THEME,
      useFactory: themeFactory,
      deps: [[new Inject(CORE_CONFIG)], LocalStorageService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: coreConfigFactory,
      deps: [ContentService, [new Inject(CORE_CONFIG)]],
      multi: true,
    },
    {
      provide: API_URL,
      useFactory: apiUrlFactory,
      deps: [],
    },
    {
      provide: USER,
      useFactory: userFactory,
      deps: [LocalStorageService, CryptoJSService, UserService],
    },
    {
      provide: NOTIFY_CONTENT,
      useFactory: notifyFactory,
      deps: [[new Inject(CORE_CONFIG)], NotifyService],
    },
    {
      provide: BUILDER_FULL_SCREEN,
      useFactory: builderFullScreenFactory,
      deps: [Router, LocalStorageService, BuilderState],
    },
    {
      provide: DISABLE_BRAND,
      useFactory: disableBrandFactory,
      deps: [Router],
    },
    {
      provide: DEBUG_ANIMATE,
      useFactory: debugAnimateFactory,
      deps: [LocalStorageService, BuilderState],
    },
    {
      provide: MANAGE_SIDEBAR_STATE,
      useFactory: manageSidebarStateFactory,
      deps: [
        Router,
        BRANDING,
        UserService,
        ScreenService,
        LocalStorageService,
        [new Inject(USER)],
        DOCUMENT,
      ],
    },
    {
      provide: ENABLE_TOOLBAR,
      useFactory: enableToolbarFactory,
      deps: [Router],
    },
    {
      provide: MEDIA_ASSETS,
      useFactory: mediaAssetsFactory,
      deps: [NodeService, ManageService, ContentState],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
