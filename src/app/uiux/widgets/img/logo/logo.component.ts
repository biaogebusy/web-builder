import { Component, Input, OnInit } from '@angular/core';
import type { ILogo } from '@core/interface/branding/IBranding';
import { IImg } from '@core/interface/widgets/IImg';
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone: false,
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
