import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModule } from './map/map.module';
import { OtherModule } from './other/other.module';
import { VideoModule } from './video/video.module';
import { BannerModule } from './banner/banner.module';
import { MasonryModule } from './masonry/masonry.module';
import { ShowcaseModule } from './showcase/showcase.module';
import { CarouselModule } from './carousel/carousel.module';
import { DynamicCombsModule } from './dynamic-combs/dynamic-combs.module';

const modules = [
  ShowcaseModule,
  CarouselModule,
  VideoModule,
  MasonryModule,
  BannerModule,
  MapModule,
  OtherModule,
  DynamicCombsModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class CombsModule {}
