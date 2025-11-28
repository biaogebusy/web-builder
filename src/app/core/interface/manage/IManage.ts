import { IPager } from '../widgets/IWidgets';

export interface IManageAssets {
  rows: IManageImg[];
  pager: IPager;
}

export interface IManageImg {
  title: string;
  thumb?: string;
  source?: string;
  id: string;
  uuid: string;
  src: string;
  vl?: string;
}

export interface IManageMedia {
  type: 'manage-media';
  time: Date;
  mode?: 'manage';
}

export interface IMediaSelect {
  src: string;
  alt: string;
  fileName: string;
  tag: 'img';
  uuid: string;
  vl?: string;
}

export interface ISelectedMedia {
  img: IMediaSelect;
  value: IManageMedia;
  time?: Date;
}

export interface IMediaAttr {
  changed: string;
  created: string;
  drupal_internal__fid: number;
  filemime: string;
  filename: string;
  filesize: number;
  langcode: string;
  status: boolean;
  uri: {
    url: string;
    value: string;
  };
}
