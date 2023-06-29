import { IIcon } from './IIcon';

export interface IDownloadItem {
  type: string;
  label: string;
  icon: IIcon;
  href: string;
}

export interface IDownload {
  type: string;
  label: string;
  icon: IIcon;
  elements: IDownloadItem[];
}
