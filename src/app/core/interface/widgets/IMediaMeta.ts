import { ILink } from './ILink';

export interface IMediaMeta {
  type?: 'media-meta';
  date: string;
  more: ILink;
  link: ILink;
  body: string;
}
