import { ChangeDetectorRef, Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import type { IUserCenter } from '@core/interface/IUserCenter';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { isEmpty } from 'lodash-es';
import { Observable } from 'rxjs';
import { IUserConfig } from '../../../../core/interface/IUserConfig';
import { environment } from 'src/environments/environment';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-user-center',
    templateUrl: './user-center.component.html',
    styleUrls: ['./user-center.component.scss'],
    standalone: false
})
export class UserCenterComponent implements OnInit {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  user$ = inject<Observable<IUser>>(USER);

  @Input() content: IUserCenter;
  currentUser: any;
  id: any;
  user: IUser;
  userConfig$: Observable<IUserConfig>;
  cd = inject(ChangeDetectorRef);
  route = inject(Router);
  screenService = inject(ScreenService);
  userService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.userConfig$ = this.userService.getUserConfig();
      this.getUser();
      this.userService.userSub$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
        // logout
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
    if (!environment.production || !this.user) {
      return;
    }
    const people = {};
    this.userService
      .getUserById(this.user.current_user.uid, this.user.csrf_token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        const info = res.data[0];
        if (!info) {
          return;
        }
        const profile = {
          avatar: {
            src: info?.user_picture?.uri?.url || this.coreConfig.defaultAvatar,
            alt: info.name,
            height: 60,
            width: 60,
            classes: 'object-cover',
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
        this.currentUser = Object.assign(people, profile);
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
}
