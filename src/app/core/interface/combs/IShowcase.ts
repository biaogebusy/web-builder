import { ICombsBase } from './ICombsBase';
import { IFeatureBox } from '../widgets/IFeatureBox';
import { ILink } from '../widgets/ILink';
import { IBtnAnimate } from '../widgets/IBtnAnimate';
import { IText } from '../widgets/IText';
import { IMediaObject } from '../widgets/IMediaObject';
import { ITitle } from '../widgets/ITitle';
import { IImg } from '../widgets/IImg';
import { IIcon } from '../widgets/IIcon';

export interface IShowcase2v1 extends ICombsBase {
  elements: any[];
  params?: {
    api: string;
    widget: string;
  };
}

export interface IShowcase3v1 extends ICombsBase {
  title: ITitle;
  bgImg?: string;
  carousel?: any;
  content: string;
}

export interface IShowcase3v2 extends ICombsBase {
  title: ITitle;
  subTitle: string;
  elements: {
    img: IImg;
    content: IText;
  }[];
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

export interface IShowcase4v1 extends ICombsBase {
  elements: IShowcase4v1Element[];
}

export interface IShowcase4v1Element {
  icon?: IIcon;
  img?: IImg;
  digit: number;
  title: string;
  desc?: string;
}
