import { ICombsBase } from './ICombsBase';
import { IFeatureBox } from '../widgets/IFeatureBox';
import { ILink } from '../widgets/ILink';
import { IBtnAnimate } from '../widgets/IBtnAnimate';
import { IText } from '../widgets/IText';
import { IMediaObject } from '../widgets/IMediaObject';

export interface IShowcase2v1 extends ICombsBase {
  elements: any[];
}

export interface IShowcase3v3 extends ICombsBase {
  feature: IFeatureBox;
  showImage: boolean;
  title: ILink;
  date: string;
  commentCount: string;
  category: string;
  body: string;
  details: IBtnAnimate;
}

export interface IShowcase3v6 extends ICombsBase {
  title: IText;
  elements: IMediaObject[];
  action: any;
}

export interface IShowcase3v9 extends ICombsBase {
  left: any[];
  right: any[];
  order: {
    left: number;
    right: number;
  };
}
