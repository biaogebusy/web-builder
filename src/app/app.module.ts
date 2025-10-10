import {
  BrowserModule,
  Title,
  provideClientHydration,
  withHttpTransferCacheOptions,
  withIncrementalHydration,
} from '@angular/platform-browser';

import {
  NgModule,
  Inject,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import zhHans from '@angular/common/locales/zh-Hans';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig } from 'ngx-webstorage';
import { AppComponent } from './app.component';
import {
  USER,
  LANG,
  THEME,
  API_URL,
  BRANDING,
  CORE_CONFIG,
  NOTIFY_CONTENT,
} from '@core/token/token-providers';
import { PageModule } from '@modules/page/page.module';
import {
  apiUrlFactory,
  brandingFactory,
  initApp,
  langFactory,
  notifyFactory,
  themeFactory,
  userFactory,
} from '@core/factory/factory';
registerLocaleData(zhHans, 'zh-hans');
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, PageModule],
  providers: [
    Title,
    CookieService,
    provideClientHydration(
      withIncrementalHydration(),
      withHttpTransferCacheOptions({
        includePostRequests: false,
        filter: req => {
          const { url, method } = req;
          return method === 'GET' && !url.includes('nocache');
        },
      })
    ),
    provideHttpClient(withFetch()),
    provideZonelessChangeDetection(),
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
      withLocalStorage()
    ),
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
      deps: [[new Inject(CORE_CONFIG)]],
    },
    provideAppInitializer(() => {
      const initializerFn = initApp(inject(CORE_CONFIG));
      return initializerFn();
    }),
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

    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
