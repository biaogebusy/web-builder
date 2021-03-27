import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AppState } from '../../../mobx/AppState';
@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements OnInit {
  @Input() content: any;
  constructor(public appState: AppState) {}
  config: SwiperConfigInterface = {
    slidesPerView: 'auto',
  };
  ngOnInit(): void {}

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
