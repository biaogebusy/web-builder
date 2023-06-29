import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { IPaginationLinks } from '@core/interface/widgets/IPaginationLinks';

@Component({
  selector: 'app-pagination-links',
  templateUrl: './pagination-links.component.html',
  styleUrls: ['./pagination-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationLinksComponent implements OnInit {
  @Input() links: IPaginationLinks;
  @Output() pageChange: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  loadPage(link: string): void {
    this.pageChange.emit(link);
  }
}
