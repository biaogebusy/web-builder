import { IBgImg } from './IBgImg';
import { ITitle } from './ITitle';

export interface IText {
  id?: string;
  spacer?: string;
  bg?: IBgImg;
  classes?: string;
  style?: any;
  title?: ITitle;
  body?: string;
  actionsAlign?: string;
  lists?: {
    params: {
      icon: boolean;
    };
    elements: any[];
  };
  actions?: any[];
}
