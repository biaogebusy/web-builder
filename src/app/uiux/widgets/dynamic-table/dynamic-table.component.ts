import { CdkTableModule } from '@angular/cdk/table';
import {
  Component,
  ChangeDetectorRef,
  AfterViewInit,
  effect,
  inject,
  input,
  ChangeDetectionStrategy,
  viewChild
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IDialog } from '@core/interface/IDialog';
import { RouteService } from '@core/service/route.service';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { isArray } from 'lodash-es';
import { NgPipesModule } from 'ngx-pipes';
import { DynamicComponentComponent } from '../builder/dynamic-component/dynamic-component.component';
import { DialogComponent } from '../dialog/dialog.component';
import type { IDynamicTable } from '../../../core/interface/widgets/IWidgets';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  imports: [
    CdkTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    NgPipesModule,
    DynamicComponentComponent,
    SafeHtmlPipe,
  ],
})
export class DynamicTableComponent implements AfterViewInit {
  readonly content = input.required<IDynamicTable>();
  readonly form = input<UntypedFormGroup>();

  readonly sort = viewChild(MatSort);
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
      const sort = this.sort();
      if (sort) {
        this.dataSource.sort = sort;
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
    const sort = this.sort();
    if (sort && this.dataSource) {
      this.dataSource.sort = sort;
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
