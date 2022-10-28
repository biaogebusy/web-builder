import { ITitle } from '../widgets/ITitle';
import { ICombsBase } from './ICombsBase';
import { ICard1v3 } from '../widgets/ICard';

export interface ILocation extends ICombsBase {
  style: object;
  title: ITitle;
  elements: {
    params: any;
  }[];
}

export interface IMapListv1 {
  elements: any[];
  title: ITitle;
  meta: {
    label: string;
    value: string;
  }[];
  map: ICard1v3;
  sidebarRight: any[];
}
