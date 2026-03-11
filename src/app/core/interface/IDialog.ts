export interface IDialog {
  disableActions?: boolean;
  title?: string;
  titleClasses?: string;
  inputData: any;
  yesLabel?: string;
  noLabel?: string;
  actionsAlign?: 'center' | 'start' | 'end';
}
