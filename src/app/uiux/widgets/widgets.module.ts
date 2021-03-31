import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  DynamicWidgetsComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, MatChipsModule, ShareModule, SwiperModule],
  exports: [...components],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class WidgetsModule {}
