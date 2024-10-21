import { Injectable, inject } from '@angular/core';
import html2canvas from 'html2canvas';
import { DialogService } from '@core/service/dialog.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  utli = inject(UtilitiesService);
  dialogService = inject(DialogService);

  openDialog(element: HTMLElement, options = {}): void {
    this.utli.openSnackbar('切换全屏，浏览到底部再点击下载', 'ok');
    html2canvas(element, options).then((canvas) => {
      console.log(canvas);
      this.dialogService.openDynamicDialog({
        content: [
          {
            type: 'img',
            classes: '',
            src: canvas.toDataURL(),
            alt: '',
          },
        ],
      });
    });
  }
}
