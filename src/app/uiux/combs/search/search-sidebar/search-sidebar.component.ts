import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';
@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.scss'],
})
export class SearchSidebarComponent implements OnInit {
  @Input() content: any;
  @Output() selectChange = new EventEmitter();

  treeView: any[];
  panelOpenState = false;
  config = {
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 500,
    hasDivider: false,
  };
  constructor() {}

  ngOnInit(): void {
    if (this.content) {
      this.treeView = [];
      this.content.map((item: any) => {
        if (item.type === 'treeView') {
          this.treeView.push({
            title: item.label,
            tree: [new TreeviewItem(item.elements)],
          });
        }
      });
    }
  }

  onSelectedChange(event: any): void {
    console.log(event);
  }

  onFilterChange(event: any): void {
    console.log(event);
  }

  onSelectChange(key: string, event: any): void {
    console.log(key, event);

    this.selectChange.emit({ key, value: event.value });
  }
}
