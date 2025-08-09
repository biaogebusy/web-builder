import { Component, Input, OnInit, ChangeDetectionStrategy, output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SearchListComponent implements OnInit {
  @Input() content: any;
  @Input() pager: any;
  @Input() loading: boolean;

  readonly pageChange = output<number>();

  ngOnInit(): void {}

  onPageChange(event: PageEvent): void {
    const { pageIndex } = event;
    this.pageChange.emit(pageIndex);
  }
}
