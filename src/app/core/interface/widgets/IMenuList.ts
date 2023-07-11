import { ILink } from './ILink';
export interface IMenuList {
  type?: 'menu-list';
  title: string;
  elements: IMenuListItem[];
}

export interface IMenuListItem {
  link: ILink;
  label: string;
}
