import { IText } from './IText';
import { IBg } from './IBg';
export interface IHero1v3 {
  text: IText;
  right: any[];
  id?: string;
  bg: IBg;
  spacer: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
}
