import { IBgImg } from '../widgets/IBgImg';
import { ILink } from '../widgets/ILink';
export interface IBannerSimple {
  type: string;
  style: object | string;
  bannerBg?: IBgImg;
  title?: string;
  breadcrumb?: ILink[];
}
