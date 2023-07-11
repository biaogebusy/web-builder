import { IImg } from '../widgets/IImg';
import { ITitle } from '../widgets/ITitle';
import { ICombsBase } from './ICombsBase';

export interface INotfound extends ICombsBase {
  img: IImg;
  title?: ITitle;
  actions: any[];
}
