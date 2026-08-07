import { ITitle } from '../widgets/ITitle';
import { ICombsBase } from './ICombsBase';

export interface ILocation extends ICombsBase {
  type: string;
  style: object;
  title: ITitle;
  city?: string;
  elements: {
    params?: any;
    company?: any;
  }[];
}
