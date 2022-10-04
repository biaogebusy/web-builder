import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { IUser } from '@core/interface/IUser';
import { UserState } from '@core/mobx/user/UserState';
import { USER } from '@core/token/token-providers';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-showcase3v6',
  templateUrl: './showcase3v6.component.html',
  styleUrls: ['./showcase3v6.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase3v6Component extends BaseComponent implements OnInit {
  @Input() content: any;
  constructor(public userState: UserState, @Inject(USER) public user: IUser) {
    super(userState);
  }

  ngOnInit(): void {}
}
