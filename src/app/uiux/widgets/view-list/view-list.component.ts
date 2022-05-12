import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserState } from '@core/mobx/user/UserState';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewListComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  table: any;
  loading: boolean;
  pager: any;

  constructor(
    private nodeService: NodeService,
    private userState: UserState,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.getViews();
  }

  getViews(options = {}): void {
    this.loading = true;
    const params = this.getApiParams(options);
    this.nodeService
      .search(this.content.params.apiType, params, this.userState.csrfToken)
      .subscribe((res) => {
        this.table = {
          header: this.content.header,
          elements: res.rows,
        };
        this.pager = res.pager;
        this.loading = false;
        this.cd.detectChanges();
      });
  }

  onPageChange(page: PageEvent): void {
    this.getViews({
      page: page.pageIndex,
    });
  }
}
