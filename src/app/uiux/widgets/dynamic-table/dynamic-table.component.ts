import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit {
  @Input() content: any;
  @Input() form: FormGroup;
  public dataSource: MatTableDataSource<any>;
  displayedColumns: string[];

  constructor() {}

  ngOnInit(): void {
    if (this.content.elements) {
      this.displayedColumns = this.content.header.map((item: any) => item.key);
      this.dataSource = new MatTableDataSource(this.content.elements);
    }
  }
}
