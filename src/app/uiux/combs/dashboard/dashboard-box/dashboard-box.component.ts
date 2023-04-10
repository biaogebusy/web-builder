import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-dashboard-box',
  templateUrl: './dashboard-box.component.html',
  styleUrls: ['./dashboard-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardBoxComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
