import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';
import { IMediaObject } from '@core/interface/widgets/IMediaObject';
import { NodeService } from '@core/service/node.service';
import { DialogService } from '@core/service/dialog.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  profile: IMediaObject;
  count: any[];
  constructor(
    public userState: UserState,
    private nodeService: NodeService,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super(userState);
  }

  ngOnInit(): void {
    this.getProfile();
    this.getCount();
  }

  getProfile(): void {
    const user = this.userState.currentUser;
    this.profile = {
      img: {
        src: this.userState.picture,
        alt: user.current_user.name,
        style: {
          height: '50px',
          width: '50px',
        },
      },
      title: user.current_user.name,
      subTitle: user.display_name,
      align: 'center center',
    };
  }

  getCount(): void {
    debugger;
    const api = this.getParams(this.content, 'api');
    if (!api) {
      this.count = this.content.count;
      this.cd.detectChanges();
    } else {
      this.getContentFormApi(api);
      this.handleDialogClosed(api);
    }
  }

  getContentFormApi(api: string): void {
    this.nodeService
      .search(api, '')
      .pipe(
        map((data) => {
          if (!data.rows.length) {
            return {
              rows: [
                {
                  title: '\u65b0\u6307\u6d3e',
                  value: 15,
                  icon: 'replay\n',
                },
                {
                  title: '\u5df2\u5b8c\u5de5',
                  value: 12,
                  icon: 'done\n',
                },
              ],
              pager: {
                current_page: null,
                total_items: 2,
                total_pages: 0,
                items_per_page: 0,
              },
            };
          } else {
            return data;
          }
        }),
        catchError(() => {
          return of({
            rows: [],
          });
        })
      )
      .subscribe((res) => {
        debugger;
        this.count = res.rows.map((item: any) => {
          return {
            digit: {
              value: item.value,
              from: item.from || 0,
              duration: item.duration || 4,
            },
            title: item.title,
          };
        });
        this.cd.detectChanges();
      });
  }

  handleDialogClosed(api: string): void {
    if (this.dialogService.dialogState$) {
      this.dialogService.dialogState$.subscribe((state) => {
        if (!state) {
          this.getContentFormApi(api);
        }
      });
    }
  }
}
