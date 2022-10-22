import { IText } from '../widgets/IText';
import { ILink } from '../widgets/ILink';
import { IShowcase3v3 } from '@core/interface/combs/IShowcase';
export interface IDynamicCardList {
  sidebar: any[];
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
  pager: any;
  elements: IShowcase3v3[];
  sidebar: any;
}

export interface ITaxonomyThinList {
  elements: any[];
  sidebar: any;
  pager: any;
}
