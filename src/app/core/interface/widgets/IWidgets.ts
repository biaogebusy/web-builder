import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { IImg } from './IImg';
import { IIcon } from '@core/interface/widgets/IIcon';
import { EChartsOption } from 'echarts';

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
  height?: string;
  width?: string;
  classes?: string | string[] | Set<string> | { [klass: string]: any };
  url: string;
  title?: string;
  id?: string;
}

export interface IProgressBar {
  label?: string;
  color: ThemePalette;
  mode: ProgressBarMode;
  value: number;
  bufferValue: number;
}

export interface IProgressGroup {
  elements: IProgressBar[];
}

export interface ITestimonial {
  style: object | string;
  img: IImg;
  title: string;
  subTitle: string;
  body: string;
}

export interface IChart {
  toggle?: {
    label: string;
    icon?: IIcon;
    value: string;
  }[];
  options: EChartsOption;
}

export interface IPager {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
}
