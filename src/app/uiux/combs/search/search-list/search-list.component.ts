import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SearchListComponent implements OnInit {
  @Input() content: any;
  @Input() pager: any;
  @Input() loading: boolean;

  @Output() pageChange = new EventEmitter();

  ngOnInit(): void {}

  onPageChange(event: PageEvent): void {
    const { pageIndex } = event;
    this.pageChange.emit(pageIndex);
  }

  trackByFn(index: number, item: any): number {
    return item.link;
  }
}
