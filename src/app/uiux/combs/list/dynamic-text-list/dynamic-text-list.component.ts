import { Component, Input, OnInit } from '@angular/core';
import { NodeService } from 'src/app/service/node.service';
import { BaseComponent } from 'src/app/uiux/base/base.widget';
import { AppState } from '../../../../mobx/AppState';

@Component({
  selector: 'app-dynamic-text-list',
  templateUrl: './dynamic-text-list.component.html',
  styleUrls: ['./dynamic-text-list.component.scss'],
})
export class DynamicTextListComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  lists: any[];
  links: any;
  loading: boolean;
  constructor(private nodeService: NodeService, private appState: AppState) {
    super();
  }

  ngOnInit(): void {
    this.getLists();
  }

  getLists(): void {
    this.loading = true;
    const path = this.nodeService.apiUrlConfig.nodeGetPath;
    this.nodeService
      .getNodes(
        path,
        `${this.getParams(this.content, 'type')}`,
        `${this.getParams(this.content, 'options')}`
      )
      .subscribe((res) => {
        this.updateList(res);
      });
  }

  updateList(res: any): void {
    this.lists = res.data.map((item: any) => {
      return {
        picture: {
          src: item.uid?.user_picture?.uri.url || this.appState.defaultLogo,
          alt: item.uid.name,
        },
        name: item.uid.name,
        time: item.changed,
        link: {
          href: this.nodeService.getNodePath(item),
          label: item.title,
        },
        count: item.answer.comment_count,
      };
    });
    this.loading = false;
  }
}
