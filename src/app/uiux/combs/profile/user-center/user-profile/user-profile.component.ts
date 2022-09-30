import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IUserConfig } from '@core/interface/IUserConfig';
import { UserState } from '@core/mobx/user/UserState';
import { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  @Input() content: any;
  @Input() userConfig$: Observable<IUserConfig>;
  constructor(
    private userState: UserState,
    @Inject(USER) private user: IUser
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.userState.logout(this.user.logout_token);
  }
}
