import {
  ApplicationConfig,
  Inject,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  BrowserModule,
  Title,
  provideClientHydration,
  withHttpTransferCacheOptions,
  withIncrementalHydration,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import zhHans from '@angular/common/locales/zh-Hans';
import { registerLocaleData } from '@angular/common';
import { provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig } from 'ngx-webstorage';
import { CookieService } from 'ngx-cookie-service';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideMonacoEditor } from 'ngx-monaco-editor-v2';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { authInterceptor } from '@core/interceptor/auth.interceptor';
import { ssrTimeoutInterceptor } from '@core/interceptor/ssr-timeout.interceptor';
import {
  API_URL,
  BRANDING,
  CORE_CONFIG,
  LANG,
  NOTIFY_CONTENT,
  THEME,
  USER,
} from '@core/token/token-providers';
import {
  apiUrlFactory,
  brandingFactory,
  initApp,
  langFactory,
  notifyFactory,
  themeFactory,
  userFactory,
} from '@core/factory/factory';
import { PageModule } from '@modules/page/page.module';
import { environment } from 'src/environments/environment';

registerLocaleData(zhHans, 'zh-hans');

export const appConfig: ApplicationConfig = {
  providers: [
    Title,
    CookieService,
    { provide: CORE_CONFIG, useValue: {} },
    { provide: BRANDING, useFactory: brandingFactory },
    { provide: THEME, useFactory: themeFactory, deps: [[new Inject(CORE_CONFIG)]] },
    { provide: LANG, useFactory: langFactory },
    { provide: API_URL, useFactory: apiUrlFactory },
    { provide: USER, useFactory: userFactory },
    { provide: NOTIFY_CONTENT, useFactory: notifyFactory, deps: [[new Inject(CORE_CONFIG)]] },
    provideAppInitializer(() => {
      const initializerFn = initApp(inject(CORE_CONFIG));
      return initializerFn();
    }),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, ssrTimeoutInterceptor])),
    provideMonacoEditor({ baseUrl: 'assets' }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    provideClientHydration(
      withIncrementalHydration(),
      withHttpTransferCacheOptions({
        includePostRequests: false,
        filter: req => {
          if (req.method !== 'GET') {
            return false;
          }
          if (req.headers.has('Authorization')) {
            return false;
          }
          const url = req.url.toLowerCase();
          if (url.includes('nocache')) {
            return false;
          }
          const userStatePatterns = [
            '/oauth/',
            '/api/v1/user/',
            '/api/v3/accountprofile',
            '/api/v3/personalprofile',
            '/jsonapi/user/',
          ];
          return !userStatePatterns.some(pattern => url.includes(pattern));
        },
      })
    ),
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
      withLocalStorage()
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: environment.langs?.find(item => item.default)?.langCode || 'zh-hans',
      })
    ),
    provideTranslateHttpLoader({
      prefix: `${environment.apiUrl}/assets/i18n/`,
      suffix: '.json',
    }),
    importProvidersFrom(BrowserModule, PageModule),
  ],
};
