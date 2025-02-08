import { ISwiper } from '../widgets/ISwiper';
import { IText } from '../widgets/IText';
import { ICombsBase } from './ICombsBase';
import { IImg } from '../widgets/IImg';
import { ILink } from '../widgets/ILink';

export interface IHero1v1 extends ICombsBase {
  swiper: ISwiper;
}

export interface IHero1v2 extends ICombsBase {
  left: ISwiper;
  right: ISwiper;
}

export interface IHero1v3 extends ICombsBase {
  text: IText;
  right: any[];
}

export interface IHero1v4 extends ICombsBase {
  style?: any;
  order?: number;
  widget: any[];
}

export interface IHero2v2 extends ICombsBase {
  content: IText;
}

export interface IHero2v3 extends ICombsBase {
  elements: {
    img: IImg;
    link: ILink;
  }[];
  shape: boolean;
}
