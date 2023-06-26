import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import base from '@assets/app/core/base.json';
import { ActivatedRoute, Router } from '@angular/router';
import {
  builderFullScreenFactory,
  debugAnimateFactory,
  manageSidebarStateFactory,
  pageContentFactory,
} from '@core/factory/factory';
import { ContentState } from '@core/state/ContentState';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
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
  DISABLE_BRAND,
  DEBUG_ANIMATE,
  MANAGE_SIDEBAR_STATE,
  ENABLE_TOOLBAR,
} from '@core/token/token-providers';
import { of } from 'rxjs';
import { ActionModule } from '@uiux/combs/action/action.module';
import { BannerModule } from '@uiux/combs/banner/banner.module';
import { CalculatorModule } from '@uiux/combs/calculator/calculator.module';
import { HeroModule } from '@uiux/combs/hero/hero.module';
import { ListModule } from '@uiux/combs/list/list.module';
import { MapModule } from '@uiux/combs/map/map.module';
import { MasonryModule } from '@uiux/combs/masonry/masonry.module';
import { NodeModule } from '@uiux/combs/node/node.module';
import { OtherModule } from '@uiux/combs/other/other.module';
import { ProfileModule } from '@uiux/combs/profile/profile.module';
import { SearchModule } from '@uiux/combs/search/search.module';
import { ShowcaseModule } from '@uiux/combs/showcase/showcase.module';
import { TabModule } from '@uiux/combs/tab/tab.module';
import { VideoModule } from '@uiux/combs/video/video.module';
import { CombsModule } from '@uiux/combs/combs.module';
import { CarouselModule } from '@uiux/combs/carousel/carousel.module';
import { CalendarModule } from '@uiux/combs/calendar/calendar.module';
import { DashboardModule } from '@uiux/combs/dashboard/dashboard.module';
import { notify } from './data/notify';
import { BuilderState } from '@core/state/BuilderState';
import { defaultHeader, footerInverse } from '@stories/global/Branding.json';
import { DOCUMENT } from '@angular/common';
import { UserService } from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
import { BuilderModule } from '@modules/builder/builder.module';

export function sleep(ms: number): Promise<any> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@NgModule({
  declarations: [],
  imports: [
    ShareModule,
    WidgetsModule,
    CombsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    RouterTestingModule,
    BrowserAnimationsModule,
  ],
  exports: [
    ShareModule,
    WidgetsModule,
    CombsModule,
    HttpClientModule,
    RouterTestingModule,
    BrowserAnimationsModule,
  ],
})
export class StorysModule {
  static forRoot(): ModuleWithProviders<StorysModule> {
    return {
      ngModule: StorysModule,
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: base,
        },
        {
          provide: API_URL,
          useValue: 'http://localhost:6006',
        },
        {
          provide: USER,
          useValue: {
            csrf_token: 'pUsbILTBk2fdd6dfadafiLmufthxnVJ6hcXBenZuVcYVRQ600cM',
            current_user: {
              uid: '1',
              name: 'Johnson',
              roles: ['authenticated', 'administrator'],
            },
            id: '029f3488-92ed-4fb5-8fa2-62df6fdaf90bd9d5',
            display_name: '表歌',
            mail: 'hi@example.com',
            authenticated: true,
            picture: '/assets/images/avatar/01.jpeg',
            login: new Date(),
          },
        },
        {
          provide: THEME,
          useValue: 'light-theme',
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
          deps: [Router, LocalStorageService, BuilderState],
        },
        {
          provide: DISABLE_BRAND,
          useValue: of(false),
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
          useValue: of(true),
        },
      ],
    };
  }

  static forEntryComponents(): any[] {
    return [
      ...WidgetsModule.forStorybook(),
      ...ActionModule.forStorybook(),
      ...BannerModule.forStorybook(),
      ...CalculatorModule.forStorybook(),
      ...CalendarModule.forStorybook(),
      ...CarouselModule.forStorybook(),
      ...HeroModule.forStorybook(),
      ...ListModule.forStorybook(),
      ...MapModule.forStorybook(),
      ...MasonryModule.forStorybook(),
      ...NodeModule.forStorybook(),
      ...OtherModule.forStorybook(),
      ...ProfileModule.forStorybook(),
      ...SearchModule.forStorybook(),
      ...ShowcaseModule.forStorybook(),
      ...TabModule.forStorybook(),
      ...VideoModule.forStorybook(),
      ...DashboardModule.forStorybook(),
      ...BuilderModule.forStorybook(),
    ];
  }

  constructor() {}
}
