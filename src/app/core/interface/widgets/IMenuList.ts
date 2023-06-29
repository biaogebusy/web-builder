import { ILink } from './ILink';
export interface IMenuList {
  title: string;
  elements: IMenuListItem[];
}

export interface IMenuListItem {
  link: ILink;
  label: string;
}
