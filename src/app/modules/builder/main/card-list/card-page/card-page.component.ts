import { ChangeDetectionStrategy, Component, DestroyRef, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { IPage } from '@core/interface/IAppConfig';
import { IPageMeta } from '@core/interface/IBuilder';
import { ILanguage } from '@core/interface/IEnvironment';
import { IUser } from '@core/interface/IUser';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrl: './card-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CardPageComponent {
  @Input() lists: any[];
  @Input() params: any;
  @Input() langs: ILanguage[];
  @Input() user: IUser;

  private currentEditeTitle: string;

  private router = inject(Router);
  private builder = inject(BuilderState);
  private nodeService = inject(NodeService);
  private destroyRef = inject(DestroyRef);
  private util = inject(UtilitiesService);
  private builderService = inject(BuilderService);

  loadPage(page: IPageMeta): void {
    this.router.navigate(['builder/page-list'], {
      queryParams: {
        nid: page.nid,
        langcode: page.langcode,
      },
    });
  }

  createLangVersion(currentPage: IPageMeta, targetlang: string): void {
    this.builder.loading$.next(true);
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${currentPage.nid}`, 'noCache=1', '', targetlang)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((page: IPage) => {
        this.builder.loading$.next(false);
        if (targetlang === page.langcode) {
          // 已有翻译
          this.util.openSnackbar(`已有${page.label}语言页面，正在载入`, 'ok');
          this.builder.loadNewPage(this.builderService.formatToExtraData(page));
        } else {
          // 复制一份，新建翻译
          this.util.openSnackbar(
            `正在载入${currentPage.title}，请修改页面内容为${targetlang}语言`,
            'ok'
          );
          this.builder.loadNewPage(
            this.builderService.formatToExtraData({
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
    this.builder.loading$.next(true);
    this.builderService.openPageSetting(
      page,
      '/api/v1/node/landing_page',
      this.builderService.getPageParams(['uid', 'group', 'cover', 'cover.field_media_image'])
    );
  }

  onTitle(event: any, page: IPageMeta): void {
    const { target } = event;
    const {
      update: { api, type },
    } = this.params;
    if (target) {
      target.contentEditable = 'false';
      if (this.currentEditeTitle !== target.textContent.trim()) {
        this.builder.loading$.next(true);
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
                    id: this.user.id,
                  },
                },
              }
            )
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(res => {
              if (res) {
                this.builder.loading$.next(false);
                this.util.openSnackbar(`已更新标题为${textContent}`, 'ok');
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
