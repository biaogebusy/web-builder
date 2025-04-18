import { IBgImg } from './IBgImg';
import { ITitle } from './ITitle';

export interface IText {
  type?: string;
  id?: string;
  spacer?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  bg?: IBgImg;
  classes?: string;
  style?: any;
  title?: ITitle;
  body?: string;
  actionsAlign?: string;
  actions?: any[];
}

export interface ITextHero {
  type: string;
  params: object;
  theme: string;
  id?: string;
  text: IText;
  bg?: IBgImg;
}
