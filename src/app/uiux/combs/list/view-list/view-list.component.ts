import { Component, Input, OnInit } from '@angular/core';
import { NodeService } from '@core/service/node.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
})
export class ViewListComponent implements OnInit {
  @Input() content: any;
  table: any;
  constructor(private nodeService: NodeService) {}

  ngOnInit(): void {
    this.getViews();
  }

  getViews(): void {
    this.nodeService
      .search(this.content.params.apiType, '')
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
