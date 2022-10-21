import { ISwiper } from '../widgets/ISwiper';
import { IText } from '../widgets/IText';
import { ICombsBase } from './ICombsBase';

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
