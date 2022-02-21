import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@core/service/user.service';
import { UserState } from '@core/mobx/user/UserState';
import { ScreenService } from '@core/service/screen.service';
import { AppState } from '@core/mobx/AppState';
import { isEmpty } from 'lodash-es';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit, OnDestroy {
  user: any;
  id: any;
  constructor(
    private appState: AppState,
    private cd: ChangeDetectorRef,
    private router: ActivatedRoute,
    private route: Router,
    private screenService: ScreenService,
    private userService: UserService,
    private userState: UserState
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.router.paramMap.subscribe((query) => {
        this.id = query.get('id');
        this.getUser(this.id);
      });
      this.userState.user$.subscribe((user) => {
        if (!user.authenticated) {
          setTimeout(() => {
            this.route.navigate(['user/login']);
          }, 2000);
        }
      });
    }
  }

  getUser(id: string): any {
    const people = {};

    this.userService
      .getUserById(id, this.userState.csrfToken)
      .subscribe((res) => {
        const info = res.data[0];
        if (!info) {
          return;
        }
        const profile = {
          bannerBg: this.getBanner(),
          avatar: {
            src: info?.user_picture?.uri?.url || this.userState.defaultAvatar,
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
        this.user = Object.assign(people, profile);
        this.cd.detectChanges();
      });
  }

  getBanner(): any {
    return {
      classes: 'bg-fill-width overlay overlay-80',
      img: {
        hostClasses: 'bg-center',
        src:
          this.appState.config?.user?.banner ||
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
    this.userState.logout();
  }

  ngOnDestroy(): void {}
}
