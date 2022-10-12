import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { UtilitiesService } from '@core/service/utilities.service';
import type { IInlineLightbox } from '@uiux/widgets/IWidgets';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { DynamicWidgetsComponent } from '@uiux/widgets/dynamic-widgets/dynamic-widgets.component';

@Component({
  selector: 'app-inline-lightbox',
  templateUrl: './inline-lightbox.component.html',
  styleUrls: ['./inline-lightbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineLightboxComponent implements OnInit {
  @Input() content: IInlineLightbox;
  dialogRef: any;
  constructor(
    private lightbox: Lightbox,
    private util: UtilitiesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onLightbox(i: number): void {
    const src = this.content.elements[i].src;
    if (this.util.getFileType(src) === 'picture') {
      this.lightbox.open(this.content.elements, i);
    } else {
      this.dialogRef = this.dialog.open(DialogComponent, {
        width: '300px',
        data: {
          renderInputComponent: DynamicWidgetsComponent,
          inputData: {
            content: {
              type: 'text',
              spacer: 'none',
              title: {
                label: this.content.label[i],
                style: 'style-v4',
              },
              actions: [
                {
                  href: this.content.elements[i].src,
                  label: '下载',
                  target: '_blank',
                },
                {
                  href: this.content.elements[i].preview,
                  label: 'PDF 预览',
                  target: '_blank',
                },
              ],
            },
          },
        },
      });
    }
  }
}
