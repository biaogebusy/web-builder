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
