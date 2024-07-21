import { FormlyFieldConfig } from '@ngx-formly/core';
import { ICombsBase } from './combs/ICombsBase';
import { ICard1v1 } from './widgets/ICard';
import { IIcon } from './widgets/IIcon';
import { IBgImg } from './widgets/IBgImg';
import { ILink } from './widgets/ILink';
import { IBtn } from './widgets/IBtn';
import { IMainMenu } from './branding/IBranding';

export interface IBuilderComponent {
  label: string;
  description?: string;
  id?: string;
  elements: IBuilderComponentElement[];
}

export interface IBuilderComponentElement {
  label?: string;
  id?: string;
  icon?: IIcon;
  type?: string;
  provide?: 'CORE_CONFIG' | 'BRANDING';
  child?: IBuilderComponentElement[];
  content?: {
    type?: string;
    name?: string;
    child?: any[];
  };
}

export interface IUiux {
  label: string;
  icon: IIcon;
  type: 'base' | 'component' | 'sample' | 'system';
  elements: IBuilderComponent[] | IBuilderSamplePage | any;
}

export interface IBuilderDynamicContent {
  mode?: 'push' | 'over' | 'side';
  hasBackdrop?: any;
  elements: any[];
  style?: any;
}

export interface IBuilderSamplePage {
  label: string;
  elements: ISample[];
}

export interface ISample {
  label: string;
  id: string;
  icon: IIcon;
  page: any;
}

export interface IBuilderShowcase {
  title: string;
  card: ICard1v1;
}

export interface ILayoutBuilder extends ICombsBase {
  fullWidth: boolean;
  style?: any;
  horizontal: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  vertical: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  wrapperClass?: any;
  animate?: any;
  bgClasses?: string;
  overlay?: string;
  gap?: {
    xs?: number | string;
    sm?: number | string;
    md?: number | string;
    lg?: number | string;
  };
  elements: ILayoutBlock[];
}

export interface ILayoutBlock {
  classes: any;
  blockClasses?: any;
  style?: any;
  row: {
    [key: string]: number;
  };
  animate?: any;
  bg?: IBgImg;
  elements: any[];
  horizontal: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  vertical: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: {
    xs?: number | string;
    sm?: number | string;
    md?: number | string;
    lg?: number | string;
  };
}

export interface ILayoutSetting {
  type: 'layout-setting';
  fields: FormlyFieldConfig[];
  pageIndex?: number;
  content?: any;
  path?: string;
}

export interface IWidgetPicker {
  type: 'widget-picker';
  addType: 'widget' | 'layout';
  path: string;
  content: any;
}

export interface IMetaEdit {
  type: string;
  data: any;
  path: string;
  ele: HTMLElement | EventTarget | any | null;
  mode: 'img' | 'text';
  fields?: FormlyFieldConfig[];
}

export interface ICustomTemplate extends ICombsBase {
  type: string;
  html: string;
  json: any;
  isAPI?: boolean;
  api?: string;
}

export interface ICodeEditor {
  content: {
    html: string;
    json?: any;
    isAPI?: boolean;
    api?: string;
  };
  path: string;
}

export interface IPageList {
  rows: IPageMeta[];
  pager: {
    current_page: null;
    items_per_page: null;
    total_items: null;
    total_pages: null;
  };
}

export interface IPageMeta {
  author: string;
  changed: string;
  id: string;
  uuid: string;
  langcode: string;
  title: string;
  url: string;
}

export interface IBuilderConfig {
  menu: IMainMenu[];
}

export interface IBuilderMenu extends ILink {
  icon: IIcon;
  child?: IBtn[];
}
