import { Component, Input, OnInit } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';

const treeView = [
  {
    title: '四分法',
    elements: {
      text: '四分法',
      value: 'all',
      children: [
        {
          text: '金融科技',
          value: 173,
          children: [
            {
              text: '金融基础设施',
              value: 186,
            },
          ],
        },
        {
          text: '金融体系',
          value: 174,
          children: [
            {
              text: '基础设施金融',
              value: 197,
            },
            {
              text: '金融公司管理与重整',
              value: 203,
              children: [
                {
                  text: '公司管理',
                  value: 429,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    title: '六分法',
    elements: {
      text: '四分法',
      value: 'all',
      children: [
        {
          text: '金融科技',
          value: 173,
          children: [
            {
              text: '金融基础设施',
              value: 186,
            },
          ],
        },
        {
          text: '金融体系',
          value: 174,
          children: [
            {
              text: '基础设施金融',
              value: 197,
            },
            {
              text: '金融公司管理与重整',
              value: 203,
              children: [
                {
                  text: '公司管理',
                  value: 429,
                },
              ],
            },
          ],
        },
      ],
    },
  },
];
@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.scss'],
})
export class SearchSidebarComponent implements OnInit {
  @Input() content: any;
  treeView: any[];
  panelOpenState = false;
  config = {
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 500,
  };
  constructor() {}

  ngOnInit(): void {
    this.treeView = treeView.map((item) => {
      return {
        title: item.title,
        tree: [new TreeviewItem(item.elements)],
      };
    });
  }

  onSelectedChange(event: any): void {
    console.log(event);
  }

  onFilterChange(event: any): void {
    console.log(event);
  }
}
