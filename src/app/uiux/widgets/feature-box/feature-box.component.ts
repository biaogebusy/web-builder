import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
@Component({
  selector: 'app-feature-box',
  templateUrl: './feature-box.component.html',
  styleUrls: ['./feature-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureBoxComponent implements OnInit {
  @Input() content: any;
  constructor(
    private lightbox: Lightbox,
    private lightboxConfig: LightboxConfig
  ) {
    this.lightboxConfig.disableScrolling = true;
    this.lightboxConfig.centerVertically = true;
  }

  ngOnInit(): void {}

  open(img: any): void {
    this.lightbox.open([
      {
        src: img.src,
        caption: img.alt || 'Lightbox',
        thumb: img.src,
      },
    ]);
  }
}
