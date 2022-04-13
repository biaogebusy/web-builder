import { IBgImg } from './IBgImg';
import { ITitle } from './ITitle';
import { ILink } from '@core/interface/widgets/ILink';

export interface IText {
  id?: string;
  spacer?: string;
  bg?: IBgImg;
  classes?: string;
  style?: any;
  title?: ITitle;
  body?: HTMLElement;
  actionsAlign?: string;
  lists?: {
    params: {
      icon: boolean;
    };
    elements: ILink[];
  };
  actions?: any[];
}
