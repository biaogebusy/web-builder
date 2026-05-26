import { Component, OnInit, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { ILogo } from '@core/interface/branding/IBranding';
import { IImg } from '@core/interface/widgets/IImg';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ImgComponent } from '../img.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  imports: [ImgComponent, RouterModule, SafeHtmlPipe],
})
export class LogoComponent implements OnInit {
  readonly content = input<ILogo>();
  readonly isInvert = input<boolean>();
  public img: IImg;

  ngOnInit(): void {
    const content = this.content();
    if (!this.isInvert() && content?.img) {
      this.img = content.img;
    } else {
      this.img = { ...content?.img, src: content?.invert || '' };
    }
  }
}
