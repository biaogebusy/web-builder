import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';
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
  constructor() {}

  ngOnInit(): void {}

  trackByFn(index: number): number {
    return index;
  }
}
