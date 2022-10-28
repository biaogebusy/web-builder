import { ModuleWithProviders, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxWebstorageModule } from 'ngx-webstorage';
import base from '../../assets/app/core/base.json';
import branding from '../../assets/app/core/branding.json';
import { ActivatedRoute } from '@angular/router';
import { pageContentFactory } from '@core/factory/factory';
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
} from '@core/token/token-providers';
import { of } from 'rxjs';

export function sleep(ms: number): Promise<any> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@NgModule({
  declarations: [],
  imports: [
    ShareModule,
    WidgetsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    RouterTestingModule,
    BrowserAnimationsModule,
  ],
  exports: [
    ShareModule,
    WidgetsModule,
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
              roles: ['authenticated'],
            },
            id: '029f3488-92ed-4fb5-8fa2-62df6fdaf90bd9d5',
            display_name: '表歌',
            mail: 'hi@zhaobg.com',
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
          useValue: of(branding),
        },
      ],
    };
  }
}
