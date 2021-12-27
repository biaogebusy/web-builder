import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TextComponent } from '../../uiux/widgets/text/text.component';
import { AppState } from '@core/mobx/AppState';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogState$ = new Subject();
  dialogRef: any;
  constructor(
    private dialog: MatDialog,
    private appState: AppState,
    @Inject(DOCUMENT) private doc: Document
  ) {}

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
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: config.params.width,
      disableClose: true,
      data: {
        renderInputComponent: TextComponent,
        disableCloseButton: true,
        inputData: {
          content: config.text,
        },
      },
    });
  }
}
