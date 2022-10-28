import { ISwiper } from '../widgets/ISwiper';
import { IText } from '../widgets/IText';
import { ICombsBase } from './ICombsBase';
import { IImg } from '../widgets/IImg';
import { ILink } from '../widgets/ILink';

export interface IHero1v1 extends ICombsBase {
  sliders: ISwiper;
}

export interface IHero1v2 extends ICombsBase {
  sliders: ISwiper;
}

export interface IHero1v3 extends ICombsBase {
  text: IText;
  right: any[];
}

export interface IHero2v2 extends ICombsBase {
  body: IText;
}

export interface IHero2v3 extends ICombsBase {
  body: IText;
  row: number;
  elements: {
    img: IImg;
    link: ILink;
  }[];
  shape: boolean;
}
