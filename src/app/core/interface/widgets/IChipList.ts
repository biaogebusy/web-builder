import { ThemePalette } from '@angular/material/core';
import { ILink } from './ILink';

export interface IChipList {
  type?: 'chip-list';
  classes?: string;
  elements: {
    label?: string;
    color?: ThemePalette;
    selected?: boolean;
    link?: ILink;
  }[];
}
