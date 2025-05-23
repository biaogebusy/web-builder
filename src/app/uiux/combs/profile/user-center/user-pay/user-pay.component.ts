import { formatDate } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { IUser } from '@core/interface/IUser';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { USER } from '@core/token/token-providers';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user-pay',
    templateUrl: './user-pay.component.html',
    styleUrls: ['./user-pay.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class UserPayComponent implements OnInit {
  private user$ = inject<Observable<IUser>>(USER);

  @Input() content: any;
  lists: any;
  loading: boolean;
  id: string;
  pager = {
    itemsPerPage: 20,
  };
  user: IUser;

  screenService = inject(ScreenService);
  nodeService = inject(NodeService);
  cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
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
    this.nodeService
      .getNodes(path, 'payment', params, this.user.csrf_token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        res => {
          const lists = res.data.filter((item: any) => {
            return item.flagged_entity?.status ? true : false;
          });
          this.lists = lists.map((item: any) => {
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
                  type: 'share',
                  button: {
                    icon: 'share',
                    label: '分享',
                  },
                  params: {
                    url: `${this.nodeService.apiUrl}${this.nodeService.getNodePath(node)}`,
                  },
                },
                {
                  type: 'download',
                  label: '下载',
                  icon: {
                    name: 'file_download',
                    inline: true,
                  },
                  elements: [
                    {
                      type: 'link',
                      label: 'Doc',
                      icon: {
                        name: 'description',
                      },
                      href: `/print/view/word_docx/print/doc?id=${node.drupal_internal__nid}`,
                    },
                    {
                      type: 'link',
                      label: 'Pdf',
                      icon: {
                        name: 'picture_as_pdf',
                      },
                      href: `/print/view/pdf/print/pdf?id=${node.drupal_internal__nid}`,
                    },
                  ],
                },
              ],
            };
          });
          this.loading = false;
          this.cd.detectChanges();
        },
        error => {
          console.log(error);
        }
      );
  }
}
