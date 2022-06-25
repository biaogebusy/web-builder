export interface IBranding {
  header: Header;
  footer: Footer;
}

interface Header {
  params: HeaderParams;
  logo: Logo;
  top: Top;
  mainMenu: MainMenu[];
  search: Search;
  userMenu: UserMenu[];
  actions: Child[];
}

interface HeaderParams {
  themeSwitch: boolean;
  userInfo: boolean;
  isMegaMenu: boolean;
  menuHoverOpen: boolean;
}

interface Footer {
  params: Params4;
  footerBrand: FooterBrand;
  mainMenu: MainMenu2[];
  mobileMenu: MainMenu2[];
  footerNewsletter: FooterNewsletter;
  footerBottom: FooterBottom;
}

interface FooterBottom {
  left: string;
  right: Child[];
}

interface FooterNewsletter {
  params: Params5;
  label: string;
  summary: string;
  forms: Form[];
  action: Action2;
}

interface Action2 {
  label: string;
}

interface Form {
  type: string;
  label: string;
  key: string;
  params: Params2;
  placeholder: string;
  hint: string;
  error: string;
}

interface Params5 {
  webform_id: string;
}

interface MainMenu2 {
  label: string;
  child: Child3[];
}

interface Child3 {
  label: string;
  icon: string;
  href: string;
  target: string;
}

interface FooterBrand {
  logo: Logo2;
  summary: string;
  social: Social[];
}

interface Social {
  label: string;
  svg: string;
  href: string;
}

interface Logo2 {
  img: Img;
}

interface Img {
  src: string;
  alt: string;
  href: string;
  classes: string;
}

interface Params4 {
  mode: string;
  shape: boolean;
  style: string;
}

interface UserMenu {
  label: string;
  icon: Icon;
  dialog?: Dialog;
  href?: string;
}

interface Dialog {
  content: Content[];
  actions: Action[];
}

interface Action {
  label: string;
  color: string;
  params: Params3;
}

interface Params3 {
  type: string;
  snackMes: string;
}

interface Content {
  type: string;
  key: string;
  label: string;
  placeholder: string;
  params?: Params2;
  errorMes?: string;
}

interface Params2 {
  required: boolean;
}

interface Icon {
  name: string;
}

interface Search {
  enable: boolean;
  placeholder: string;
  tooltip: string;
  link: string;
  type: string;
  key: string;
}

interface MainMenu {
  label: string;
  classes: string;
  href?: string;
  queryParams?: QueryParams;
  fragment?: string;
  child?: Child2[];
}

interface Child2 {
  label: string;
  child: Child[];
  href?: string;
}

interface Child {
  label: string;
  href: string;
}

interface QueryParams {
  demo: string;
}

interface Top {
  banner: Banner;
}

interface Banner {
  left: Left[];
  right: Right[];
}

interface Right {
  label: string;
  href: string;
  svg?: string;
}

interface Left {
  icon: string;
  label: string;
}

interface Logo {
  label: string;
  version: boolean;
  href: string;
}
