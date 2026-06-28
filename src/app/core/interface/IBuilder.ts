import { FormlyFieldConfig } from '@ngx-formly/core';
import { ICombsBase } from './combs/ICombsBase';
import { ICard1v1 } from './widgets/ICard';
import { IIcon } from './widgets/IIcon';
import { IBgImg } from './widgets/IBgImg';
import { ILink } from './widgets/ILink';
import { IBtn } from './widgets/IBtn';
import { IMainMenu } from './branding/IBranding';
import { ITitle } from './widgets/ITitle';
import type { IDynamicInputs, IPage } from './IAppConfig';
import type { CssClassValue, CssStyleValue, JsonObject, JsonValue } from './common';

export interface IBuilderConfig {
  menu: IMainMenu[];
  newSection: IDynamicInputs;
  tour: {
    enable: boolean;
    delay: number;
    steps: JsonObject[];
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
  icon?: string;
  child: IBuilderComponentElement[];
}

export interface IBuilderComponentElement {
  label?: string;
  id?: string;
  uuid?: string;
  mark?: string;
  icon?: string;
  type?: string;
  preview?: string;
  child?: IBuilderComponentElement[];
  content?: {
    type?: string;
    name?: string;
    child?: IDynamicInputs[];
  };
}

export interface IUiux {
  label: string;
  icon: string;
  type: 'base' | 'component' | 'sample' | 'system';
  elements: IBuilderComponent[] | IBuilderSamplePage;
}

export interface IBuilderDynamicContent {
  mode?: 'push' | 'over' | 'side';
  hasBackdrop?: boolean;
  elements: IDynamicInputs[];
  style?: CssStyleValue;
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
  page: IPage;
}

export interface IBuilderShowcase {
  title: string;
  card: ICard1v1;
}

export interface ILayoutBuilder extends ICombsBase {
  fullWidth: boolean;
  style?: CssStyleValue;
  horizontal: IHorizontal;
  vertical: IVertical;
  alignItems?: IAlignItems;
  wrapperClass?: CssClassValue;
  animate?: JsonObject;
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
  classes: CssClassValue;
  blockClasses?: CssClassValue;
  style?: CssStyleValue;
  row: Record<string, number>;
  aos?: JsonObject;
  animate?: JsonObject;
  bg?: IBgImg;
  elements: IDynamicInputs[];
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
  content: ILayoutSettingContent;
  path?: string;
  fullWidth: boolean;
}

export interface ILayoutSettingContent extends IDynamicInputs {
  type: string;
  elements?: IDynamicInputs[];
}

export interface IWidgetPicker {
  type: 'widget-picker';
  addType: string;
  path: string;
  content: {
    elements?: IDynamicInputs[];
  };
}

export interface IWidgets {
  label: string;
  icon: IIcon;
  elements: IDynamicInputs[];
}

export type IMetaEdit = IMetaTextEdit | IMetaImageEdit;

interface IMetaEditBase {
  type: string;
  path: string;
  fields?: FormlyFieldConfig[];
  fullWidth: boolean;
}

export interface IMetaTextEdit extends IMetaEditBase {
  mode: 'text';
  ele: HTMLElement;
  data: {
    innerHTML: string;
    tag: string;
  };
}

export interface IMetaImageEdit extends IMetaEditBase {
  mode: 'img';
  ele: HTMLImageElement;
  data: {
    src: string;
    fileName: string;
    alt: string | null;
    tag: string;
  };
}

export interface ICustomTemplate extends ICombsBase {
  type: string;
  html: string;
  json: JsonValue;
  isAPI?: boolean;
  api?: string;
  dialogs?: ICustomTemplateDialog[];
  /** 自定义 JS 逻辑（仅管理员可编辑），前台渲染后执行，可 return 清理函数 */
  js?: string;
}

export interface ICustomTemplateDialog {
  key: string;
  params?: {
    width?: string;
    height?: string;
    panelClass?: string | string[];
    [key: string]: JsonValue | string[] | undefined;
  };
  content: object | object[];
}

export interface ICodeEditor {
  content: {
    html: string;
    json?: JsonValue;
    isAPI?: boolean;
    api?: string;
    js?: string;
  };
  path: string;
  /** 打开编辑器后定位并选中的源码片段 */
  reveal?: string;
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
  [key: string]: JsonValue | undefined;
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
