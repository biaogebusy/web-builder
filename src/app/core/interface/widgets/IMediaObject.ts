import { IImg } from './IImg';
import { ILink } from './ILink';
import { IIcon } from './IIcon';
export interface IMediaObject {
  css3: boolean;
  img: IImg;
  icon: IIcon;
  meta?: HTMLElement;
  title?: string;
  subTitle?: string;
  link?: ILink;
  content?: HTMLElement;
  align: string;
}
