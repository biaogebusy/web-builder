import { Component, inject, ChangeDetectionStrategy, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IDialog } from '@core/interface/IDialog';
import type { IBtnVideo } from '@core/interface/widgets/IBtn';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-btn-video',
  templateUrl: './btn-video.component.html',
  styleUrls: ['./btn-video.component.scss'],
  imports: [MatButtonModule, MatIconModule],
})
export class BtnVideoComponent {
  readonly content = input.required<IBtnVideo>();
  private dialog = inject(MatDialog);


  openVideo(): void {
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: this.content().video,
      },
    };
    this.dialog.open(DialogComponent, {
      width: this.content().dialog?.width || '800px',
      height: this.content().dialog?.height || 'auto',
      panelClass: ['close-outside', 'dialog-p-0', 'close-icon-white'],
      data: config,
    });
  }
}
