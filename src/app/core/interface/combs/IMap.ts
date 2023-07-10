import { ITitle } from '../widgets/ITitle';
import { ICombsBase } from './ICombsBase';
import { ICard1v3 } from '../widgets/ICard';

export interface ILocation extends ICombsBase {
  type: string;
  style: object;
  title: ITitle;
  city: string;
  elements: {
    params?: any;
    company?: any;
  }[];
}

export interface IMapListv1 {
  type: string;
  title: ITitle;
  meta: {
    label: string;
    value: string;
  }[];
  map: ICard1v3;
  sidebarRight?: any[];
}
