import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IFeatureBox } from '@core/interface/widgets/IFeatureBox';
import { UtilitiesService } from '@core/service/utilities.service';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
@Component({
  selector: 'app-feature-box',
  templateUrl: './feature-box.component.html',
  styleUrls: ['./feature-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureBoxComponent implements OnInit {
  @Input() content: IFeatureBox;
  box: IFeatureBox;
  type: string;
  constructor(
    private lightbox: Lightbox,
    private lightboxConfig: LightboxConfig,
    private utli: UtilitiesService,
    private cd: ChangeDetectorRef
  ) {
    this.lightboxConfig.disableScrolling = true;
    this.lightboxConfig.centerVertically = true;
    this.lightboxConfig.showRotate = true;
  }

  ngOnInit(): void {
    this.type = this.utli.getFileType(this.content.img.src);
    const iconPath = '/assets/icons';
    if (this.type === 'picture') {
      this.box = this.content;
    } else {
      this.box = {
        fullIcon: 'fullscreen',
        ratios: 'media-4-3',
        hoverIcon: true,
        openIcon: 'file_download',
        link: this.content.img.src,
        img: {
          classes: 'object-fill p-x-lg p-y-lg',
          src:
            this.type === 'pdf'
              ? `${iconPath}/file-pdf.svg`
              : this.type === 'excel'
              ? `${iconPath}/file-excel.svg`
              : `${iconPath}/file-word.svg`,
          alt: this.content.img.alt,
        },
      };
    }

    this.cd.detectChanges();
  }

  open(img: any): void {
    this.lightbox.open([
      {
        src: img.src,
        caption: img.alt || 'Lightbox',
        thumb: img.src,
        downloadUrl: img.src,
      },
    ]);
  }
}
