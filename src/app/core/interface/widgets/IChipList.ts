import { ILink } from './ILink';

export interface IChipList extends ILink {
  label: string;
  color?: string;
  selected?: boolean;
}
