import { IImg } from './IImg';
import { ILink } from './ILink';
import { IIcon } from './IIcon';
export interface IMediaObject {
  type?: 'media-object';
  css3?: boolean;
  img?: IImg;
  icon?: IIcon;
  meta?: string;
  title?: string;
  subTitle?: string | null;
  link?: ILink;
  content?: string;
  align?: string;
}

export interface IMediaObjectGroup {
  type?: 'media-object-group';
  label: string;
  elements: IMediaObject[];
}
