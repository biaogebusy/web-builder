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
  button: Button;
  params: {
    url: string;
  };
}
