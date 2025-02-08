import { Component, OnInit, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type { IUserConfig } from '@core/interface/IUserConfig';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';
import { UserService } from '@core/service/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  private user$ = inject<Observable<IUser>>(USER);

  @Input() content: any;
  @Input() userConfig$: Observable<IUserConfig>;
  user: IUser;
  userService = inject(UserService);

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  logout(): void {
    this.userService.logout(this.user.logout_token);
  }
}
