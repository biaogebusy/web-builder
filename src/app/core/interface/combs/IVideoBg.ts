import { ICombsBase } from './ICombsBase';

export interface IVideoBg extends ICombsBase {
  source: {
    src: string;
    type: string;
  };
  widget: any;
}
