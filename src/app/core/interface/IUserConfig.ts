import { IIcon } from '@core/interface/widgets/IIcon';
export interface IUserConfig {
  menu: {
    label: string;
    href: string;
    icon: IIcon;
  }[];
}
