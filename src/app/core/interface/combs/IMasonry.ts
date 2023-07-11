import { ICombsBase } from './ICombsBase';
import { ITitle } from '../widgets/ITitle';
import { NgxPackeryOptions } from 'ngx-packery';
export interface IPackery extends ICombsBase {
  fullWidth?: boolean;
  elements: any[];
  config: NgxPackeryOptions;
}

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
