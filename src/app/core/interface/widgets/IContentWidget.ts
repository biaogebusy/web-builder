import { ILink } from './ILink';
import { IImg } from './IImg';
import { IRatios } from './IWidgets';
import { IText } from './IText';

export interface IContentBox extends IRatios {
  type: 'content-box';
  img: IImg;
  subTitle: ILink;
  title: ILink;
}

export interface IContentTextCenter extends IRatios {
  type: 'content-text-center';
  img: IImg;
  text: string;
}
