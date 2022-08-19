import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { IPaginationSimple } from '@core/interface/widgets/IPaginationSimple';

@Component({
  selector: 'app-pagination-simple',
  templateUrl: './pagination-simple.component.html',
  styleUrls: ['./pagination-simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationSimpleComponent implements OnInit {
  @Input() links: IPaginationSimple;
  @Output() pageChange: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  loadPage(link: string): void {
    this.pageChange.emit(link);
  }
}
