import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
    selector: 'app-header-banner',
    templateUrl: './header-banner.component.html',
    styleUrls: ['./header-banner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HeaderBannerComponent {
  @Input() content: any;
  constructor() {}

}
