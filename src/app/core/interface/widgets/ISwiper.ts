import { SwiperOptions } from 'swiper';

export interface ISwiper {
  type?: 'swiper';
  params: SwiperOptions;
  elements: any[];
  classes: string;
  sliderClasses?: any;
  custom?: {
    pagination: {
      bulletsStyle: any[];
    };
  };
}
