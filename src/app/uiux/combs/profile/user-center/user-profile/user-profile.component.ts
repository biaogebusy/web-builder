import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IUserConfig } from '@core/interface/IUserConfig';
import { UserState } from '@core/mobx/user/UserState';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  @Input() content: any;
  @Input() userConfig$: Observable<IUserConfig>;
  constructor(private userState: UserState) {}

  ngOnInit(): void {}

  logout(): void {
    this.userState.logout();
  }
}
