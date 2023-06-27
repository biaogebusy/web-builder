import { IIcon } from './widgets/IIcon';

export interface IBuilderComponent {
  label: string;
  id?: string;
  elements: IBuilderComponentElement[];
}

export interface IBuilderComponentElement {
  label?: string;
  icon?: IIcon;
  content: {
    type?: string;
    name?: string;
    child?: any[];
  };
}

export interface IBuilderTab {
  label: string;
  icon: IIcon;
  type: 'base' | 'component';
  elements: IBuilderComponent[];
}

export interface IBuilderDynamicContent {
  mode?: 'push' | 'over' | 'side';
  hasBackdrop?: any;
  elements: any[];
  style?: any;
}

export interface IBuilderSample {
  label: string;
  elements: ISample[];
}

export interface ISample {
  label: string;
  id: string;
  icon: IIcon;
  page: any;
}
