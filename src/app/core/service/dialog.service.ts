import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TextComponent } from '../../uiux/widgets/text/text.component';
import { AppState } from '@core/mobx/AppState';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogState$ = new Subject();
  dialogRef: any;
  constructor(private dialog: MatDialog, private appState: AppState) {}

  closeDialog(): void {
    this.dialogState$.next(false);
  }

  forceDialog(config: any): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: config.width,
      disableClose: true,
      data: {
        renderInputComponent: TextComponent,
        disableCloseButton: true,
        inputData: {
          content: {
            title: {
              label: config.title,
              style: 'style-v1',
            },
            body: config.content,
            actions: config.actions,
          },
        },
      },
    });
  }
}
