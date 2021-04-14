import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseModule } from './showcase/showcase.module';
import { CarouselModule } from './carousel/carousel.module';
import { VideoModule } from './video/video.module';
import { DynamicCombsModule } from './dynamic-combs/dynamic-combs.module';

const modules = [
  ShowcaseModule,
  CarouselModule,
  VideoModule,
  DynamicCombsModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class CombsModule { }
