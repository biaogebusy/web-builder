import { IImg } from './IImg';
import { ILink } from './ILink';

export interface IMediaList {
  type?: 'media-list';
  title: string;
  elements: IElement[];
}

interface IElement {
  img: IImg;
  link: ILink;
  changed: string;
}
