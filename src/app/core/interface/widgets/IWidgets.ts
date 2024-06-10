import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { IImg } from './IImg';
import { IIcon } from '@core/interface/widgets/IIcon';
import { EChartsOption } from 'echarts';
import { ILink } from './ILink';
import { IBtn } from './IBtn';

export interface IInlineLightbox {
  type?: 'inline-lightbox';
  label: string[];
  elements: ILightboxElement[];
}

export interface ILightboxElement {
  src: string;
  preview?: string;
  caption?: string;
  thumb: string;
  downloadUrl?: string;
}

export interface IDynamicTable {
  type?: 'dynamic-table';
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

export interface IRatios {
  ratios:
    | 'media-140'
    | 'media-1-2'
    | 'media-1-1'
    | 'media-4-3'
    | 'media-16-9'
    | 'media-2-1';
}

export interface IIframe {
  type?: 'iframe';
  height?: string;
  width?: string;
  classes?: string | string[] | Set<string> | { [klass: string]: any };
  url: string;
  title?: string;
  id?: string;
  name?: string;
}

export interface IProgressBar {
  type?: 'progress-bar';
  label?: string;
  color?: ThemePalette;
  mode?: ProgressBarMode;
  value?: number;
  bufferValue?: number;
}

export interface IProgressGroup {
  type?: 'progress-group';
  elements: IProgressBar[];
}

export interface ITestimonial {
  type?: 'testimonial';
  style: object | string;
  img: IImg;
  title: string;
  subTitle: string;
  body: string;
}

export interface IChartBox {
  type?: 'chart';
  label: string;
  count: string;
  params: {
    [key: string]: string;
  };
  chart: EChartsOption;
}

export interface IPager {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
}

export interface INotify {
  link: ILink;
  icon: IIcon;
  message: string;
  date: string;
  action: string;
  uuid: string;
}

export interface IDropdowMenu {
  type?: 'dropdown-menu';
  btn: IBtn;
  child: any[];
}
