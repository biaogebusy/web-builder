import { ModuleWithProviders, NgModule, inject } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import base from '@assets/app/core/base.json';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  builderFullScreenFactory,
  debugAnimateFactory,
  mediaAssetsFactory,
  pageContentFactory,
} from '@core/factory/factory';
import { ContentState } from '@core/state/ContentState';
import { ContentService } from '@core/service/content.service';
import {
  CORE_CONFIG,
  API_URL,
  USER,
  THEME,
  PAGE_CONTENT,
  BRANDING,
  NOTIFY_CONTENT,
  BUILDER_FULL_SCREEN,
  DEBUG_ANIMATE,
  IS_BUILDER_MODE,
  MEDIA_ASSETS,
  LANG,
  WIDGETS,
} from '@core/token/token-providers';
import { of } from 'rxjs';
import { notify } from './data/notify';
import { BuilderState } from '@core/state/BuilderState';
import { defaultHeader, footerInverse } from '@modules/builder/data/Branding.json';
import { ThemeService } from '@core/service/theme.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ComponentService } from '@core/service/component.service';
export function sleep(ms: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@NgModule({
  declarations: [],
  imports: [ShareModule, RouterModule, NgxWebstorageModule.forRoot(), BrowserAnimationsModule],
  exports: [ShareModule, RouterModule, BrowserAnimationsModule],
})
export class StorysModule {
  static forRoot(): ModuleWithProviders<StorysModule> {
    return {
      ngModule: StorysModule,
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: base,
        },
        {
          provide: WIDGETS,
          useValue: {},
        },
        {
          provide: API_URL,
          useValue: 'http://localhost:6006',
        },
        {
          provide: USER,
          useValue: of({
            csrf_token: 'pUsbILTBk2fdd6dfadafiLmufthxnVJ6hcXBenZuVcYVRQ600cM',
            current_user: {
              uid: '1',
              name: 'Johnson',
              roles: ['authenticated', 'administrator'],
            },
            id: '029f3488-92ed-4fb5-8fa2-62df6fdaf90bd9d5',
            display_name: '表歌',
            mail: 'hi@builder.design',
            authenticated: true,
            picture: '/assets/images/avatar/01.jpeg',
            login: new Date(),
          }),
        },
        {
          provide: THEME,
          useValue: 'blue-theme',
        },
        {
          provide: LANG,
          useValue: {
            label: '中文',
            value: 'zh',
            prefix: '/',
          },
        },
        {
          provide: PAGE_CONTENT,
          useFactory: pageContentFactory,
          deps: [ActivatedRoute, ContentService, ContentState],
        },
        {
          provide: BRANDING,
          useValue: of({ header: defaultHeader, footer: footerInverse }),
        },
        {
          provide: NOTIFY_CONTENT,
          useValue: of(notify),
        },
        {
          provide: BUILDER_FULL_SCREEN,
          useFactory: builderFullScreenFactory,
        },
        {
          provide: DEBUG_ANIMATE,
          useFactory: debugAnimateFactory,
          deps: [LocalStorageService, BuilderState],
        },
        {
          provide: IS_BUILDER_MODE,
          useValue: of(false),
        },
        {
          provide: MEDIA_ASSETS,
          useValue: mediaAssetsFactory,
        },
      ],
    };
  }

  constructor() {
    const themeService = inject(ThemeService);
    const componentService = inject(ComponentService);
    componentService.registerDynamicComponent();
    themeService.initTheme();
    window.gsap = gsap;
    window.gsap.registerPlugin(ScrollTrigger);
  }
}
