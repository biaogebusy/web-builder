import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { IAction1v1 } from '@core/interface/combs/IAction';

@Component({
  selector: 'app-action1v1',
  templateUrl: './action1v1.component.html',
  styleUrls: ['./action1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Action1v1Component implements OnInit {
  @Input() content: IAction1v1;
  constructor() {}

  ngOnInit(): void {}
}
