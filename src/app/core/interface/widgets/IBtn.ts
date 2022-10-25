import { ThemePalette } from '@angular/material/core';
import { IIcon } from './IIcon';
import { IPlayer } from '@core/interface/widgets/IPlayer';
export interface IBtn {
  mode?: 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini-fab';
  classes?: object | string;
  href?: string;
  color?: ThemePalette;
  icon?: IIcon;
  label: string;
  target?: string;
}

export interface IBtnVideo {
  color: 'primary' | 'accent' | 'warn';
  video: IPlayer;
}
