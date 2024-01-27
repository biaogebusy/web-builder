export interface IThemePreview {
  type: 'theme-preview';
  top: any[];
  bgColors: {
    row: number;
    lists: {
      classes: string;
      label: string;
    }[];
  };
  row: any[];
  columns: any[];
}
