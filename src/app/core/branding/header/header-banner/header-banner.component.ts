import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrls: ['./header-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DynamicComponentComponent],
})
export class HeaderBannerComponent {
  @Input() content: any;
  constructor() {}
}
