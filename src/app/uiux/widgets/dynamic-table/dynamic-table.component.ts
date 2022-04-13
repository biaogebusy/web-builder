import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit {
  @Input() content: any;
  displayedColumns: string[];

  constructor() {}

  ngOnInit(): void {
    if (this.content.elements) {
      this.displayedColumns = this.content.header.map((item: any) => item.key);
    }
  }
}
