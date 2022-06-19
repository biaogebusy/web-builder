import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';
import { DialogService } from '@core/service/dialog.service';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-showcase4v1',
  templateUrl: './showcase4v1.component.html',
  styleUrls: ['./showcase4v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase4v1Component extends BaseComponent implements OnInit {
  @Input() content: any;
  elements: any[];
  constructor(
    public userState: UserState,
    private nodeService: NodeService,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super(userState);
  }

  ngOnInit(): void {
    const api = this.getParams(this.content, 'api');
    if (!api) {
      this.elements = this.content.elements;
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
        // map((data) => {
        //   if (!data.rows.length) {
        //     return {
        //       rows: [
        //         {
        //           title: '\u65b0\u6307\u6d3e',
        //           value: 15,
        //           icon: 'replay\n',
        //         },
        //         {
        //           title: '\u5df2\u5b8c\u5de5',
        //           value: 12,
        //           icon: 'done\n',
        //         },
        //       ],
        //       pager: {
        //         current_page: null,
        //         total_items: 2,
        //         total_pages: 0,
        //         items_per_page: 0,
        //       },
        //     };
        //   } else {
        //     return data;
        //   }
        // }),
        catchError(() => {
          return of({
            rows: [],
          });
        })
      )
      .subscribe((res) => {
        this.elements = res.rows.map((item: any) => {
          return {
            icon: item.icon,
            digit: {
              value: item.value,
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
