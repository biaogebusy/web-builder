import { Component, Input, OnInit } from '@angular/core';
import type { IBtnVideo } from '@core/interface/widgets/IBtn';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
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
      data: {
        inputData: {
          content: this.content.video,
        },
      },
    });
  }
}
