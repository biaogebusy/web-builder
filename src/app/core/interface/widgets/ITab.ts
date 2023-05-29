import { IBgImg } from './IBgImg';
import { IText } from './IText';
export interface ITab {
  id?: string;
  spacer?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  fullWidth: boolean;
  text: IText;
  classes: object | string;
  elements: any[];
  bg: IBgImg;
  align: 'start' | 'center' | 'end';
  pills?: boolean;
}
