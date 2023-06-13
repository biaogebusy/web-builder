import { IText } from '../interface/widgets/IText';
import { IAmap } from '../interface/IAmap';
import { IDownload } from './widgets/IDownload';
import { IIcon } from './widgets/IIcon';
export interface IAppConfig {
  defTheme: string;
  config?: ICoreConfig | null;
  page: IPage;
}
export interface ICoreConfig {
  defaultTheme: string;
  theme: ITheme[];
  login: ILogin;
  defaultLogo: string;
  defaultAvatar: string;
  defaultThumb: string;
  amap: IAmap;
  apiUrl: IApiUrl;
  loading: boolean;
  loadingBar: boolean;
  article: IArticle;
  editor: IEditor;
  actions: IActions;
  dialog: IDialog;
  user: User;
  commerce: Commerce;
  googleAnalytics: GoogleAnalytics;
  guard: Guard;
  builder?: {
    enable: boolean;
    params: {
      reqRoles: string[];
    };
    empty: any;
  };
  access: {
    check: true;
  };
  qidian: {
    id: string;
    key: string;
  };
  notify?: {
    enable: boolean;
    params: {
      interval: number;
      dateFormat: string;
    };
    api: INotify[];
  };
  animate?: boolean;
  checkIE?: {
    enable: boolean;
    dialog: {
      params: any;
      content: any;
    };
  };
}

export interface INotify {
  get: string;
  action: string;
  reqRoles?: string[];
  icon: string;
  color: string;
}
export interface ITheme {
  name: string;
  style: string;
  icon?: string;
  svgIcon?: string;
}

export interface PhoneLogin {
  enable: boolean;
  tabLabel: string;
  leftTime: number;
  submitLabel: string;
  error: string;
}

export interface PswLogin {
  enable: boolean;
  tabLabel: string;
  submitLabel: string;
}

export interface ILogin {
  loginRedirect: string;
  left: any;
  phoneLogin: PhoneLogin;
  pswLogin: PswLogin;
}

export interface Github {
  repos: string;
  api: string;
}

export interface IApiUrl {
  loginPath: string;
  logoutPath: string;
  userIdGetPath: string;
  nodeGetPath: string;
  commentGetPath: string;
  paymentPath: string;
  taxonomyGetPath: string;
  flaggingGetPath: string;
  userGetPath: string;
  yushan: string;
  search: any;
  github: Github;
}

export interface Form {
  label: string;
  key: string;
  value: number;
  type: string;
  placeholder: string;
  controlType: string;
  appearance: string;
  errorMes: string;
  tooltip: string;
  matTooltipPosition: string;
  suffix: string;
}

export interface FontSize {
  enable: boolean;
  form: Form[];
}

export interface Comment {
  enable: boolean;
}

export interface IArticle {
  fontSize: FontSize;
  comment: Comment;
  login: {
    label: string;
  };
}

export interface Modules {
  toolbar: any[][];
}

export interface IEditor {
  modules: Modules;
}

export interface ICoreFlag {
  icon: IIcon;
  enable: boolean;
}

export interface Button {
  icon: string;
  label: string;
}

export interface ICoreShare {
  button: Button;
  enable: boolean;
}

export interface ICoreDownload extends IDownload {
  enable: boolean;
}

export interface IActions {
  flag: ICoreFlag;
  share: ICoreShare;
  download: ICoreDownload;
}

export interface Params {
  width: string;
  path: string;
  first: boolean;
}

export interface Title {
  label: string;
  style: string;
}

export interface Action {
  type: string;
  label: string;
  color: string;
  href: string;
}

export interface Text {
  title: Title;
  spacer: string;
  body: string;
  actions: Action[];
  actionsAlign: string;
}

export interface ForceDialog {
  params: Params;
  text: Text;
}

export interface IDialog {
  forceDialog: ForceDialog;
}

export interface User {
  banner: string;
}
export interface Action2 {
  type: string;
  label: string;
  href: string;
  color: string;
}

export interface Commerce {
  vip: string;
  payNode: string;
  dialog: {
    spacer: string;
    title: {
      label: string;
      style: string;
    };
    body: string;
    actionsAlign: string;
    actions: Action2[];
  };
}

export interface GoogleAnalytics {
  id: string;
}

export interface Guard {
  authGuard: boolean;
  defaultDrupalLoginPage?: string;
  defaultFrontLoginPage?: string;
}

export interface IPage {
  meta?: any[];
  config?: any;
  title: string;
  body: any[];
}

export interface ICommerce {
  vip: string;
  payNode: string;
  dialog: IText;
}
