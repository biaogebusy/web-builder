import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carousel1v1Component } from './carousel1v1/carousel1v1.component';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ShareModule } from '../../../share/share.module';

const components = [Carousel1v1Component];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, WidgetsModule, ShareModule],
  exports: [...components],
})
export class CarouselModule {}
