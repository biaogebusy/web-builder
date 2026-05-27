import { Component, inject, output, ChangeDetectionStrategy, input } from '@angular/core';
import type { IListThin } from '@core/interface/combs/IList';
import { ScreenService } from '@core/service/screen.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';
import { SpinnerComponent } from '@uiux/widgets/spinner/spinner.component';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { PaginationComponent } from '@uiux/widgets/pagination/pagination.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-list-thin',
  templateUrl: './list-thin.component.html',
  styleUrls: ['./list-thin.component.scss'],
  imports: [
    NgxPaginationModule,
    NgPipesModule,
    SpinnerComponent,
    LinkComponent,
    PaginationComponent,
    DynamicComponentComponent,
  ],
})
export class ListThinComponent {
  readonly content = input<IListThin[]>();
  readonly loading = input<boolean>();
  readonly pager = input.required<any>();

  readonly pageChange = output<string>();
  p = 1;
  private screenService = inject(ScreenService);
  constructor() {}


  onPageChange(link: string): void {
    this.pageChange.emit(link);
    this.screenService.gotoTop();
  }
}
