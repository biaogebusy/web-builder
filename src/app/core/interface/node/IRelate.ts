import { IBg } from '../widgets/IBg';
import { ITitle } from '../widgets/ITitle';
import { IImg } from '@core/interface/widgets/IImg';
import { IText } from '@core/interface/widgets/IText';
import { ISummaryItem } from './ISummaryItem';
export interface IRlate {
  bg?: IBg;
  title: ITitle;
  actions: any[];
  summary: ISummary;
  showcase: IRelateShowcase;
  spacer: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
}

export interface ISummary {
  left: any[];
  middle: ISummaryItem;
  right: ISummaryItem;
}

export interface IRelateShowcase {
  img: IImg;
  text: IText;
  meta: any[];
  content: any[];
}
