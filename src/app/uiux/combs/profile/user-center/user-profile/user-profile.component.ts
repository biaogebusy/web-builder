import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import type { IUserConfig } from '@core/interface/IUserConfig';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';
import { UserService } from '@core/service/user.service';

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
    private userService: UserService,
    @Inject(USER) private user: IUser
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.userService.logout(this.user.logout_token);
  }
}
