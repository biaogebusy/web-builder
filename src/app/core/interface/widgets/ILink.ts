import { MatDialogConfig } from '@angular/material/dialog';
import { Params } from '@angular/router';

export interface ILink {
  type?: 'link';
  href?: string;
  classes?: any;
  target?: string;
  label: any;
  popup?: any;
  queryParams?: Params | null;
  fragment?: string;
  rel?: string;
  params?: any;
  color?: string;
  dialog?: {
    params: MatDialogConfig;
    data: any[];
    afterClosed?: {
      success: {
        label: string;
      };
      emit: boolean;
    };
  };
}
