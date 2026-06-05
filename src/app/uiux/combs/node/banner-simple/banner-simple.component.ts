import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import type { IBannerSimple } from '@core/interface/combs/IBanner';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { BgImgComponent } from '@uiux/widgets/bg-img/bg-img.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-banner-simple',
  templateUrl: './banner-simple.component.html',
  styleUrls: ['./banner-simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SafeHtmlPipe, BgImgComponent, BreadcrumbComponent],
})
export class BannerSimpleComponent {
  readonly content = input<IBannerSimple>();
  constructor() {}

}
