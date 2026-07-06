import { ICombsBase } from './ICombsBase';
import { IFeatureBox } from '../widgets/IFeatureBox';
import { ILink } from '../widgets/ILink';
import { IText } from '../widgets/IText';
import { IMediaObject } from '../widgets/IMediaObject';
import { ITitle } from '../widgets/ITitle';
import { IImg } from '../widgets/IImg';
import { IIcon } from '../widgets/IIcon';
import { IBgImg } from '../widgets/IBgImg';
import { IBtn } from '../widgets/IBtn';

export interface IShowcase1v1 extends ICombsBase {
  title?: ITitle;
  subTitle?: IText;
  style?: string;
  row?: number;
  elements: any[];
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

export interface IShowcase2v5 extends ICombsBase {
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
  text: IText;
  elements: {
    img: IImg;
    content: IText;
  }[];
}

export interface IShowcase3v3 extends ICombsBase {
  type: string;
  feature?: IFeatureBox;
  showImage?: boolean;
  title: ILink;
  date: string;
  commentCount?: string;
  category: string;
  body: string;
  details: IBtn;
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
  digit: {
    value: number;
    label: string;
  };
  title: string;
  desc?: string;
}
