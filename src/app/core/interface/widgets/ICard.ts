import { IIcon } from './IIcon';
import { IImg } from './IImg';
import { ILink } from './ILink';
import { IFeatureBox } from './IFeatureBox';
import { INumberAnimate } from './INumberAnimate';
import { IProgressBar } from './IWidgets';
import { IBgImg } from './IBgImg';

export interface ICard {
  type?: 'card';
  title?: string;
  subTitle?: string;
  avatar?: IImg;
  body?: any;
  classes?: any;
  img?: {
    src: string;
    alt?: string;
    hostClasses?: any;
    classes?: any;
  };
  header?: {
    avatar?: IImg;
    title?: string;
    subTitle?: string;
    icon?: IIcon;
    meta: IMeta[];
  };
  footer?: {
    meta: IMeta[];
  };
  carousel?: any;
  feature?: any;
  overlay?: any[];
  link?: ILink;
  actions?: any;
  progressBar?: IProgressBar;
}

export interface IMeta {
  label: string;
  value: any;
  params?: {
    line?: string;
    lightbox?: boolean;
    shorten?: number;
    dynamic?: boolean;
    dialog?: {
      label: string;
    };
  };
}

export interface ICard1v1 {
  type?: 'card-1v1';
  feature?: IFeatureBox;
  components?: any;
  link: ILink;
  moreLabel?: string;
  user?: string;
  time?: string;
  classes?: any;
}

export interface ICard1v2 {
  type?: 'card-1v2';
  bg: IBgImg;
  img: IImg;
  subTitle: string;
  link: ILink;
}

export interface ICard1v3 {
  type?: 'card-1v3';
  city?: string;
  elements: Card1v3Item[];
}

export interface ICard1v4 {
  type?: 'card-1v4';
  img: IImg;
  star?: number;
  title: string;
  subTitle?: string;
  body: string;
}

export interface Card1v3Item {
  title: string;
  address: string;
  params: {
    address: string;
    title: string;
  };
  meta: {
    icon: IIcon;
    label: string;
    value: string;
  }[];
  dialog?: any[];
}

export interface IUserCard {
  type?: 'user-card';
  menu: any[];
  count?: IUserCount[];
  content?: any[];
}

export interface IUserCount {
  digit: INumberAnimate;
  title: string;
}

export interface ICard1v5 {
  type?: 'card-1v5';
  title: string;
  body: string;
  more: ILink;
  footer: {
    label: string;
    icon: IIcon;
  };
}

export interface ICard1v6 {
  type?: 'card-1v6';
  title: {
    label: string;
    classes: any;
  };
  classes: any;
  prefix: string;
  number: number | string;
  suffix: string;
  body: string;
  actionsAlign: string;
  actions: any[];
}
