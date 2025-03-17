import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import type { IDynamicTable } from '../../../core/interface/widgets/IWidgets';
import { RouteService } from '@core/service/route.service';
import { isArray } from 'lodash-es';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IDialog } from '@core/interface/IDialog';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: false,
})
export class DynamicTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() content: IDynamicTable;
  @Input() form: UntypedFormGroup;

  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  displayedColumns: string[];
  columnsToDisplayWithExpand: string[];
  expandedElement: null;
  isExpand: boolean;
  private dialog = inject(MatDialog);
  private routService = inject(RouteService);
  private cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.content.elements);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.content?.currentValue) {
      this.dataSource = new MatTableDataSource(changes.content.currentValue.elements);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    if (this.content.elements) {
      this.isExpand = this.content.elements.some(item => isArray(item.expand));
      this.displayedColumns = this.content.header.map((item: any) => item.key);
      if (this.isExpand) {
        this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
      }
      this.cd.detectChanges();
    }
  }

  openDialog(label: string, content: any): void {
    const config: IDialog = {
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
    };
    this.dialog.open(DialogComponent, {
      width: '600px',
      data: config,
    });
  }

  onNav(event: any): void {
    this.routService.eventLinkToNav(event);
  }
}
