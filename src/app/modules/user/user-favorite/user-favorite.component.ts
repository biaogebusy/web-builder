import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from '@core/service/node.service';
import { UserService } from '@core/service/user.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { ScreenService } from '@core/service/screen.service';
import { Subject } from 'rxjs';
import { UserState } from '@core/mobx/user/UserState';
@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFavoriteComponent implements OnInit, OnDestroy {
  content: any;
  id: string;
  loading: boolean;
  pager = {
    itemsPerPage: 20,
  };

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private cd: ChangeDetectorRef,
    private router: ActivatedRoute,
    private userState: UserState,
    private userService: UserService,
    private nodeService: NodeService,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.id = this.router.parent && this.router.parent.snapshot.params.id;
      this.getContent(this.id);
    }
  }

  getContent(id: string): void {
    this.loading = true;
    const path = this.nodeService.apiUrlConfig.flaggingGetPath;

    this.userService
      .getUserById(id, this.userState.csrfToken)
      .pipe(
        switchMap((res: any) => {
          const params = [
            `filter[uid.id]=${res.data[0].id}`,
            `include=flagged_entity`,
            `sort=-created`,
            `jsonapi_include=1`,
          ].join('&');
          console.log(res);
          return this.nodeService.getNodes(
            path,
            'favorite',
            params,
            this.userState.csrfToken
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res) => {
          console.log('favories:', res);
          const lists = res.data.filter((item: any) => {
            return item.flagged_entity?.status ? true : false;
          });
          this.content = lists.map((item: any) => {
            const node = item.flagged_entity;
            return {
              type: 'list-thin',
              link: {
                label: node.title,
                href: this.nodeService.getNodePath(node),
              },
              meta: [
                {
                  label: node.uid.dispaly_name || node.uid.name,
                },
                {
                  label: formatDate(node.changed, 'yyyy-MM-dd', 'en-US'),
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
                    type: item.type,
                    entity_type: item.entity_type,
                    entity_id: item.entity_id,
                    relationships: {
                      flagged_entity: {
                        type: node.type,
                        id: node.id,
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
                    url: `${
                      this.nodeService.apiUrl
                    }${this.nodeService.getNodePath(node)}`,
                  },
                },
              ],
            };
          });
          this.loading = false;
          this.cd.detectChanges();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
