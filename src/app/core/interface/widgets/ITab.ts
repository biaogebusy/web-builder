import { ITitle } from './ITitle';
import { IBgImg } from './IBgImg';
export interface ITab {
  id?: string;
  spacer?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  fullWidth: boolean;
  title: ITitle;
  classes: object | string;
  elements: any[];
  bg: IBgImg;
  align: 'start' | 'center' | 'end';
  pills?: boolean;
}
