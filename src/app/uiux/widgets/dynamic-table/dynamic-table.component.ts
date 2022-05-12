import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent implements OnInit {
  @Input() content: any;
  @Input() form: FormGroup;
  @Input() length: number;
  public dataSource: MatTableDataSource<any>;
  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns: string[];
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.content.elements) {
      this.displayedColumns = this.content.header.map((item: any) => item.key);
      this.dataSource = new MatTableDataSource(this.content.elements);
    }
  }
}
