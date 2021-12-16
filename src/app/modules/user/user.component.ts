import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@core/service/user.service';
import { UserState } from '@core/mobx/user/UserState';
import { AppState } from '@core/mobx/AppState';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: any;
  id: any;
  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private userState: UserState,
    private route: Router,
    private appState: AppState,
    private screenService: ScreenService
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

    this.userService.getUserById(id).subscribe((res) => {
      const info = res.data[0];
      const profile = {
        bannerBg: this.getBanner(),
        avatar: {
          src: info.user_picture.uri.url || '',
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
    });
  }

  getBanner(): any {
    return {
      classes: 'bg-fill-width overlay overlay-80',
      img: {
        hostClasses: 'bg-center',
        src: '/assets/images/16-9/business-14.jpeg',
        alt: 'page title',
      },
    };
  }

  getRoles(rules: []): string[] {
    if (!rules) {
      return ['注册用户'];
    }
    return rules.map((rule: any) => {
      return rule.label;
    });
  }

  logout(): void {
    this.userState.logout();
  }
}
