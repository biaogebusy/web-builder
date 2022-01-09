import { IBgImg } from './IBgImg';
import { ITitle } from './ITitle';

export interface IText {
  id?: string;
  spacer?: string;
  bg?: IBgImg;
  classes: string;
  style?: any;
  title?: ITitle;
  body?: HTMLElement;
  actionsAlign?: string;
  actions?: any[];
}
