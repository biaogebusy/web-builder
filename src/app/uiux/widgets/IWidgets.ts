import { IImg } from '@core/interface/widgets/IImg';
import { ILink } from '@core/interface/widgets/ILink';
import { IIcon } from '../../core/interface/widgets/IIcon';

export interface ICard {
  title?: string;
  subTitle?: string;
  avatar?: IImg;
  body?: any;
  classes?: any;
  img?: {
    src: string;
    alt?: string;
    hostClasses?: any;
    classes?: any;
  };
  header: {
    avatar: IImg;
    title: string;
    subTitle: string;
    icon: IIcon;
    meta: IMeta[];
  };
  footer: {
    meta: IMeta[];
  };
  carousel?: any;
  feature?: any;
  overlay?: any[];
  link: ILink;
  actions?: any;
  progressBar: {
    mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
    value: number;
  };
}

export interface IMeta {
  label: string;
  value: string;
}
