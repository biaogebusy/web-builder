import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import type { ILink } from '@core/interface/widgets/ILink';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { LinkComponent } from '@uiux/widgets/link/link.component';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, LinkComponent],
})
export class BreadcrumbComponent {
  readonly content = input<ILink[]>();
  constructor() {}

}
