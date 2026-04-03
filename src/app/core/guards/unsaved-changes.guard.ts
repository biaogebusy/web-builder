import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { IDialog } from '@core/interface/IDialog';
import { map } from 'rxjs';

export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = component => {
  if (!component.hasUnsavedChanges()) {
    return true;
  }
  const dialog = inject(MatDialog);
  const config: IDialog = {
    title: '未保存的更改',
    yesLabel: '离开',
    noLabel: '留下',
    inputData: {
      content: {
        type: 'text',
        fullWidth: true,
        body: '你有未保存的更改，确定要离开吗？',
      },
    },
  };
  return dialog
    .open(DialogComponent, { width: '360px', data: config })
    .afterClosed()
    .pipe(map(result => !!result));
};
