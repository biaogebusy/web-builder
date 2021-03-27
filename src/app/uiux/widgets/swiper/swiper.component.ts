import { Component, Input, OnInit } from '@angular/core';
import SwiperCore from 'swiper/core';
// https://swiperjs.com/angular

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
