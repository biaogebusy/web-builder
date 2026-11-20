import type { MatDialog } from '@angular/material/dialog';
import type { TranslateService } from '@ngx-translate/core';
import type { Observable } from 'rxjs';
import type { IDialog } from '@core/interface/IDialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

/** Confirm discarding edits before a query-parameter-only language switch. */
export function confirmBrandingLanguageSwitch(
  dialog: MatDialog,
  translate: Pick<TranslateService, 'instant'>
): Observable<unknown> {
  const config: IDialog = {
    title: translate.instant('BUILDER.EDIT_BRANDING.SWITCH_LANG_TITLE'),
    yesLabel: translate.instant('BUILDER.EDIT_BRANDING.SWITCH_LANG_YES'),
    noLabel: translate.instant('BUILDER.EDIT_BRANDING.SWITCH_LANG_NO'),
    inputData: {
      content: {
        type: 'text',
        fullWidth: true,
        body: translate.instant('BUILDER.EDIT_BRANDING.SWITCH_LANG_CONFIRM'),
      },
    },
  };
  return dialog.open(DialogComponent, { width: '360px', data: config }).afterClosed();
}
