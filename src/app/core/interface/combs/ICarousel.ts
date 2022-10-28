import { ICombsBase } from './ICombsBase';
import { IBgImg } from '../widgets/IBgImg';
import { ITitle } from '../widgets/ITitle';
import { ISwiper } from '../widgets/ISwiper';
export interface ICarouselBase extends ICombsBase {
  bg: IBgImg;
  fullWidth?: boolean;
  disableContainer?: boolean;
  title: ITitle;
  sliders: ISwiper;
}
