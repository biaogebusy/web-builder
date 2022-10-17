import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block/block.component';
import { NodeModule } from '../node/node.module';
import { SearchModule } from '../search/search.module';
import { OtherModule } from '@uiux/combs/other/other.module';
import { ProfileModule } from '../profile/profile.module';
import { VideoModule } from '../video/video.module';
import { MapModule } from '../map/map.module';
import { CalendarModule } from '../calendar/calendar.module';
import { DynamicCombsModule } from '../dynamic-combs/dynamic-combs.module';
@NgModule({
  declarations: [BlockComponent],
  imports: [
    CommonModule,
    NodeModule,
    SearchModule,
    OtherModule,
    ProfileModule,
    VideoModule,
    MapModule,
    CalendarModule,
    DynamicCombsModule,
  ],
  exports: [BlockComponent],
})
export class BlockModule {}
