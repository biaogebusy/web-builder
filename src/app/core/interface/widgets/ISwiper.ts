export interface ISwiper {
  type?: 'swiper';
  params: any;
  elements: any[];
  classes?: string;
  sliderClasses?: any;
  custom?: {
    pagination: {
      bulletsStyle: any[];
    };
  };
}
