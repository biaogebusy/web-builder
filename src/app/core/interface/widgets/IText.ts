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
  lists?: {
    params: {
      icon: boolean;
    };
    elements: any[];
  };
  actions?: any[];
  animate?: {
    disable: boolean;
    scrub: boolean;
  };
}

export interface ITextHero {
  type: string;
  params: object;
  theme: string;
  id?: string;
  text: IText;
  bg?: IBgImg;
}
