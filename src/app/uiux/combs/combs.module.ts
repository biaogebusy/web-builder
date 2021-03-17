import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseModule } from './showcase/showcase.module';
import { CarouselModule } from './carousel/carousel.module';

const modules = [
  ShowcaseModule,
  CarouselModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class CombsModule { }
