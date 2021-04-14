import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseModule } from './showcase/showcase.module';
import { CarouselModule } from './carousel/carousel.module';
import { VideoModule } from './video/video.module';

const modules = [
  ShowcaseModule,
  CarouselModule,
  VideoModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class CombsModule { }
