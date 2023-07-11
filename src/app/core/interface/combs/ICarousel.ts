import { ICombsBase } from './ICombsBase';
import { IBgImg } from '../widgets/IBgImg';
import { ITitle } from '../widgets/ITitle';
import { ISwiper } from '../widgets/ISwiper';
export interface ICarouselBase extends ICombsBase {
  type: string;
  bg: IBgImg;
  style?: string;
  fullWidth?: boolean;
  disableContainer?: boolean;
  title?: ITitle;
  sliders: ISwiper;
}
