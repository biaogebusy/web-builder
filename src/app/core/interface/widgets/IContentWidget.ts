import { ILink } from './ILink';
import { IImg } from './IImg';
import { IRatios } from './IWidgets';
import { IText } from './IText';

export interface IContentBox extends IRatios {
  img: IImg;
  subTitle: ILink;
  title: ILink;
}

export interface IContentTextCenter extends IRatios {
  img: IImg;
  text: IText;
}
