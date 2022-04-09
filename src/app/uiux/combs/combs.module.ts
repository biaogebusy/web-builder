import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModule } from './map/map.module';
import { OtherModule } from './other/other.module';
import { VideoModule } from './video/video.module';
import { BannerModule } from './banner/banner.module';
import { SearchModule } from './search/search.module';
import { MasonryModule } from './masonry/masonry.module';
import { ShowcaseModule } from './showcase/showcase.module';
import { CarouselModule } from './carousel/carousel.module';
import { HeroModule } from './hero/hero.module';
import { DynamicCombsModule } from './dynamic-combs/dynamic-combs.module';
import { ListModule } from './list/list.module';
import { ProfileModule } from './profile/profile.module';
import { ActionModule } from './action/action.module';
import { TabModule } from './tab/tab.module';
import { NodeModule } from './node/node.module';

const modules = [
  ActionModule,
  BannerModule,
  CarouselModule,
  DynamicCombsModule,
  HeroModule,
  ListModule,
  MasonryModule,
  MapModule,
  OtherModule,
  ProfileModule,
  ShowcaseModule,
  SearchModule,
  VideoModule,
  TabModule,
  NodeModule,
];

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules],
  declarations: [],
})
export class CombsModule {}
