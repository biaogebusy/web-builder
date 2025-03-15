import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import type { IDashboard } from '@core/interface/combs/IDashboard';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DashboardComponent implements OnInit {
  content: IDashboard;
  constructor() {}

  ngOnInit(): void {}
}
