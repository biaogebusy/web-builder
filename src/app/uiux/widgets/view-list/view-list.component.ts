import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';
import { NodeService } from '@core/service/node.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ViewListComponent implements OnInit {
  @Input() content: any;
  table: any;
  loading: boolean;

  constructor(
    private nodeService: NodeService,
    private userState: UserState,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getViews();
  }

  getViews(): void {
    this.loading = true;
    this.nodeService
      .search(this.content.params.apiType, '', this.userState.csrfToken)
      .subscribe((res) => {
        this.table = {
          header: this.content.header,
          elements: res.rows,
        };
        this.loading = false;
        this.cd.detectChanges();
      });
  }
}
