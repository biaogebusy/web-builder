import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';
import { ContentState } from '@core/state/ContentState';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {
  @LocalStorage('page')
  page: IPage;
  constructor(private contentState: ContentState) {}

  ngOnInit(): void {
    this.contentState.pageConfig$.next(this.page.config);
  }

  trackByFn(index: number): number {
    return index;
  }
}
