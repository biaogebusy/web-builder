export interface IIcon {
  type?: 'icon';
  color?: string;
  name?: string;
  svg?: string;
  inline?: boolean;
  style?: any;
  badge?: {
    value: string | number;
    position?: 'above' | 'below' | 'before' | 'after';
    size?: 'small' | 'medium' | 'large';
  };
}
