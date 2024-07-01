import { IPager } from '../widgets/IWidgets';

export interface IManageAssets {
  rows: any[];
  pager: IPager;
}

export interface IManageMedia {
  type: 'manage-media';
  time: Date;
}

export interface IMediaSelect {
  src: string;
  alt: string;
  fileName: string;
  tag: 'img';
}

export interface ISelectedMedia {
  img: IMediaSelect;
  value: IManageMedia;
  time?: Date;
}
