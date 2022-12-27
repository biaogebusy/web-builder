import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block/block.component';
import { NodeModule } from '../node/node.module';
import { SearchModule } from '../search/search.module';
import { OtherModule } from '@uiux/combs/other/other.module';
import { ProfileModule } from '../profile/profile.module';
import { VideoModule } from '../video/video.module';
import { MapModule } from '../map/map.module';
import { DynamicCombsModule } from '../dynamic-combs/dynamic-combs.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { ActivatedRoute } from '@angular/router';
import { pageContentFactory } from '@core/factory/factory';
import { ContentService } from '@core/service/content.service';
import { ContentState } from '@core/state/ContentState';
import { PAGE_CONTENT } from '@core/token/token-providers';
@NgModule({
  declarations: [BlockComponent, DynamicComponentComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    NodeModule,
    SearchModule,
    OtherModule,
    ProfileModule,
    VideoModule,
    MapModule,
    DynamicCombsModule,
  ],
  providers: [
    {
      provide: PAGE_CONTENT,
      useFactory: pageContentFactory,
      deps: [ActivatedRoute, ContentService, ContentState],
    },
  ],
  exports: [BlockComponent],
})
export class BlockModule {}
