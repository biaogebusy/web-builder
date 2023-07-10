import { IIcon } from './IIcon';
import { IImg } from './IImg';
import { ILink } from './ILink';
export interface IBox {
  type: 'box';
  style: string;
  icon?: IIcon;
  img?: IImg;
  title: ILink;
  content?: any;
  more?: ILink;
}
