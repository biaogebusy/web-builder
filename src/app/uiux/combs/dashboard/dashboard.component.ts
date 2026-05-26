import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { IDashboard } from '@core/interface/combs/IDashboard';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReqRolesDirective, DynamicComponentComponent],
})
export class DashboardComponent {
  readonly content = input<IDashboard>();
  constructor() {}

}
