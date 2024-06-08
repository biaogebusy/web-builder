import { ICombsBase } from './ICombsBase';
import { ITitle } from '../widgets/ITitle';

export interface IShuffle extends ICombsBase {
  title: ITitle;
  filter: {
    value: string;
    label: string;
    selected?: boolean;
  }[];
  row: number;
  elements: any[];
}
