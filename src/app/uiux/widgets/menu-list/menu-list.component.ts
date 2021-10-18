import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  @Input() content: any;
  list: any[];
  initList: any[];
  expand = false;
  row = 12;
  constructor() {}

  ngOnInit(): void {
    this.initContent(this.expand);
  }

  initContent(expand: boolean): void {
    const lists = this.content.elements;
    this.initList = lists;
    this.updateList(this.expand);
  }

  updateList(expand: boolean): void {
    if (expand) {
      this.list = this.initList;
    } else {
      this.list = this.initList.slice(0, this.row - 1);
    }
  }

  onExpand(): void {
    this.expand = !this.expand;
    this.updateList(this.expand);
  }
}
