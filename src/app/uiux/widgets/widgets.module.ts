import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share/share.module';
import { MatChipsModule } from '@angular/material/chips';
import { ChipListComponent } from './chip-list/chip-list.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SwiperModule } from 'swiper/angular';
import { BgComponent } from './bg/bg.component';
import { LinkComponent } from './link/link.component';
import { CardComponent } from './card/card.component';
import { SwiperComponent } from './swiper/swiper.component';

const components = [
  ChipListComponent,
  SpinnerComponent,
  BgComponent,
  LinkComponent,
  CardComponent,
  SwiperComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, MatChipsModule, ShareModule, SwiperModule],
  exports: [...components],
})
export class WidgetsModule {}
