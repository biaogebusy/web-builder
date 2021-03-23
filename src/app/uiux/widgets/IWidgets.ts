export interface ICard {
  title?: string;
  body: string;
  img: {
    src: string;
    alt?: string;
    hostClasses?: any;
    classes?: any;
  };
  link?: {
    href: string;
    label: string;
  };
  actions?: any;
}
