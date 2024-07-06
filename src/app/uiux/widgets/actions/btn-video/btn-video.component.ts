import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { IBtnVideo } from '@core/interface/widgets/IBtn';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

@Component({
  selector: 'app-btn-video',
  templateUrl: './btn-video.component.html',
  styleUrls: ['./btn-video.component.scss'],
})
export class BtnVideoComponent implements OnInit {
  @Input() content: IBtnVideo;
  dialogRef: any;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openVideo(): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: this.content.dialog?.width || '800px',
      height: this.content.dialog?.height || 'auto',
      panelClass: ['close-outside', 'dialog-p-0', 'close-icon-white'],
      data: {
        disableCloseButton: true,
        inputData: {
          content: this.content.video,
        },
      },
    });
  }
}
