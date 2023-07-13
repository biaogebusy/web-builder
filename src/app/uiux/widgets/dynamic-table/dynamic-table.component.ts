import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import type { IDynamicTable } from '../../../core/interface/widgets/IWidgets';
import { RouteService } from '@core/service/route.service';
import { isArray } from 'lodash-es';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DynamicTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() content: IDynamicTable;
  @Input() form: FormGroup;

  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  displayedColumns: string[];
  columnsToDisplayWithExpand: string[];
  expandedElement: null;
  isExpand: boolean;
  constructor(
    private dialog: MatDialog,
    private routService: RouteService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.content.elements);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.content?.currentValue) {
      this.dataSource = new MatTableDataSource(
        changes.content.currentValue.elements
      );
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    if (this.content.elements) {
      this.isExpand = this.content.elements.some((item) =>
        isArray(item.expand)
      );
      this.displayedColumns = this.content.header.map((item: any) => item.key);
      if (this.isExpand) {
        this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
      }
      this.cd.detectChanges();
    }
  }

  openDialog(label: string, content: any): void {
    this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
        inputData: {
          content: {
            type: 'text',
            spacer: 'none',
            title: {
              label,
              style: 'style-v4',
            },
            body: content,
          },
        },
      },
    });
  }

  onNav(event: any): void {
    this.routService.eventLinkToNav(event);
  }
}
