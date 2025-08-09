import { Component, OnInit, Input, inject, output } from '@angular/core';
import type { IListThin } from '@core/interface/combs/IList';
import { ScreenService } from '@core/service/screen.service';
@Component({
  selector: 'app-list-thin',
  templateUrl: './list-thin.component.html',
  styleUrls: ['./list-thin.component.scss'],
  standalone: false,
})
export class ListThinComponent implements OnInit {
  @Input() content: IListThin[];
  @Input() loading: boolean;
  @Input() pager: any;

  readonly pageChange = output<string>();
  p = 1;
  private screenService = inject(ScreenService);
  constructor() {}

  ngOnInit(): void {}

  onPageChange(link: string): void {
    this.pageChange.emit(link);
    this.screenService.gotoTop();
  }
}
