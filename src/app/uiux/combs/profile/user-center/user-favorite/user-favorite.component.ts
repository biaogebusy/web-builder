import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Inject,
  inject,
  DestroyRef,
} from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { ScreenService } from '@core/service/screen.service';
import { Observable } from 'rxjs';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';
import { IListThin } from '@core/interface/combs/IList';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFavoriteComponent implements OnInit {
  @Input() content: any;
  lists$: Observable<IListThin[]>;
  id: string;
  loading: boolean;
  pager = {
    itemsPerPage: 20,
  };
  user: IUser;

  nodeService = inject(NodeService);
  screenService = inject(ScreenService);
  private destroyRef = inject(DestroyRef);
  constructor(@Inject(USER) private user$: Observable<IUser>) {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.getContent();
    }
  }

  getContent(): void {
    this.loading = true;
    const path = this.nodeService.apiUrlConfig.flaggingGetPath;
    const params = [
      `filter[uid.id]=${this.user.id}`,
      `include=flagged_entity`,
      `sort=-created`,
      `jsonapi_include=1`,
    ].join('&');
    this.lists$ = this.nodeService
      .getNodes(path, 'favorite', params, this.user.csrf_token)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(res => {
          const lists = res.data.filter((item: any) => {
            return item.flagged_entity?.status ? true : false;
          });
          this.loading = false;
          return lists.map((item: any) => {
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
        })
      );
  }
}
