export interface ISwiper {
  type?: 'swiper';
  fullWidth?: boolean;
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
