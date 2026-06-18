import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  DestroyRef,
  input
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NodeService } from '@core/service/node.service';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { ScreenService } from '@core/service/screen.service';
import { Observable } from 'rxjs';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';
import { IListThin } from '@core/interface/combs/IList';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { ListThinComponent } from '@uiux/combs/list/list/list-thin/list-thin.component';
@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, TextComponent, ListThinComponent],
})
export class UserFavoriteComponent implements OnInit {
  private user = inject(USER);

  readonly content = input<any>();
  lists: Observable<IListThin[]>;
  id: string;
  loading: boolean;
  pager = {
    itemsPerPage: 20,
  };

  nodeService = inject(NodeService);
  screenService = inject(ScreenService);
  private destroyRef = inject(DestroyRef);

  constructor() {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.getContent();
    }
  }

  getContent(): void {
    this.loading = true;
    const path = '/api/v1/flagging';
    const params = [
      `filter[uid.id]=${(this.user() as IUser)?.id}`,
      `include=flagged_entity`,
      `sort=-created`,
      `jsonapi_include=1`,
    ].join('&');
    this.lists = this.nodeService.getNodes(path, 'favorite', params).pipe(
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
                  url: `${this.nodeService.apiUrl}${this.nodeService.getNodePath(node)}`,
                },
              },
            ],
          };
        });
      })
    );
  }
}
