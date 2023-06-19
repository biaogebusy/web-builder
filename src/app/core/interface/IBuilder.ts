import { IIcon } from './widgets/IIcon';

export interface IBuilderComponent {
  label: string;
  id: string;
  elements: IBuilderComponentElement[];
}

export interface IBuilderComponentElement {
  content: {
    type: string;
    name?: string;
    child?: any[];
  };
}

export interface IBuilderWidget {
  label: string;
  elements: IBuilderElement[];
}

export interface IBuilderElement {
  label: string;
  icon: IIcon;
  content: any;
}
