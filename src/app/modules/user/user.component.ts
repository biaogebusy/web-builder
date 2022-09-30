import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/service/user.service';
import { UserState } from '@core/mobx/user/UserState';
import { ScreenService } from '@core/service/screen.service';
import { isEmpty } from 'lodash-es';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { IUser } from '@core/interface/IUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit, OnDestroy {
  currentUser: any;
  id: any;
  constructor(
    private cd: ChangeDetectorRef,
    private route: Router,
    private screenService: ScreenService,
    private userService: UserService,
    private userState: UserState,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(USER) private user: IUser
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.getUser();
      this.userState.userSub$.subscribe((user) => {
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
    const people = {};
    this.userService
      .getUserById(this.user.current_user.uid, this.user.csrf_token)
      .subscribe((res) => {
        const info = res.data[0];
        if (!info) {
          return;
        }
        const profile = {
          bannerBg: this.getBanner(),
          avatar: {
            src: info?.user_picture?.uri?.url || this.coreConfig.defaultAvatar,
            alt: info.name,
          },
          name: info.name,
          subTitle: info.display_name,
          details: {
            label: '个人资料',
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
              {
                icon: {
                  color: 'warn',
                  svg: 'arrow_right',
                  inline: true,
                },
                label: '角色',
                content: this.getRoles(info.roles),
              },
            ],
          },
        };
        this.currentUser = Object.assign(people, profile);
        this.cd.detectChanges();
      });
  }

  getBanner(): any {
    return {
      classes: 'bg-fill-width overlay overlay-80',
      img: {
        hostClasses: 'bg-center',
        src:
          this.coreConfig?.user?.banner ||
          '/assets/images/16-9/business-14.jpeg',
        alt: 'page title',
      },
    };
  }

  getRoles(roles: any): string[] {
    if (!roles || isEmpty(roles.data)) {
      return ['注册用户'];
    }
    return roles.map((rule: any) => {
      return rule.label;
    });
  }

  logout(): void {
    this.userState.logout(this.user.logout_token);
  }

  ngOnDestroy(): void {}
}
