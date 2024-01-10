import { FormlyFieldConfig } from '@ngx-formly/core';
import { ICombsBase } from './combs/ICombsBase';
import { ICard1v1 } from './widgets/ICard';
import { IIcon } from './widgets/IIcon';
import { ITitle } from './widgets/ITitle';

export interface IBuilderComponent {
  label: string;
  id?: string;
  elements: IBuilderComponentElement[];
}

export interface IBuilderComponentElement {
  label?: string;
  icon?: IIcon;
  type?: string;
  provide?: 'CORE_CONFIG' | 'BRANDING';
  forLayout?: boolean;
  child: IBuilderComponentElement[];
  content: {
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
  elements: {
    classes: any;
    row: {
      [key: string]: number;
    };
    elements: any[];
    align: string;
  }[];
}

export interface ILayoutSetting {
  title: ITitle;
  fields: FormlyFieldConfig[];
  index: number;
  uuid: string;
  content: any;
}
