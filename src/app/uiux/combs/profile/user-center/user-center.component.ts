import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import type { IUserCenter } from '@core/interface/IUserCenter';
import { UserState } from '@core/mobx/user/UserState';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { isEmpty } from 'lodash-es';
import { Observable } from 'rxjs';
import { IUserConfig } from '../../../../core/interface/IUserConfig';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCenterComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @Input() content: IUserCenter;
  user: any;
  id: any;
  userConfig$: Observable<IUserConfig>;
  constructor(
    private cd: ChangeDetectorRef,
    private route: Router,
    private screenService: ScreenService,
    public userService: UserService,
    public userState: UserState
  ) {
    super(userState);
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.userConfig$ = this.userService.getUserConfig();
      this.getUser();
      this.userState.user$.subscribe((user) => {
        if (!user.authenticated) {
          setTimeout(() => {
            this.route.navigate(['user/login']);
          }, 2000);
        } else {
          window.location.reload();
        }
      });
    }
  }

  getUser(): any {
    if (!environment.production) {
      return;
    }
    const people = {};
    this.userService
      .getUserById(
        this.userState.currentUser.current_user.uid,
        this.userState.csrfToken
      )
      .subscribe((res) => {
        const info = res.data[0];
        if (!info) {
          return;
        }
        const profile = {
          avatar: {
            src: info?.user_picture?.uri?.url || this.userState.defaultAvatar,
            alt: info.name,
          },
          name: info.name,
          subTitle: info.display_name,
          details: {
            elements: [
              {
                icon: {
                  color: 'warn',
                  svg: 'arrow_right',
                  inline: true,
                },
                label: '邮箱',
                content: info.mail || '没有填写',
              },
              {
                icon: {
                  color: 'warn',
                  svg: 'arrow_right',
                  inline: true,
                },
                label: '手机',
                content: info.phone_number || '没有填写',
              },
            ],
          },
        };
        this.user = Object.assign(people, profile);
        this.cd.detectChanges();
      });
  }

  getRoles(roles: any): string[] {
    if (!roles || isEmpty(roles.data)) {
      return ['注册用户'];
    }
    return roles.map((rule: any) => {
      return rule.label;
    });
  }

  ngOnDestroy(): void {}
}
