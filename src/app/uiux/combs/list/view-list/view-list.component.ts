import { Component, Input, OnInit } from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';
import { NodeService } from '@core/service/node.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
})
export class ViewListComponent implements OnInit {
  @Input() content: any;
  table: any;
  constructor(private nodeService: NodeService, private userState: UserState) {}

  ngOnInit(): void {
    this.getViews();
  }

  getViews(): void {
    this.nodeService
      .search(this.content.params.apiType, '', this.userState.csrfToken)
      .subscribe((res) => {
        console.log(res);
        console.log(this.content);
        this.table = {
          header: this.content.header,
          elements: res.rows,
        };
      });
  }
}
