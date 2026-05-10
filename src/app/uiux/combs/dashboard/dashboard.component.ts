import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { IDashboard } from '@core/interface/combs/IDashboard';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DashboardComponent {
  @Input() content: IDashboard;
  constructor() {}

}
