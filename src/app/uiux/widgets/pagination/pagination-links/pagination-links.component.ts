import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import type { IPaginationLinks } from '@core/interface/widgets/IPaginationLinks';

@Component({
  selector: 'app-pagination-links',
  templateUrl: './pagination-links.component.html',
  styleUrls: ['./pagination-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PaginationLinksComponent {
  @Input() links: IPaginationLinks | undefined;
  @Output() pageChange: EventEmitter<string> = new EventEmitter();

  loadPage(link: string): void {
    this.pageChange.emit(link);
  }
}
