import { IImg } from './IImg';
import { IBg } from './IBg';
export interface IBgImg extends IBg {
  type?: 'bg-img';
  img?: IImg;
}
