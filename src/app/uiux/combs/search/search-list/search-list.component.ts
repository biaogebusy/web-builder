import { Component, Input, ChangeDetectionStrategy, output } from '@angular/core';
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
  @Input() content: any[];
  @Input() label: any;
  @Input() pager: any;
  @Input() loading: boolean;
  @Input() template: string;
  @Input() wrapperClasses: string;
  @Input() colClasses: string;

  readonly pageChange = output<number>();


  onPageChange(event: PageEvent): void {
    const { pageIndex } = event;
    this.pageChange.emit(pageIndex);
  }
}
