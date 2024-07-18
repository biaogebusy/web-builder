import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Inject,
  inject,
  OnDestroy,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import type { IUserConfig } from '@core/interface/IUserConfig';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';
import { UserService } from '@core/service/user.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @Input() content: any;
  @Input() userConfig$: Observable<IUserConfig>;
  user: IUser;
  userService = inject(UserService);
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(@Inject(USER) private user$: Observable<IUser>) {
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  logout(): void {
    this.userService.logout(this.user.logout_token);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
