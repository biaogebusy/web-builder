import { ThemePalette } from '@angular/material/core';
import { ILink } from './ILink';

export interface IChipList {
  elements: {
    label: string;
    color?: ThemePalette;
    selected?: boolean;
    link?: ILink;
  }[];
}
