import { IImg } from './IImg';

export interface IFeatureBox {
  hoverIcon?: boolean;
  fullIcon?: string;
  openIcon?: string;
  openIframe?: boolean;
  ratios?: string;
  img: IImg;
  link?: string;
  mode?: 'float';
}
