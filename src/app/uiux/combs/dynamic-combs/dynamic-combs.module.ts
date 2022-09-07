import { NgModule } from '@angular/core';
import { DynamicCombsComponent } from './dynamic-combs/dynamic-combs.component';
import { ShowcaseModule } from '../showcase/showcase.module';
import { CarouselModule } from '../carousel/carousel.module';
import { HeroModule } from '../hero/hero.module';
import { TabModule } from '../tab/tab.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ListModule } from '../list/list.module';
import { BannerModule } from '../banner/banner.module';
import { MasonryModule } from '../masonry/masonry.module';
import { OtherModule } from '../other/other.module';
import { ActionModule } from '../action/action.module';
import { ShareModule } from '@share/share.module';
import { MapModule } from '../map/map.module';
import { CalculatorModule } from '../calculator/calculator.module';
@NgModule({
  declarations: [DynamicCombsComponent],
  imports: [
    ShareModule,
    ShowcaseModule,
    CarouselModule,
    HeroModule,
    WidgetsModule,
    TabModule,
    CarouselModule,
    MasonryModule,
    ListModule,
    BannerModule,
    OtherModule,
    ActionModule,
    MapModule,
    CalculatorModule,
  ],
  exports: [DynamicCombsComponent],
})
export class DynamicCombsModule {}
