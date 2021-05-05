import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicCombsComponent } from './dynamic-combs/dynamic-combs.component';
import { ShowcaseModule } from '../showcase/showcase.module';
import { CarouselModule } from '../carousel/carousel.module';
import { HeroModule } from '../hero/hero.module';
@NgModule({
  declarations: [DynamicCombsComponent],
  imports: [CommonModule, ShowcaseModule, CarouselModule, HeroModule],
  exports: [DynamicCombsComponent],
})
export class DynamicCombsModule {}
