import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  OnInit,
  afterEveryRender,
  inject,
} from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { BrandingModule } from '@core/branding/branding.module';
import { IPage } from '@core/interface/IAppConfig';
import { TagsService } from '@core/service/tags.service';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { UtilitiesService } from '@core/service/utilities.service';
import { throttle } from 'lodash-es';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShareModule, WidgetsModule, BrandingModule],
})
export class PreviewComponent implements OnInit {
  public currentPage$ = inject<Observable<IPage>>(BUILDER_CURRENT_PAGE);
  private contentState = inject(ContentState);
  private builder = inject(BuilderState);
  private tagsService = inject(TagsService);
  private util = inject(UtilitiesService);
  private translate = inject(TranslateService);
  private doc = inject<Document>(DOCUMENT);

  constructor() {
    this.tagsService.setTitle(
      this.translate.instant('BUILDER.PREVIEW.DRAFT_TITLE_SUFFIX', {
        title: this.builder.currentPage.title,
      })
    );
    afterEveryRender({
      read: throttle(() => {
        this.util.intersectionObserver('[data-aos]', this.doc);
      }, 200),
    });
  }

  ngOnInit(): void {
    this.contentState.pageConfig$.next(this.builder.currentPage.config);
  }
}
