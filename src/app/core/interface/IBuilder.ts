import { IIcon } from './widgets/IIcon';

export interface IBuilderComponent {
  label: string;
  elements: IBuilderComponentElement[];
}

export interface IBuilderComponentElement {
  content: any;
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
