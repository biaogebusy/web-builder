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
