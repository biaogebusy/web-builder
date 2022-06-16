import { MatDialogConfig } from '@angular/material/dialog';
import { Params } from '@angular/router';

export interface ILink {
  href: string;
  classes?: any;
  target?: string;
  label: any;
  queryParams?: Params | null;
  fragment?: string;
  dialog?: {
    params: MatDialogConfig;
    data: any[];
  };
}
