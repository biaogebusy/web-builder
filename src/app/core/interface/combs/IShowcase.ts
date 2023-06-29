import { ICombsBase } from './ICombsBase';
import { IFeatureBox } from '../widgets/IFeatureBox';
import { ILink } from '../widgets/ILink';
import { IBtnAnimate } from '../widgets/IBtnAnimate';
import { IText } from '../widgets/IText';
import { IMediaObject } from '../widgets/IMediaObject';
import { ITitle } from '../widgets/ITitle';
import { IImg } from '../widgets/IImg';
import { IIcon } from '../widgets/IIcon';
import { ICard } from '../widgets/ICard';
import { IBox } from '../widgets/IBox';
import { IBg } from '../widgets/IBg';
import { IBgImg } from '../widgets/IBgImg';

export interface IShowcase1v1 extends ICombsBase {
  title: ITitle;
  subTitle: IText;
  elements: any[];
}

export interface IShowcase1v3 extends ICombsBase {
  title: ITitle;
  subTitle: IText;
  elements: any[];
  actions: any[];
}

export interface IShowcase1v4 extends ICombsBase {
  elements: any[];
  actions: any[];
}

export interface IShowcase2v1 extends ICombsBase {
  elements: any[];
  params?: {
    api: string;
    widget: string;
  };
}

export interface IShowcase2v2 extends ICombsBase {
  elements: ICard[];
}

export interface IShowcase2v3 extends ICombsBase {
  elements: Showcase2v3[];
}

interface Showcase2v3 {
  title: string;
  subTitle: string;
  link: ILink;
  img: IImg;
}

export interface IShowcase2v4 extends ICombsBase {
  fullWidth: boolean;
  elements: any[];
}

export interface IShowcase2v5 extends ICombsBase {
  fullWidth: boolean;
  elements: any[];
}

export interface IShowcase2v6 extends ICombsBase {
  fullWidth: boolean;
  elements: any[];
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

export interface IShowcase3v4 extends ICombsBase {
  title: ITitle;
  elements: IBox[];
  img: IImg;
}

export interface IShowcase3v5 extends ICombsBase {
  title: ITitle;
  elements: IBox[];
  img: IImg;
}

export interface IShowcase3v6 extends ICombsBase {
  title: IText;
  elements: IMediaObject[];
  action: any;
}

export interface IShowcase3v7 extends ICombsBase {
  title: IText;
  left: IBox[];
  img: IImg;
  right: IBox[];
}

export interface IShowcase3v8 extends ICombsBase {
  title: IText;
  bg: IBgImg;
  top: IMediaObject[];
  main: IMediaObject;
  bottom: IMediaObject[];
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
