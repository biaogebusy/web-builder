export interface ICard {
  title?: string;
  body: string;
  img: string;
  link?: {
    href: string;
    label: string;
  };
  actions?: any;
}
