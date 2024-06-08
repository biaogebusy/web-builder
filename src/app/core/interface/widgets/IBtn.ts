import { ThemePalette } from '@angular/material/core';
import { IIcon } from './IIcon';
import { IPlayer } from '@core/interface/widgets/IPlayer';
import { IIframe } from './IWidgets';
import { MatDialogConfig } from '@angular/material/dialog';
export interface IBtn {
  type?: string;
  mode?: 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini-fab';
  classes?: object | string;
  href?: string;
  color?: ThemePalette;
  icon?: IIcon;
  label?: string | number;
  target?: string;
  drawerIframe?: boolean;
  disabled?: boolean;
  pill?: boolean;
}

export interface IBtnVideo {
  type: 'btn-video';
  color: 'primary' | 'accent' | 'warn';
  dialog?: MatDialogConfig;
  video: IPlayer | IIframe;
  classes?: string | object;
}
