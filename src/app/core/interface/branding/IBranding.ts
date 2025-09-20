import { ILink } from '@core/interface/widgets/ILink';
import { IImg } from '@core/interface/widgets/IImg';
import { IIcon } from '@core/interface/widgets/IIcon';
import { FormlyFieldConfig } from '@ngx-formly/core';
export interface IBranding {
  header: IHeader;
  footer?: IFooter;
}
export interface IHeader {
  params: IHeaderParams;
  logo?: ILogo;
  top?: IHeaderTop;
  banner?: any;
  mainMenu: IMainMenu[];
  search: IHeaderSearch;
  actions: ILink[];
}

export interface IHeaderTop {
  banner: {
    left: Left[];
    right: Right[];
  };
}

interface Right {
  label: string;
  href: string;
  svg?: string;
}

interface Left {
  icon: IIcon;
  label: string;
}

export interface IHeaderParams {
  themeSwitch: boolean;
  userInfo: boolean;
  isMegaMenu?: boolean;
  menuHoverOpen: boolean;
  inverse?: boolean;
}

export interface IFooter {
  params: FooterParams;
  footerBrand?: FooterBrand;
  mainMenu?: FooterMenu[];
  mobileMenu?: FooterMenu[];
  footerNewsletter?: FooterNewsletter;
  footerBottom?: FooterBottom;
  fixBar?: any[];
  logo?: {
    label: string;
  };
  copyRight?: string;
  content?: {
    left: {
      spacer: string;
      body: string;
    };
    middle: {
      spacer: string;
      body: string;
    };
  };
}

interface FooterBottom {
  left: string;
  right: ILink[];
}

interface FooterNewsletter {
  params: LetterParams;
  label: string;
  summary: string;
  form: FormlyFieldConfig[];
  action: {
    label: string;
  };
}

interface LetterParams {
  webform_id: string;
}

interface FooterMenu {
  label: string;
  child: ILink[];
}
interface FooterBrand {
  logo: {
    img: IImg;
  };
  summary?: string;
  social?: Social[];
}

interface Social {
  label: string;
  icon: IIcon;
  href: string;
}

interface FooterParams {
  mode: 'light' | 'inverse';
  shape?: boolean;
}

export interface IHeaderSearch {
  enable: boolean;
  placeholder: string;
  tooltip: string;
  link: string;
  type: string;
  key: string;
  value?: string;
}

export interface IMainMenu extends ILink {
  label: string;
  classes?: string;
  href?: string;
  queryParams?: QueryParams;
  fragment?: string;
  expanded?: boolean;
  icon?: IIcon;
  child?: IMainMenu[];
  dynamicMenu?: boolean;
  uuid?: string;
}

interface QueryParams {
  demo: string;
}

export interface ILogo {
  label: string;
  version: boolean;
  href: string;
  img?: IImg;
  invert?: string;
}
