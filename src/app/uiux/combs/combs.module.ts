import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseModule } from './showcase/showcase.module';
import { CarouselModule } from './carousel/carousel.module';
import { VideoModule } from './video/video.module';
import { MasonryModule } from './masonry/masonry.module';
import { BannerModule } from './banner/banner.module';
import { MapModule } from './map/map.module';
import { DynamicCombsModule } from './dynamic-combs/dynamic-combs.module';

const modules = [
  ShowcaseModule,
  CarouselModule,
  VideoModule,
  MasonryModule,
  BannerModule,
  MapModule,
  DynamicCombsModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class CombsModule {}
