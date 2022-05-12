import { IImg } from '@core/interface/widgets/IImg';
import { ILink } from '@core/interface/widgets/ILink';

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
  };
  carousel?: any;
  feature?: any;
  overlay?: any[];
  link: ILink;
  actions?: any;
}
