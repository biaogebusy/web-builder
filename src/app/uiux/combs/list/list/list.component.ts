import { Component, Input, OnInit, ChangeDetectionStrategy, inject, output } from '@angular/core';
import type { IShowcase3v3 } from '@core/interface/combs/IShowcase';
import type { IPaginationLinks } from '@core/interface/widgets/IPaginationLinks';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListComponent implements OnInit {
  private screenService = inject(ScreenService);

  @Input() content: IShowcase3v3[];
  @Input() links: IPaginationLinks;
  @Input() pager: any;
  @Input() loading: boolean;
  readonly pageChange = output<string>();
  p = 1;

  ngOnInit(): void {}

  onPageChange(link: string): void {
    this.pageChange.emit(link);
    this.screenService.gotoTop();
  }
}
