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
import { Subscription, Subject } from 'rxjs';
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
    private router: ActivatedRoute,
    private userService: UserService,
    private nodeService: NodeService,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
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
      .getUserById(id)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((res: any) => {
          const params = [
            `filter[uid.id]=${res.data[0].id}`,
            `include=flagged_entity`,
            `sort=-created`,
            `jsonapi_include=1`,
          ].join('&');
          return this.nodeService.getNodes(path, 'favorite', params);
        })
      )
      .subscribe(
        (res) => {
          this.content = res.data.map((item: any) => {
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
    this.destroy$.unsubscribe();
  }
}
