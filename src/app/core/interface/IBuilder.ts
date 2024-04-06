import { FormlyFieldConfig } from '@ngx-formly/core';
import { ICombsBase } from './combs/ICombsBase';
import { ICard1v1 } from './widgets/ICard';
import { IIcon } from './widgets/IIcon';
import { IBgImg } from './widgets/IBgImg';

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
  direction: 'column' | 'row' | 'row wrap';
  layoutAlign: string;
  gap?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  elements: ILayoutBlock[];
}

export interface ILayoutBlock {
  classes: any;
  style: any;
  row: {
    [key: string]: number;
  };
  animate?: any;
  bg?: IBgImg;
  elements: any[];
  direction: string;
  layoutAlign: string;
}

export interface ILayoutSetting {
  type: 'layout-setting';
  fields: FormlyFieldConfig[];
  pageIndex?: number;
  uuid: string;
  content?: any;
  level: 'block' | 'layout' | 'widget';
  path?: string;
}

export interface IWidgetPicker {
  type: 'widget-picker';
  addType: 'widget' | 'layout';
  path: string;
  pageIndex: number;
  uuid: string;
  content: any;
  level: 'block' | 'layout' | 'widget';
}

export interface IMetaEdit {
  type: string;
  data: any;
  path: string;
  ele: HTMLElement | EventTarget | any | null;
  mode: 'img' | 'text';
  fields?: FormlyFieldConfig[];
}
