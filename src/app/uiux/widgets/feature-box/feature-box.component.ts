import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  input
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { IFeatureBox } from '@core/interface/widgets/IFeatureBox';
import type { IImg } from '@core/interface/widgets/IImg';
import { UtilitiesService } from '@core/service/utilities.service';
import { RouteService } from '@core/service/route.service';
import { getFileType } from '@core/util/file-type.util';
import { DialogComponent } from '../dialog/dialog.component';
import { IDialog } from '@core/interface/IDialog';
import { IconComponent } from '../icon/icon.component';
import { ImgComponent } from '../img/img.component';
@Component({
  selector: 'app-feature-box',
  templateUrl: './feature-box.component.html',
  styleUrls: ['./feature-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, ImgComponent],
})
export class FeatureBoxComponent implements OnInit {
  readonly content = input.required<IFeatureBox>();
  box: IFeatureBox;
  type: string;
  isHoverIcon = true;
  title: string;

  private dialog = inject(MatDialog);
  private cd = inject(ChangeDetectorRef);
  private util = inject(UtilitiesService);
  private routerService = inject(RouteService);

  ngOnInit(): void {
    this.type = getFileType(this.content().img.src);
    const iconPath = '/assets/icons';
    const content = this.content();
    this.title = content.img.alt || this.getFileName(content.img.src);
    this.cd.detectChanges();
    if (this.type === 'picture') {
      this.box = this.content();
      this.cd.detectChanges();
    } else {
      this.box = {
        fullIcon: this.content().fullIcon || 'fullscreen',
        ratios: this.content().ratios || 'media-4-3',
        hoverIcon: true,
        openIcon: this.content().openIcon || 'file_download',
        link: this.content().img.src,
        img: {
          classes: 'object-fill p-x-lg p-y-lg',
          src:
            this.type === 'pdf'
              ? `${iconPath}/file-pdf.svg`
              : this.type === 'excel'
                ? `${iconPath}/file-excel.svg`
                : `${iconPath}/file-word.svg`,
          preview: this.content().img?.preview,
        },
      };
    }
    this.getHoverIcon();
    this.cd.detectChanges();
  }

  getFileName(src: string): string {
    return src.substring(src.lastIndexOf('/') + 1);
  }

  getHoverIcon(): void {
    const content = this.content();
    if (content.hoverIcon === undefined) {
      this.isHoverIcon = true;
      return;
    }
    if (content.hoverIcon) {
      this.isHoverIcon = true;
    } else {
      this.isHoverIcon = false;
    }

    this.cd.detectChanges();
  }

  open(img: IImg): void {
    if (this.content().openIframe) {
      this.routerService.toNavigate(null, {
        label: img.alt || '预览',
        href: img.preview || img.src,
        drawerIframe: true,
      });
      return;
    }
    if (this.type !== 'picture') {
      window.open(img.preview, '_blank');
      return;
    }
    const config: IDialog = {
      inputData: {
        content: {
          type: 'img',
          src: img.src,
        },
      },
    };
    this.dialog.open(DialogComponent, {
      data: config,
    });
  }

  copy(img: IImg): void {
    this.util.openSnackbar('已复制图片地址到粘贴板', 'ok');
    this.util.copy(img.src);
  }
}
