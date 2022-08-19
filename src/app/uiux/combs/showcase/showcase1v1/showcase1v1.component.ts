import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-showcase1v1',
  templateUrl: './showcase1v1.component.html',
  styleUrls: ['./showcase1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase1v1Component extends BaseComponent implements OnInit {
  @Input() content: any;
  constructor(public userState: UserState) {
    super(userState);
  }

  ngOnInit(): void {}
}
