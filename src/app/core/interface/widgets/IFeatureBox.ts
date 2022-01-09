import { IImg } from './IImg';
import { ILink } from './ILink';

export interface IFeatureBox {
  hoverIcon?: boolean;
  fullIcon?: string;
  openIcon?: string;
  ratios?: string;
  img: IImg;
  link: ILink;
}
