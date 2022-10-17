import { ILink } from './ILink';

export interface IChipList {
  elements: {
    label: string;
    color?: 'primary' | 'warn' | 'accent';
    selected?: boolean;
    link?: ILink;
  }[];
}
