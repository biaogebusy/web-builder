export interface INumberAnimate {
  type?: 'number-animate';
  value: number;
  label?: string;
  from?: number;
  duration?: number;
  style?: object | null;
}
