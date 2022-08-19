import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-showcase3v6',
  templateUrl: './showcase3v6.component.html',
  styleUrls: ['./showcase3v6.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase3v6Component extends BaseComponent implements OnInit {
  @Input() content: any;
  constructor(public userState: UserState) {
    super(userState);
  }

  ngOnInit(): void {}
}
