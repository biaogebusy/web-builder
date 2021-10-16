import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';
import { UserService } from 'src/app/service/user.service';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.scss'],
})
export class UserFavoriteComponent implements OnInit {
  content: any;
  id: string;
  pager = {
    itemsPerPage: 20,
  };
  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private nodeService: NodeService
  ) {}

  ngOnInit(): void {
    this.id = this.router.parent && this.router.parent.snapshot.params.id;
    this.getContent(this.id);
  }

  getContent(id: string): void {
    const path = this.nodeService.apiUrlConfig.flaggingGetPath;

    this.userService
      .getUserById(id)
      .pipe(
        switchMap((res: any) => {
          const params = [`filter[uid.id]=${res.data[0].id}`].join('&');
          return this.nodeService.getNodes(path, 'favorite', params);
        })
      )
      .subscribe((user) => {
        console.log(user);
        this.content = [
          {
            type: 'list-thin',
            link: {
              label: '商标法',
              href: '/',
            },
            meta: [
              {
                label: 'editor',
              },
              {
                label: '2021-08-28',
              },
            ],
            actions: [
              {
                type: 'flag',
                label: '收藏',
                icon: {
                  name: 'star',
                  inline: true,
                },
                params: {
                  type: 'flagging--favorite',
                  entity_type: 'node',
                  entity_id: '1312',
                  relationships: {
                    flagged_entity: {
                      type: 'node--article',
                      id: 'cb31d69f-a95e-4c91-97d1-1169f82a10a5',
                    },
                  },
                },
              },
              {
                type: 'share',
                button: {
                  icon: 'share',
                  label: '分享',
                },
                params: {
                  url: '/',
                },
              },
            ],
          },
          {
            type: 'list-thin',
            link: {
              label: '商标法',
              href: '/',
            },
            meta: [
              {
                label: 'editor',
              },
              {
                label: '2021-08-28',
              },
            ],
            actions: [
              {
                type: 'flag',
                label: '收藏',
                icon: {
                  name: 'star',
                  inline: true,
                },
                params: {
                  type: 'flagging--favorite',
                  entity_type: 'node',
                  entity_id: '1312',
                  relationships: {
                    flagged_entity: {
                      type: 'node--article',
                      id: 'cb31d69f-a95e-4c91-97d1-1169f82a10a5',
                    },
                  },
                },
              },
              {
                type: 'share',
                button: {
                  icon: 'share',
                  label: '分享',
                },
                params: {
                  url: '/',
                },
              },
            ],
          },
          {
            type: 'list-thin',
            link: {
              label: '商标法',
              href: '/',
            },
            meta: [
              {
                label: 'editor',
              },
              {
                label: '2021-08-28',
              },
            ],
            actions: [
              {
                type: 'flag',
                label: '收藏',
                icon: {
                  name: 'star',
                  inline: true,
                },
                params: {
                  type: 'flagging--favorite',
                  entity_type: 'node',
                  entity_id: '1312',
                  relationships: {
                    flagged_entity: {
                      type: 'node--article',
                      id: 'cb31d69f-a95e-4c91-97d1-1169f82a10a5',
                    },
                  },
                },
              },
              {
                type: 'share',
                button: {
                  icon: 'share',
                  label: '分享',
                },
                params: {
                  url: '/',
                },
              },
            ],
          },
        ];
      });
  }
}
