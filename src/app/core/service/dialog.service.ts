import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { IDialog } from '@core/interface/IDialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(MatDialog);
  private doc = inject<Document>(DOCUMENT);

  public dialogState$ = new Subject();

  closeDialog(): void {
    this.dialogState$.next(false);
  }

  forceDialog(config: any): void {
    const first = this.doc.referrer;
    const path = this.doc.location.pathname;
    const params = config.params;
    if (!config) {
      return;
    }

    if (params.first && !first) {
      if (params.path) {
        if (path.includes(params.path)) {
          this.openDialog(config);
        }
      } else {
        this.openDialog(config);
      }
      return;
    } else {
      if (params.path) {
        if (path.includes(params.path)) {
          this.openDialog(config);
        }
        return;
      }
    }

    this.openDialog(config);
  }

  openDialog(config: any): void {
    const dateConfig: IDialog = {
      disableActions: true,
      inputData: {
        content: config.text,
      },
    };
    this.dialog.open(DialogComponent, {
      width: config.params.width,
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'force-dialog',
      backdropClass: 'force-backdrop',
      data: dateConfig,
    });
  }

  openDynamicDialog(config: any): void {
    this.dialog.open(DialogComponent, {
      ...config.params,
      data: {
        inputData: [...config.content],
      },
    });
  }

  handlerIframe(dialog: MatDialog): void {
    window.addEventListener(
      'message',
      event => {
        const origin = event.origin;
        if (origin !== window.location.origin) {
          return;
        }
        if (event.data === 'closeDialog') {
          dialog.closeAll();
        }
      },
      false
    );
  }
}
