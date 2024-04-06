import { ICombsBase } from './ICombsBase';

export interface IVideoBg extends ICombsBase {
  source: {
    src: string;
    type: string;
  };
  elements: any[];
}
