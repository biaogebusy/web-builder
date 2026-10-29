import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  OnInit,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { HeaderComponent } from '@core/branding/header/header.component';
import { FooterComponent } from '@core/branding/footer/footer.component';
import { IPage } from '@core/interface/IAppConfig';
import { TagsService } from '@core/service/tags.service';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from '@core/service/node.service';
import { formatToExtraData, getApiLang } from '@core/util/builder-page.util';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesService } from '@core/service/utilities.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, HeaderComponent, FooterComponent],
})
export class PreviewComponent implements OnInit {
  readonly currentPage = signal<IPage | undefined>(undefined);
  readonly failed = signal(false);
  private route = inject(ActivatedRoute);
  private nodeService = inject(NodeService);
  private contentState = inject(ContentState);
  private builder = inject(BuilderState);
  private tagsService = inject(TagsService);
  private util = inject(UtilitiesService);
  private translate = inject(TranslateService);
  private doc = inject<Document>(DOCUMENT);
  private destroyRef = inject(DestroyRef);
  private disconnectAosObserver?: () => void;

  constructor() {
    afterNextRender({
      read: () => {
        this.disconnectAosObserver = this.util.intersectionObserver('[data-aos]', this.doc);
      },
    });
    this.destroyRef.onDestroy(() => this.disconnectAosObserver?.());
  }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    const nid = params.get('nid');
    const langcode = params.get('lang') ?? undefined;
    if (!nid) {
      this.showPage(this.builder.currentPage);
      return;
    }
    const local = this.builder.getLocalPageByPage({ nid, langcode });
    if (local) {
      this.showPage(local);
      return;
    }
    // Read the requested page without replacing the editor's current local draft.
    this.nodeService.fetch(`/api/v3/landingPage/json/${encodeURIComponent(nid)}`,
      { noCache: 1 }, getApiLang(langcode))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (page: IPage) => {
          if (page.status && Array.isArray(page.body)) this.showPage(formatToExtraData(page));
          else this.failed.set(true);
        },
        error: () => this.failed.set(true),
      });
  }

  private showPage(page: IPage): void {
    this.currentPage.set(page);
    this.contentState.pageConfig.set(page.config);
    this.tagsService.setTitle(this.translate.instant('BUILDER.PREVIEW.DRAFT_TITLE_SUFFIX', {
      title: page.title,
    }));
  }

}
