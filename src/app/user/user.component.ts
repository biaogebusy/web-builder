import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';

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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((query) => {
      this.id = query.get('id');
      console.log(this.id);
      this.getUser(this.id);
    });
  }

  getUser(id: string): any {
    const user: any = {};
    const people = {
      bannerBg: this.getBanner(),
      details: {
        label: '个人资料',
        elements: [
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '职位',
            content: '前端开发',
          },
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '微信',
            content: 'biaogebusy',
          },
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '公众号',
            content: 'Drupal 自习室',
          },
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '邮箱',
            content: 'biaogebusy@example.com',
          },
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '地址',
            content: '南宁',
          },
        ],
      },
    };

    this.userService.getUserById(id).subscribe((res) => {
      const info = res.data[0];
      const profile = {
        avatar: {
          src: info.user_picture.uri.url || '',
          alt: info.name,
        },
        name: info.name,
        subTitle: info.display_name,
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
}
