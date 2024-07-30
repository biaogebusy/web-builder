import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {
  contentState = inject(ContentState);
  builder = inject(BuilderState);
  constructor(
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>,
  ) {}

  ngOnInit(): void {
    this.contentState.pageConfig$.next(this.builder.currentPage.config);
  }

  trackByFn(index: number): number {
    return index;
  }
}
