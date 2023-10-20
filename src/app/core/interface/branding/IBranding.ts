import { ILink } from '@core/interface/widgets/ILink';
import { IImg } from '@core/interface/widgets/IImg';
import { IIcon } from '@core/interface/widgets/IIcon';
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
  sidebar?: {
    params: any;
    classes?: any;
    logo: ILogo;
    menu: IMainMenu[];
  };
  search: IHeaderSearch;
  userMenu: IUserMenu[];
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
  forms: Form[];
  action: {
    label: string;
  };
}

interface Form {
  type: string;
  label: string;
  key: string;
  params: any;
  placeholder: string;
  hint: string;
  error: string;
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
  svg: string;
  href: string;
}

interface FooterParams {
  mode: 'light' | 'inverse' | 'space-between';
  shape?: boolean;
  // style: string;
}

export interface IUserMenu {
  label: string;
  icon: {
    name: string;
  };
  dialog?: Dialog;
  href?: string;
}

interface Dialog {
  content: any;
  actions: Action[];
}

interface Action {
  label: string;
  color: string;
  params: {
    type: string;
    snackMes: string;
  };
}

interface Content {
  type: string;
  key: string;
  label: string;
  placeholder: string;
  params?: {
    required: boolean;
  };
  errorMes?: string;
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
}

interface QueryParams {
  demo: string;
}

export interface ILogo {
  label: string;
  version: boolean;
  href: string;
  img?: IImg;
}
