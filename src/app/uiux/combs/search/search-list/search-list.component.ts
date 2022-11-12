import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListComponent implements OnInit {
  @Input() content: any;
  @Input() pager: any;
  @Input() loading: boolean;

  @Output() pageChange = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onPageChange(page: number): void {
    this.pageChange.emit(page - 1);
  }

  trackByFn(index: number, item: any): number {
    return item.link;
  }
}
