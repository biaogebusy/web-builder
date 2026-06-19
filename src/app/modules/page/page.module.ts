import { NgModule, signal } from '@angular/core';
import { PageComponent } from './page/page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { getBuilderConfig, pageContentFactory } from '@core/factory/factory';
import {
  BUILDER_CONFIG,
  BUILDER_CURRENT_PAGE,
  DEBUG_ANIMATE,
  PAGE_CONTENT,
} from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { BrandingModule } from '@core/branding/branding.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@NgModule({
  declarations: [],
  imports: [
    ShareModule,
    WidgetsModule,
    MatSidenavModule,
    BrandingModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    PageComponent,
  ],
  providers: [
    {
      provide: PAGE_CONTENT,
      useFactory: pageContentFactory,
    },
    {
      provide: BUILDER_CONFIG,
      useFactory: getBuilderConfig,
    },
    {
      provide: BUILDER_CURRENT_PAGE,
      useExisting: PAGE_CONTENT,
    },
    {
      provide: DEBUG_ANIMATE,
      useFactory: () => signal(false),
    },
  ],
  exports: [PageComponent],
})
export class PageModule {}
