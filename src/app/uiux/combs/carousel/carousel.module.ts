import { NgModule } from '@angular/core';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ShareModule } from '../../../share/share.module';
import { Carousel1v1Component } from './carousel1v1/carousel1v1.component';
import { Carousel1v2Component } from './carousel1v2/carousel1v2.component';
import { Carousel2v1Component } from './carousel2v1/carousel2v1.component';
import { Carousel1v3Component } from './carousel1v3/carousel1v3.component';

const components = [
  Carousel1v1Component,
  Carousel1v2Component,
  Carousel2v1Component,
  Carousel1v3Component,
];

@NgModule({
  declarations: [...components],
  imports: [WidgetsModule, ShareModule],
  exports: [...components],
})
export class CarouselModule {}
