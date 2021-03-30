export interface ICard {
  title?: string;
  subTitle?: string;
  body: string;
  img?: {
    src: string;
    alt?: string;
    hostClasses?: any;
    classes?: any;
  };
  carousel?: {
    parmas?: any;
    elements: any[];
  };
  overlay?: any[];
  link?: {
    href: string;
    label: string;
  };
  actions?: any;
}
