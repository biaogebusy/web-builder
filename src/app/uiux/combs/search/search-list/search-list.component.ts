import { Component, ChangeDetectionStrategy, output, input } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponent } from '@uiux/widgets/spinner/spinner.component';
import { CustomTemplateComponent } from '@uiux/combs/other/custom-template/custom-template.component';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatPaginatorModule, MatDividerModule, NgxPaginationModule, SpinnerComponent, CustomTemplateComponent],
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


  onPageChange(event: PageEvent): void {
    const { pageIndex } = event;
    this.pageChange.emit(pageIndex);
  }
}
