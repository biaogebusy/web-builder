import { IImg } from '@core/interface/widgets/IImg';
import { ILink } from '@core/interface/widgets/ILink';
import { IIcon } from './IIcon';

export interface ICard {
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
  progressBar?: {
    mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
    value: number;
  };
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

export interface IInlineLightbox {
  label: string[];
  elements: ILightboxElement[];
}

export interface ILightboxElement {
  src: string;
  preview?: string;
  caption: string;
  thumb: string;
  downloadUrl: string;
}

export interface IDynamicTable {
  params?: {
    sticky: boolean;
    style: object;
  };
  header: {
    label: string;
    key: string;
    classes?: string | string[] | Set<string> | { [klass: string]: any };
    style?: object;
    dialog?: {
      shorten: number;
      label: string;
    };
  }[];
  classes?: string | string[] | Set<string> | { [klass: string]: any };
  elements: any[];
}
