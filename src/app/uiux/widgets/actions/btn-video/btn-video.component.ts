import { Component, Input, OnInit } from '@angular/core';
import type { IBtnVideo } from '@core/interface/widgets/IBtn';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import type { IPlayer } from '@core/interface/widgets/IPlayer';

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

  openVideo(video: IPlayer): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      data: {
        inputData: {
          content: {
            ...video,
          },
        },
      },
    });
  }
}
