import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-progress-group',
  templateUrl: './progress-group.component.html',
  styleUrls: ['./progress-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressGroupComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
