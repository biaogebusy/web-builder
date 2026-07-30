import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injector,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { BUILDER_CURRENT_PAGE, BUILDER_FULL_SCREEN, USER } from '@core/token/token-providers';
import { ScreenService } from '@core/service/screen.service';
import type { IPage } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderService } from '@core/service/builder.service';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '@core/service/user.service';
import { Router } from '@angular/router';
import { IDialog } from '@core/interface/IDialog';
import { TranslateService } from '@ngx-translate/core';
import qs from 'qs';
import { SwitchPreviewComponent } from '../switch-preview/switch-preview.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-builder-toolbar',
  templateUrl: './builder-toolbar.component.html',
  styleUrls: ['./builder-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, MatSlideToggleModule, SwitchPreviewComponent],
})
export class BuilderToolbarComponent implements OnInit, AfterViewInit {
  public version = signal<IPage[] | undefined>(undefined);
  private user = inject(USER);
  public builderFullScreen = inject(BUILDER_FULL_SCREEN);
  public currentPage = inject(BUILDER_CURRENT_PAGE);

  public page?: IPage;
  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private screenState = inject(ScreenState);
  private storage = inject(LocalStorageService);
  private screenService = inject(ScreenService);
  private builderService = inject(BuilderService);
  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);
  private router = inject(Router);
  private translate = inject(TranslateService);
  public date = signal<Date>(new Date());
  private injector = inject(Injector);
  constructor() {
    // user is now a Signal - use user() to access value
  }

  ngOnInit(): void {
    effect(() => {
      const page = this.currentPage();
      if (page && typeof page === 'object') {
        this.page = page;
        if (this.page.changed) {
          this.date.set(new Date(Number(this.page.changed) * 1000));
        }
      }
    }, { injector: this.injector });
    this.version.set(this.storage.retrieve('version'));
    this.storage
      .observe('version')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((version: IPage[]) => {
        this.version.set(version);
      });
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screenState
        .mqAlias$()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(alia => {
          if (alia.includes('xs')) {
            this.builder.fullScreen$.next(true);
          }
        });
    }
  }

  onTitle(event: any): void {
    const {
      target: { textContent },
    } = event;
    if (textContent) {
      this.builder.currentPage.title = textContent;
      this.builder.saveLocalVersions();
    }
  }

  onClearHistory(): void {
    this.builder.clearAllHistory();
  }

  onVersion(page: IPage, index: number): void {
    this.builder.switchVersion(page, index);
    this.builderService.checkIsLatestPage(page);
  }

  onNewPage(): void {
    const config: IDialog = {
      title: this.translate.instant('BUILDER.TOOLBAR.SELECT_TEMPLATE'),
      disableActions: true,
      inputData: {
        content: {
          type: 'builder-template',
        },
      },
    };
    this.dialog.open(DialogComponent, {
      width: '1200px',
      data: config,
    });
  }

  onFullScreen(event: MatSlideToggleChange): void {
    this.storage.store('builderFullScreen', event.checked);
    this.builder.fullScreen$.next(event.checked);
  }

  onSubmit(page: IPage): void {
    if (!this.user()) {
      this.openLogin();
      return;
    }

    if (this.page?.body.length === 0) {
      this.util.openSnackbar(this.translate.instant('BUILDER.TOOLBAR.ADD_COMPONENT_FIRST'), 'ok');
      return;
    }

    if (page.translation && page.target) {
      // 新增翻译：提交前再校验一次目标语言翻译是否已存在
      const target = page.target;
      this.builder.loading.set(true);
      this.builderService
        .checkTranslationExists(page.nid ?? '', target)
        .pipe(
          switchMap(exists =>
            exists ? of({ exists: true }) : this.builderService.addTranslation(page)
          ),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          next: res => {
            this.builder.loading.set(false);
            if (res.exists) {
              // 翻译已存在，保留本地草稿，交由用户处理
              this.util.openSnackbar(
                this.translate.instant('BUILDER.TOOLBAR.TRANSLATION_EXISTS', { target }),
                'ok'
              );
              return;
            }
            if (!res.status) {
              this.util.openSnackbar(
                res.message ||
                  this.translate.instant('BUILDER.TOOLBAR.TRANSLATE_FAIL', { target }),
                'ok'
              );
              return;
            }
            this.util.openSnackbar(
              this.translate.instant('BUILDER.TOOLBAR.TRANSLATE_SUCCESS', { target }),
              this.translate.instant('BUILDER.COMMON.CLOSE'),
              {
                duration: 2000,
              }
            );
            this.builder.deleteLocalPageByPage(page);
            this.builder.updateSuccess$.next(true);
            if (page.nid) {
              this.builderService.loadPage({
                langcode: target,
                nid: page.nid,
              });
            }
          },
          error: () => {
            this.builder.loading.set(false);
            this.util.openSnackbar(
              this.translate.instant('BUILDER.TOOLBAR.TRANSLATE_FAIL', { target }),
              'ok'
            );
          },
        });
    } else {
      if (page.uuid && page.nid) {
        // update page
        const submittedPage = this.builder.currentPage;
        this.util.openSnackbar(this.translate.instant('BUILDER.TOOLBAR.UPDATING'), 'ok');
        this.builderService
          .updateLandingPage(submittedPage, false)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(res => {
            const { status, message } = res;
            this.builder.loading.set(false);
            this.gotoPageList();
            if (status) {
              this.builder.deleteLocalPageByPage(submittedPage);
              this.builder.updateSuccess$.next(true);
            } else {
              this.util.openSnackbar(message, 'ok');
            }
          });
      } else {
        if (page.body.length === 0) {
          this.onNewPage();
        } else {
          // submit new page
          const submittedPage = this.builder.currentPage;
          this.builderService
            .createLandingPage(submittedPage, false)
            .pipe(
              takeUntilDestroyed(this.destroyRef),
              catchError(() => {
                this.builder.loading.set(false);
                return of({ status: false });
              })
            )
            .subscribe(res => {
              const { status, message } = res;
              this.builder.loading.set(false);
              this.gotoPageList();
              if (status) {
                this.builder.deleteLocalPageByPage(submittedPage);
                this.util.openSnackbar(message, 'ok');
                this.builder.updateSuccess$.next(true);
              } else {
                this.util.openSnackbar(this.translate.instant('BUILDER.TOOLBAR.CREATE_FAILED'), 'ok');
              }
            });
        }
      }
    }
  }

  gotoPageList(): void {
    const { search } = window.location;
    const query = qs.parse(search, { ignoreQueryPrefix: true });
    this.router.navigate(['/builder/page-list'], {
      queryParams: {
        ...query,
      },
    });
  }

  openLogin(): void {
    this.userService.openLoginDialog();
  }

  getLangLabel(code: string): string {
    return environment.langs?.find(l => l.langCode === code)?.label ?? code;
  }
}
