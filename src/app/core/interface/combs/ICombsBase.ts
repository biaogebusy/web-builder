import { IBg } from '../widgets/IBg';
import { IText } from '../widgets/IText';

export interface ICombsBase {
  id?: string;
  bg: IBg;
  spacer: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  text: IText;
}
