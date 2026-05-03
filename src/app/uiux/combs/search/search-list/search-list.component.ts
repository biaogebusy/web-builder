import { Component, Input, ChangeDetectionStrategy, output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
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
