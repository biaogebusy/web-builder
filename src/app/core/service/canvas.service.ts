import { Injectable, Injector } from '@angular/core';
import html2canvas from 'html2canvas';
import { DialogService } from '@core/service/dialog.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  constructor(private injector: Injector) {}

  openDialog(element: HTMLElement,options = {}): void {
    const util = this.injector.get(UtilitiesService);
    const dialogService = this.injector.get(DialogService);
    util.openSnackbar('切换全屏，浏览到底部再点击下载', 'ok');
    html2canvas(element, options).then((canvas) => {
      console.log(canvas);
      dialogService.openDynamicDialog({
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
