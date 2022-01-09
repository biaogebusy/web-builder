import { IImg } from './IImg';
import { ILink } from './ILink';

export interface IMediaList {
  title: string;
  elements: IElement[];
}

interface IElement {
  img: IImg;
  link: ILink;
  changed: HTMLElement;
}
