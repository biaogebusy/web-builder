import { IPaginationLinks } from '../widgets/IPaginationLinks';

export interface IManageAssets {
  elements: any[];
  links: IPaginationLinks;
  type?: string;
}

export interface IManageMedia {
  type: 'manage-media';
  uuid: string;
  pageIndex?: number;
  i?: number;
  index: number | undefined;
  level: 'block' | 'layout' | 'widget';
}

export interface IMediaSelect {
  src: string;
  alt: string;
  fileName: string;
  tag: 'img';
}
