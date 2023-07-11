import { IBtn } from './IBtn';
import { IControl } from './IControl';

export interface ISearchAction {
  type: string;
  button: Button;
  form: IControl[];
}

export interface Button {
  label: string;
  color: string;
}

export interface IShare {
  type: string;
  button: {
    icon: string;
    label: string;
  };
  params: {
    url: string;
  };
}
