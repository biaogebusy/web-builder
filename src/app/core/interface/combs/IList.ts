import { IText } from '../widgets/IText';
import { ILink } from '../widgets/ILink';
import { IShowcase3v3 } from '@core/interface/combs/IShowcase';
import { ICombsBase } from './ICombsBase';
import { ITitle } from '../widgets/ITitle';
import { IBtn } from '../widgets/IBtn';
export interface IDynamicCardList {
  sidebar: any[];
  row: number;
  shadow: boolean;
  ratios:
    | 'media-140'
    | 'media-1-2'
    | 'media-1-1'
    | 'media-4-3'
    | 'media-16-9'
    | 'media-2-1';
}

export interface IDynamicCardList1v1 {
  header: IText;
  sidebar: any;
  row: number;
  params: {
    type: string;
  };
  ratios:
    | 'media-140'
    | 'media-1-2'
    | 'media-1-1'
    | 'media-4-3'
    | 'media-16-9'
    | 'media-2-1';
}

export interface IDynamicMediaList {
  showImage: boolean;
  readMoreLabel: string;
  sidebar: any[];
  params: {
    type: string;
    include: string;
    sort: string;
    limit: string;
  };
  ratios:
    | 'media-140'
    | 'media-1-2'
    | 'media-1-1'
    | 'media-4-3'
    | 'media-16-9'
    | 'media-2-1';
}

export interface IDynamicTextList {
  params: {
    type: string;
    options: string;
    sort: string;
    limit: string;
  };
  action: {
    icon: string;
    label: string;
  };
}

export interface IListThin {
  link: ILink;
  meta: {
    label: string;
  }[];
  actions: any[];
}

export interface ITaxonomyList {
  type: string;
  pager: any;
  elements: IShowcase3v3[];
  sidebar: any;
}

export interface ITaxonomyThinList {
  type: string;
  elements: any[];
  sidebar: any;
  pager: any;
}

export interface IList2v1 extends ICombsBase {
  type: string;
  params: any;
  elements: any[];
  title: ITitle;
  more: IBtn;
}
