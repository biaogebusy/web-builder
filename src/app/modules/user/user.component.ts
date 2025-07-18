import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
import { isEmpty } from 'lodash-es';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class UserComponent implements OnInit {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private user$ = inject<Observable<IUser>>(USER);

  currentUser: any;
  user: IUser;
  id: any;

  route = inject(Router);
  cd = inject(ChangeDetectorRef);
  userService = inject(UserService);
  screenService = inject(ScreenService);

  constructor() {
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.getUser();
      this.userService.userSub$.subscribe(user => {
        if (!user) {
          setTimeout(() => {
            this.route.navigate([environment.drupalProxy ? '/my' : '/me/login']);
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
      .subscribe(res => {
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
                },
                label: '邮箱',
                content: info.mail || '没有填写',
              },
              {
                icon: {
                  color: 'warn',
                  svg: 'arrow_right',
                },
                label: '手机',
                content: info.phone_number || '没有填写',
              },
              {
                icon: {
                  color: 'warn',
                  svg: 'arrow_right',
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
        hostClasses: '',
        src: this.coreConfig?.user?.banner,
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
    this.userService.logout();
  }
}
