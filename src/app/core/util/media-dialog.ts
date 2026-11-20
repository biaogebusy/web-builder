import type { MatDialogConfig } from '@angular/material/dialog';
import type { IDialog } from '@core/interface/IDialog';
import type { IManageMedia } from '@core/interface/manage/IManage';

/** Build media dialog data without importing the library or its runtime dependencies. */
export function buildMediaDialogConfig(
  content: Partial<Pick<IManageMedia, 'time' | 'purpose' | 'mode'>>,
  options: Omit<MatDialogConfig<IDialog>, 'data'>
): MatDialogConfig<IDialog> {
  return {
    ...options,
    data: {
      disableActions: true,
      inputData: {
        content: { type: 'manage-media', fullWidth: true, ...content },
      },
    },
  };
}
