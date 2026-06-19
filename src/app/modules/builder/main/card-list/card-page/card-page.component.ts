import { ChangeDetectionStrategy, Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { IPage } from '@core/interface/IAppConfig';
import { IPageMeta } from '@core/interface/IBuilder';
import { ILanguage } from '@core/interface/IEnvironment';
import { IUser } from '@core/interface/IUser';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { formatToExtraData, getPageParams } from '@core/util/builder-page.util';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrl: './card-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShareModule, WidgetsModule],
})
export class CardPageComponent {
  readonly lists = input<any[]>();
  readonly params = input.required<any>();
  readonly langs = input<ILanguage[]>();
  readonly user = input.required<IUser>();

  private currentEditeTitle: string;

  private router = inject(Router);
  private builder = inject(BuilderState);
  private nodeService = inject(NodeService);
  private destroyRef = inject(DestroyRef);
  private util = inject(UtilitiesService);
  private builderService = inject(BuilderService);
  private translate = inject(TranslateService);

  loadPage(page: IPageMeta): void {
    this.router.navigate(['builder/page-list'], {
      queryParams: {
        nid: page.nid,
        langcode: page.langcode,
      },
    });
  }

  createLangVersion(currentPage: IPageMeta, targetlang: string): void {
    this.builder.loading.set(true);
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${currentPage.nid}`, { noCache: 1 }, targetlang)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((page: IPage) => {
        this.builder.loading.set(false);
        if (targetlang === page.langcode) {
          // 已有翻译
          this.util.openSnackbar(
            this.translate.instant('BUILDER.PAGE_LIST.TRANSLATION_EXISTS', { label: page.label }),
            'ok'
          );
          this.builder.loadNewPage(formatToExtraData(page));
        } else {
          // 复制一份，新建翻译
          this.util.openSnackbar(
            this.translate.instant('BUILDER.PAGE_LIST.LOADING_TRANSLATION', {
              title: currentPage.title,
              lang: targetlang,
            }),
            'ok'
          );
          this.builder.loadNewPage(
            formatToExtraData({
              langcode: currentPage.langcode,
              ...page,
              translation: true,
              target: targetlang,
            })
          );
        }
      });
  }

  updatePage(page: IPageMeta): void {
    this.builder.loading.set(true);
    this.builderService.openPageSetting(
      page,
      '/api/v1/node/landing_page',
      getPageParams(['uid', 'group', 'cover', 'cover.field_media_image'])
    );
  }

  onTitle(event: any, page: IPageMeta): void {
    const { target } = event;
    const {
      update: { api, type },
    } = this.params();
    if (target) {
      target.contentEditable = 'false';
      if (this.currentEditeTitle !== target.textContent.trim()) {
        this.builder.loading.set(true);
        const {
          target: { textContent },
        } = event;
        if (textContent) {
          this.builderService
            .updateAttributes(
              page,
              api,
              {
                title: textContent,
              },
              {
                uid: {
                  data: {
                    type: 'user--user',
                    id: this.user().id,
                  },
                },
              }
            )
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(res => {
              if (res) {
                this.builder.loading.set(false);
                this.util.openSnackbar(
                  this.translate.instant('BUILDER.CARD_PAGE.TITLE_UPDATED', { title: textContent }),
                  'ok'
                );
                this.builder.currentPage.title = textContent;
                this.builder.saveLocalVersions();
              }
            });
        }
      }
    }
  }

  enableEditor(event: any): void {
    const { currentTarget } = event;
    if (currentTarget) {
      const title = currentTarget.previousElementSibling;
      this.currentEditeTitle = title.textContent.trim();
      title.contentEditable = 'true';
    }
  }
}
