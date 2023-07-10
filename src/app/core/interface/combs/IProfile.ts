import { ICommentConfig } from '../node/INode';
import { IBgImg } from '../widgets/IBgImg';
import { IBtn } from '../widgets/IBtn';
import { IIcon } from '../widgets/IIcon';
import { IImg } from '../widgets/IImg';
import { ITitle } from '../widgets/ITitle';

export interface IProfile1v1 {
  type: string;
  uuid?: string;
  bannerBg: IBgImg;
  avatar: IImg;
  name: string;
  subTitle?: string;
  details: {
    label: string;
    elements: item[];
  };
  leftBottom?: {
    title: ITitle;
    [key: string]: any;
  }[];
  actions: IBtn[];
  content: any[];
  comment?: ICommentConfig;
  params?: any;
}

interface item {
  icon: IIcon;
  label: string;
  content: string;
}
