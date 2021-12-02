import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicCombsComponent } from './dynamic-combs/dynamic-combs.component';
import { ShowcaseModule } from '../showcase/showcase.module';
import { CarouselModule } from '../carousel/carousel.module';
import { HeroModule } from '../hero/hero.module';
import { WidgetsModule } from '../../widgets/widgets.module';
@NgModule({
  declarations: [DynamicCombsComponent],
  imports: [
    CommonModule,
    ShowcaseModule,
    CarouselModule,
    HeroModule,
    WidgetsModule,
  ],
  exports: [DynamicCombsComponent],
})
export class DynamicCombsModule {}
