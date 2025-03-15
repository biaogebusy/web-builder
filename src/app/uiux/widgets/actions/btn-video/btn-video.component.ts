import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialog } from '@core/interface/IDialog';
import type { IBtnVideo } from '@core/interface/widgets/IBtn';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

@Component({
  selector: 'app-btn-video',
  templateUrl: './btn-video.component.html',
  styleUrls: ['./btn-video.component.scss'],
})
export class BtnVideoComponent implements OnInit {
  @Input() content: IBtnVideo;
  private dialogRef: any;
  private dialog = inject(MatDialog);

  ngOnInit(): void {}

  openVideo(): void {
    const config: IDialog = {
      disableCloseButton: true,
      inputData: {
        content: this.content.video,
      },
    };
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: this.content.dialog?.width || '800px',
      height: this.content.dialog?.height || 'auto',
      panelClass: ['close-outside', 'dialog-p-0', 'close-icon-white'],
      data: config,
    });
  }
}
