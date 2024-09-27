import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  BRANDING,
  BUILDER_CURRENT_PAGE,
  BUILDER_FULL_SCREEN,
  USER,
} from '@core/token/token-providers';
import { ScreenService } from '@core/service/screen.service';
import type { IPage } from '@core/interface/IAppConfig';
import type { IBranding } from '@core/interface/branding/IBranding';
import type { IUser } from '@core/interface/IUser';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderService } from '@core/service/builder.service';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { LoginComponent } from '@modules/user/login/login.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NodeService } from '@core/service/node.service';

@Component({
  selector: 'app-builder-toolbar',
  templateUrl: './builder-toolbar.component.html',
  styleUrls: ['./builder-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderToolbarComponent implements OnInit, AfterViewInit {
  page?: IPage;
  router = inject(Router);
  dialog = inject(MatDialog);
  builder = inject(BuilderState);
  util = inject(UtilitiesService);
  screenState = inject(ScreenState);
  storage = inject(LocalStorageService);
  screenService = inject(ScreenService);
  builderService = inject(BuilderService);
  nodeService = inject(NodeService);
  private destroyRef = inject(DestroyRef);
  user: IUser;
  constructor(
    @Inject(USER) private user$: Observable<IUser>,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(BUILDER_FULL_SCREEN) public builderFullScreen$: Observable<boolean>,
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>,
  ) {
    this.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.currentPage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((page) => {
        this.page = page;
      });
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screenState
        .mqAlias$()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((alia) => {
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

  onNewPage(): void {
    this.dialog.open(DialogComponent, {
      width: '1200px',
      data: {
        title: '选择模板创建页面',
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'builder-template',
          },
        },
      },
    });
  }

  onFullScreen(event: MatSlideToggleChange): void {
    this.storage.store('builderFullScreen', event.checked);
    this.builder.fullScreen$.next(event.checked);
  }

  onSubmit(page: IPage): void {
    if (page.translation && page.target) {
      // 新增翻译
      if (!this.user) {
        this.openLogin();
        return;
      }
      this.builder.loading$.next(true);
      this.builderService.addTranslation(page).subscribe((res) => {
        if (res.status) {
          this.util.openSnackbar(`翻译${page.target}成功`, '关闭', {
            duration: 2000,
          });
          this.builder.loading$.next(false);
          this.builder.updateSuccess$.next(true);
          if (page.nid) {
            this.builderService.loadPage({
              langcode: page.target,
              nid: page.nid,
            });
          }
        }
      });
    } else {
      if (page.uuid && page.nid) {
        if (!this.user) {
          this.openLogin();
          return;
        }
        // update page
        this.util.openSnackbar('正在更新！', 'ok');
        this.builderService
          .updateLandingPage(this.builder.currentPage)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(
            (res) => {
              this.builder.loading$.next(false);
              const { status, message } = res;
              this.util.openSnackbar(message, 'ok');

              if (status) {
                this.builder.updateSuccess$.next(true);
              }
            },
            (error) => {
              const {
                error: { message },
              } = error;
              this.builder.loading$.next(false);
              this.util.openSnackbar(message, 'ok');
            },
          );
      } else {
        if (page.body.length === 0) {
          this.onNewPage();
        } else {
          // submit new page
          if (!this.user.authenticated) {
            this.openLogin();
            return;
          }
          this.builderService
            .createLandingPage(this.builder.currentPage)
            .pipe(
              takeUntilDestroyed(this.destroyRef),
              catchError(() => {
                this.builder.loading$.next(false);
                return of({ status: false });
              }),
            )
            .subscribe((res) => {
              const { status, message } = res;
              if (status) {
                this.util.openSnackbar(message, 'ok');
                this.builder.updateSuccess$.next(true);
              } else {
                this.util.openSnackbar('新建失败！', 'ok');
              }
            });
        }
      }
    }
  }

  openLogin(): void {
    const queryParams = {
      returnUrl: 'builder',
    };
    this.router.navigate([], { queryParams });
    this.dialog.open(LoginComponent);
  }
}
