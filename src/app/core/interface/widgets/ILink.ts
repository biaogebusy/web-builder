import { MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
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
  tooltip?: {
    message: string;
    position?: 'above' | 'below' | 'left' | 'right' | 'before' | 'after';
  };
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
