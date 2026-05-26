import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  @Input() content: ILogo | undefined;
  @Input() isInvert: boolean;
  public img: IImg;

  ngOnInit(): void {
    if (!this.isInvert && this.content?.img) {
      this.img = this.content.img;
    } else {
      this.img = { ...this.content?.img, src: this.content?.invert || '' };
    }
  }
}
