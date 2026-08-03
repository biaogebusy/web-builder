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
  readonly content = input.required<ILogo>();
  readonly isInvert = input<boolean>();
  public img: IImg;

  ngOnInit(): void {
    const content = this.content();
    // Logos render above the fold; eager-load by default so the brand image
    // never lazy-pops in after hydration (content can still override).
    if (!this.isInvert() && content?.img) {
      this.img = { priority: true, ...content.img };
    } else {
      this.img = { priority: true, ...content?.img, src: content?.invert || '' };
    }
  }
}
