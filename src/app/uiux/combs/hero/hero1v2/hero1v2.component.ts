import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-hero1v2',
  templateUrl: './hero1v2.component.html',
  styleUrls: ['./hero1v2.component.scss'],
})
export class Hero1v2Component implements OnInit {
  @Input() content: any;
  index: number;
  mediaConfig: SwiperConfigInterface;
  defaultConfig: SwiperConfigInterface = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  textConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    autoplay: true,
  };
  constructor() {}

  ngOnInit(): void {
    this.setConfig();
  }

  setConfig(): void {
    this.mediaConfig = Object.assign(
      this.defaultConfig,
      this.content.sliders.params
    );
  }
}
