import { Component, ChangeDetectionStrategy, inject, output, input } from '@angular/core';
import type { IShowcase3v3 } from '@core/interface/combs/IShowcase';
import type { IPaginationLinks } from '@core/interface/widgets/IPaginationLinks';
import { ScreenService } from '@core/service/screen.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponent } from '@uiux/widgets/spinner/spinner.component';
import { PaginationComponent } from '@uiux/widgets/pagination/pagination.component';
import { PaginationLinksComponent } from '@uiux/widgets/pagination/pagination-links/pagination-links.component';
import { Showcase3v3Component } from '@uiux/combs/showcase/showcase3v3/showcase3v3.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgxPaginationModule,
    SpinnerComponent,
    PaginationComponent,
    PaginationLinksComponent,
    Showcase3v3Component,
  ],
})
export class ListComponent {
  private screenService = inject(ScreenService);

  readonly content = input<IShowcase3v3[]>();
  readonly links = input<IPaginationLinks>();
  readonly pager = input<any>();
  readonly loading = input<boolean>();
  readonly pageChange = output<string>();
  p = 1;


  onPageChange(link: string): void {
    this.pageChange.emit(link);
    this.screenService.gotoTop();
  }
}
