import { IBgImg } from '../widgets/IBgImg';
import { IText } from '../widgets/IText';

export interface ICombsBase {
  type: string;
  id?: string;
  bg?: IBgImg;
  spacer?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'none';
  text?: IText;
  classes?: object | string;
  row?: number | string;
  params?: any;
  fullWidth?: boolean;
}
