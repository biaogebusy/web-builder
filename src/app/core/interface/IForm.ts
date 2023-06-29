export interface IAction {
  label: string;
  type?: string;
  color: string;
  params: IActionParams;
}

export interface IActionParams {
  type: string;
  snackMes?: string;
}
