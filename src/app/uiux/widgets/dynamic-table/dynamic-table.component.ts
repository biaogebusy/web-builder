import {
  Component,
  Input,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  effect,
  inject,
  input,
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
export class DynamicTableComponent implements AfterViewInit {
  readonly content = input.required<IDynamicTable>();
  @Input() form: UntypedFormGroup;

  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<any>;

  public displayedColumns: string[];
  public columnsToDisplayWithExpand: string[];
  public expandedElement: null;
  public isExpand: boolean;
  private dialog = inject(MatDialog);
  private routService = inject(RouteService);
  private cd = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      const content = this.content();
      this.dataSource = new MatTableDataSource(content.elements);
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
      if (content.elements) {
        this.isExpand = content.elements.some((item: any) => isArray(item.expand));
        this.displayedColumns = content.header.map((item: any) => item.key);
        this.columnsToDisplayWithExpand = this.isExpand
          ? [...this.displayedColumns, 'expand']
          : this.displayedColumns;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.sort && this.dataSource) {
      this.dataSource.sort = this.sort;
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
