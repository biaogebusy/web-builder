import { ILink } from './ILink';

export interface IDropdownMenu extends ILink {
  child?: ILink[];
}
