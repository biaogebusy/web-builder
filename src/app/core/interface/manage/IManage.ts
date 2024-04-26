import { IPaginationLinks } from '../widgets/IPaginationLinks';

export interface IManageAssets {
  elements: any[];
  links: IPaginationLinks;
  type?: string;
}

export interface IManageMedia {
  type: 'manage-media';
}

export interface IMediaSelect {
  src: string;
  alt: string;
  fileName: string;
  tag: 'img';
}
