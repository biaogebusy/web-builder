import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { IBannerSimple } from '@core/interface/combs/IBanner';

@Component({
    selector: 'app-banner-simple',
    templateUrl: './banner-simple.component.html',
    styleUrls: ['./banner-simple.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BannerSimpleComponent {
  @Input() content: IBannerSimple;
  constructor() {}

}
