import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ShareModule } from '@share/share.module';
import { Carousel1v1Component } from './carousel1v1/carousel1v1.component';
import { Carousel1v2Component } from './carousel1v2/carousel1v2.component';
import { Carousel2v1Component } from './carousel2v1/carousel2v1.component';
import { Carousel1v3Component } from './carousel1v3/carousel1v3.component';
import { Carousel2v2Component } from './carousel2v2/carousel2v2.component';
import { BaseModule } from '@uiux/base/base.module';
import { SwiperComponent } from './swiper/swiper.component';

const components = [
  Carousel1v1Component,
  Carousel1v2Component,
  Carousel1v3Component,
  Carousel2v1Component,
  Carousel2v2Component,
  SwiperComponent,
];

@NgModule({
  declarations: [...components],
  imports: [WidgetsModule, ShareModule],
  exports: [...components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselModule extends BaseModule {
  dynamicComponents = [...components];

  static forStorybook(): any {
    return [...components];
  }
}
