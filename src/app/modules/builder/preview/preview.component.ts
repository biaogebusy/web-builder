import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { TagsService } from '@core/service/tags.service';
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
  tagsService = inject(TagsService);
  constructor(
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>
  ) {
    this.tagsService.setTitle(`${this.builder.currentPage.title}草稿预览`);
  }

  ngOnInit(): void {
    this.contentState.pageConfig$.next(this.builder.currentPage.config);
  }

  trackByFn(index: number): number {
    return index;
  }
}
