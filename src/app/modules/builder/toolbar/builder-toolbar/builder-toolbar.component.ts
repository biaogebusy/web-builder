import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subject, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
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

@Component({
  selector: 'app-builder-toolbar',
  templateUrl: './builder-toolbar.component.html',
  styleUrls: ['./builder-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderToolbarComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() builderRightDrawer: MatDrawer;
  page?: IPage;
  destroy$: Subject<boolean> = new Subject<boolean>();
  storage = inject(LocalStorageService);
  builder = inject(BuilderState);
  screenState = inject(ScreenState);
  screenService = inject(ScreenService);
  util = inject(UtilitiesService);
  builderService = inject(BuilderService);
  dialog = inject(MatDialog);
  router = inject(Router);
  user: IUser;
  constructor(
    @Inject(USER) private user$: Observable<IUser>,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(BUILDER_FULL_SCREEN) public builderFullScreen$: Observable<boolean>,
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>,
  ) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.currentPage$.pipe(takeUntil(this.destroy$)).subscribe((page) => {
      this.page = page;
    });
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screenState
        .mqAlias$()
        .pipe(takeUntil(this.destroy$))
        .subscribe((alia) => {
          if (alia.includes('xs')) {
            this.builder.fullScreen$.next(true);
            this.builderRightDrawer.close();
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
        title: '新增页面',
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
          if (page.id) {
            this.builderService.loadPage({
              langcode: page.target,
              id: page.id,
            });
          }
        }
      });
    } else {
      if (page.uuid && page.id) {
        if (!this.user) {
          this.openLogin();
          return;
        }
        // update page
        this.util.openSnackbar('正在更新！', 'ok');
        this.builderService
          .updateLandingPage(this.builder.currentPage)
          .pipe(
            takeUntil(this.destroy$),
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
              this.util.openSnackbar('更新失败！', 'ok');
            }
          });
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
              takeUntil(this.destroy$),
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
