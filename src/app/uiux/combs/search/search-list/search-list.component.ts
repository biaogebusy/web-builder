import { MatPaginatorIntlCro } from '@core/service/paginator.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Component, ChangeDetectionStrategy, output, input, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponent } from '@uiux/widgets/spinner/spinner.component';
import { CustomTemplateComponent } from '@uiux/combs/other/custom-template/custom-template.component';

@Component({
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }],
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatPaginatorModule,
    MatDividerModule,
    NgxPaginationModule,
    SpinnerComponent,
    CustomTemplateComponent,
  ],
})
export class SearchListComponent {
  readonly content = input<any[]>();
  readonly label = input.required<any>();
  readonly pager = input<any>();
  readonly loading = input<boolean>();
  readonly template = input<string>();
  readonly wrapperClasses = input<string>();
  readonly colClasses = input<string>();

  readonly pageChange = output<number>();
  private paginator = viewChild(MatPaginator);

  /** Restores the displayed page when the replacement results could not be loaded. */
  restorePage(): void {
    const paginator = this.paginator();
    const pager = this.pager();
    if (paginator && pager) {
      paginator.pageIndex = pager.currentPage;
    }
  }

  onPageChange(event: PageEvent): void {
    const { pageIndex } = event;
    this.pageChange.emit(pageIndex);
  }
}
