import { Component, Input, OnInit } from '@angular/core';
import {
  SwiperConfigInterface,
  SwiperCoverflowEffectInterface,
  SwiperNavigationInterface,
  SwiperPaginationInterface,
} from 'ngx-swiper-wrapper';
import { AppState } from '../../../mobx/AppState';

const navigationConfig: SwiperNavigationInterface = {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
};

const paginationgConfig: SwiperPaginationInterface = {
  el: '.swiper-pagination',
  type: 'bullets',
};

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements OnInit {
  @Input() content: any;
  constructor(public appState: AppState) {}
  defaultConfig: SwiperConfigInterface = {
    slidesPerView: 'auto',
    speed: 1000,
    navigation: navigationConfig,
    pagination: paginationgConfig,
    // Responsive breakpoints
    // breakpoints: {
    //   // when window width is >= 320px
    //   320: {
    //     slidesPerView: 1.2,
    //     spaceBetween: 10,
    //   },
    //   // when window width is >= 480px
    //   480: {
    //     slidesPerView: 2,
    //     spaceBetween: 20,
    //   },
    //   // when window width is >= 640px
    //   640: {
    //     slidesPerView: 3,
    //     spaceBetween: 30,
    //   },
    //   768: {
    //     slidesPerView: 4,
    //     spaceBetween: 30,
    //   },
    // },
  };
  config: SwiperConfigInterface;
  ngOnInit(): void {
    this.config = Object.assign(this.defaultConfig, this.content.params);
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
