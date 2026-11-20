export interface IDialog {
  /** Hide default confirm/cancel buttons; content-owned action templates still render. */
  disableActions?: boolean;
  title?: string;
  titleClasses?: string;
  inputData: any;
  yesLabel?: string;
  noLabel?: string;
  actionsAlign?: 'center' | 'start' | 'end';
}
