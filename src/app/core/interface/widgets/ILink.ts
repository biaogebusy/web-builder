import { MatDialogConfig } from '@angular/material/dialog';
import { Params } from '@angular/router';

export interface ILink {
  href?: string;
  classes?: any;
  target?: string;
  label: any;
  popup?: any;
  queryParams?: Params | null;
  fragment?: string;
  rel?: string;
  params?: any;
  dialog?: {
    params: MatDialogConfig;
    data: any[];
    afterClosed?: {
      sucess: {
        label: string;
      };
      emit: boolean;
    };
  };
}
