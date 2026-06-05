import { Component, ChangeDetectionStrategy, output, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { IPaginationLinks } from '@core/interface/widgets/IPaginationLinks';

@Component({
  selector: 'app-pagination-links',
  templateUrl: './pagination-links.component.html',
  styleUrls: ['./pagination-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
})
export class PaginationLinksComponent {
  readonly links = input<IPaginationLinks>();
  readonly pageChange = output<string>();

  loadPage(link: string): void {
    this.pageChange.emit(link);
  }
}
