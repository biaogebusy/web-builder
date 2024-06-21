export interface INumberAnimate {
  type?: 'number-animate';
  value: number;
  label?: string;
  from?: number;
  step?: number;
  style?: object | null;
}
