import { NgModule } from '@angular/core';
import { Carousel1v1Component } from './carousel1v1/carousel1v1.component';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ShareModule } from '../../../share/share.module';
import { Carousel1v2Component } from './carousel1v2/carousel1v2.component';

const components = [Carousel1v1Component, Carousel1v2Component];

@NgModule({
  declarations: [...components],
  imports: [WidgetsModule, ShareModule],
  exports: [...components],
})
export class CarouselModule {}
