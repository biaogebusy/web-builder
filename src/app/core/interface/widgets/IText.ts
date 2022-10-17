import { IBgImg } from './IBgImg';
import { ITitle } from './ITitle';

export interface IText {
  id?: string;
  spacer?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
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

export interface ITextHero {
  params: object;
  theme: string;
  id?: string;
  text: IText;
}
