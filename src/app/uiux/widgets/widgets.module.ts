import { NgModule } from '@angular/core';
import { ShareModule } from '../../share/share.module';
import { MatChipsModule } from '@angular/material/chips';
import { ChipListComponent } from './chip-list/chip-list.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { BgComponent } from './bg/bg.component';
import { LinkComponent } from './link/link.component';
import { CardComponent } from './card/card.component';
import { SwiperComponent } from './swiper/swiper.component';
import { ImgComponent } from './img/img.component';
import { DynamicWidgetsComponent } from './dynamic-widgets/dynamic-widgets.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { TitleComponent } from './title/title.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { NumberAnimateComponent } from './number-animate/number-animate.component';
import { BtnAnimateComponent } from './btn-animate/btn-animate.component';
import { FeatureBoxComponent } from './feature-box/feature-box.component';
import { BoxComponent } from './box/box.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MapComponent } from './map/map.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { LineYearComponent } from './line-year/line-year.component';
import { TextComponent } from './text/text.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
};

const components = [
  ChipListComponent,
  SpinnerComponent,
  BgComponent,
  LinkComponent,
  CardComponent,
  SwiperComponent,
  ImgComponent,
  TitleComponent,
  DropdownMenuComponent,
  NumberAnimateComponent,
  BtnAnimateComponent,
  FeatureBoxComponent,
  BoxComponent,
  BreadcrumbComponent,
  MapComponent,
  TestimonialComponent,
  LineYearComponent,
  TextComponent,
  DynamicWidgetsComponent,
];

@NgModule({
  declarations: [...components],
  imports: [MatChipsModule, ShareModule, SwiperModule],
  exports: [...components],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class WidgetsModule {}
