import { ThemePalette } from '@angular/material/core';
import { IIcon } from './IIcon';
import { IVideo } from '@core/interface/widgets/IVideo';
import { IIframe } from './IWidgets';
import { MatDialogConfig } from '@angular/material/dialog';
export interface IBtn {
  type?: string;
  mode?: 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini-fab' | 'text';
  classes?: object | string;
  href?: string;
  color?: ThemePalette;
  icon?: IIcon;
  label?: string | number;
  target?: string;
  drawerIframe?: boolean;
  disabled?: boolean;
  pill?: boolean;
  iconPosition?: string;
  containerClasses?: string;
}

export interface IBtnVideo {
  type: 'btn-video';
  color: 'primary' | 'accent' | 'warn';
  dialog?: MatDialogConfig;
  video: IVideo | IIframe;
  classes?: string | object;
}
