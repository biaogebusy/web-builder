import { FormlyFieldConfig } from '@ngx-formly/core';
import { ICombsBase } from './combs/ICombsBase';
import { ICard1v1 } from './widgets/ICard';
import { IIcon } from './widgets/IIcon';
import { IBgImg } from './widgets/IBgImg';
import { ILink } from './widgets/ILink';
import { IBtn } from './widgets/IBtn';
import { IMainMenu } from './branding/IBranding';
import { ITitle } from './widgets/ITitle';

export interface IBuilderConfig {
  menu: IMainMenu[];
  newSection: any;
  tour: {
    enable: boolean;
    delay: number;
    steps: any[];
  };
  generater: FormlyFieldConfig[];
  api: {
    create: string;
    update: string;
    translate: string;
  };
  widgetPicker: {
    help: {
      tooltip: string;
      link: string;
    };
  };
  manageMedia: IBuilderManageMedia;
  codeEditor: {
    help: string;
  };
}

export interface IBuilderManageMedia {
  row: number;
  sidebar: {
    title: ITitle;
    form: FormlyFieldConfig[];
    action: IBtn;
  };
}

export interface IBuilderComponent {
  label: string;
  description?: string;
  id?: string;
  child: IBuilderComponentElement[];
}

export interface IBuilderComponentElement {
  label?: string;
  id?: string;
  uuid?: string;
  mark?: string;
  icon?: string;
  type?: string;
  child?: IBuilderComponentElement[];
  content?: {
    type?: string;
    name?: string;
    child?: any[];
  };
}

export interface IUiux {
  label: string;
  icon: string;
  type: 'base' | 'component' | 'sample' | 'system';
  elements: IBuilderComponent[] | IBuilderSamplePage | any;
}

export interface IBuilderDynamicContent {
  mode?: 'push' | 'over' | 'side';
  hasBackdrop?: any;
  elements: any[];
  style?: any;
  classes?: string;
  title: string;
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
  horizontal: IHorizontal;
  vertical: IVertical;
  alignItems?: IAlignItems;
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

export type IHorizontal = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type IVertical = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type IAlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export interface ILayoutBlock {
  classes: any;
  blockClasses?: any;
  style?: any;
  row: {
    [key: string]: number;
  };
  aos?: any;
  animate?: any;
  bg?: IBgImg;
  elements: any[];
  horizontal: IHorizontal;
  vertical: IVertical;
  alignItems?: IAlignItems;
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
  content?: any;
  path?: string;
  fullWidth: boolean;
}

export interface IWidgetPicker {
  type: 'widget-picker';
  addType: string;
  path: string;
  content: any;
}

export interface IWidgets {
  label: string;
  icon: IIcon;
  elements: any[];
}

export interface IMetaEdit {
  type: string;
  data: any;
  path: string;
  ele: HTMLElement | EventTarget | any | null;
  mode: 'img' | 'text';
  fields?: FormlyFieldConfig[];
  fullWidth: boolean;
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
  nid: string;
  uuid: string;
  langcode: string;
  title: string;
  url: string;
  cover?: string;
  taxonomy?: string;
}

export interface IBuilderMenu extends ILink {
  icon: IIcon;
  child?: IBtn[];
}

export interface IJSON {
  type: 'json';
  name: string;
  [key: string]: string;
}

export interface ICardList {
  params: {
    use: string;
    api: string;
    defaultImg: string;
    update: {
      api: string;
      type: string;
    };
  };
  form: FormlyFieldConfig[];
}
