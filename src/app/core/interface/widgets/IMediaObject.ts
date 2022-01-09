import { IImg } from './IImg';
import { ILink } from './ILink';
export interface IMediaObject {
  css3: boolean;
  img: IImg;
  meta?: HTMLElement;
  title?: string;
  subTitle?: string;
  link?: ILink;
  content?: HTMLElement;
}
