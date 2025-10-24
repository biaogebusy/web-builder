import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BUILDER_CURRENT_PAGE, BUILDER_FULL_SCREEN, USER } from '@core/token/token-providers';
import { ScreenService } from '@core/service/screen.service';
import type { IPage } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderService } from '@core/service/builder.service';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '@core/service/user.service';
import { Router } from '@angular/router';
import { IDialog } from '@core/interface/IDialog';
import qs from 'qs';

@Component({
  selector: 'app-builder-toolbar',
  templateUrl: './builder-toolbar.component.html',
  styleUrls: ['./builder-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BuilderToolbarComponent implements OnInit, AfterViewInit {
  public version = signal<IPage[] | undefined>(undefined);
  private user$ = inject<Observable<IUser>>(USER);
  public builderFullScreen$ = inject<Observable<boolean>>(BUILDER_FULL_SCREEN);
  public currentPage$ = inject<Observable<IPage>>(BUILDER_CURRENT_PAGE);

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

  private user: IUser;
  public date = signal<Date>(new Date());
  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.currentPage$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(page => {
      this.page = page;
      if (this.page.changed) {
        this.date.set(new Date(Number(this.page.changed) * 1000));
      }
    });
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
      title: '选择模板创建页面',
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
    if (!this.user) {
      this.openLogin();
      return;
    }

    if (this.page?.body.length === 0) {
      this.util.openSnackbar('请先添加组件', 'ok');
      return;
    }

    if (page.translation && page.target) {
      // 新增翻译
      this.builder.loading$.next(true);
      this.builderService
        .addTranslation(page)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(res => {
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
        // update page
        this.util.openSnackbar('正在更新！', 'ok');
        this.builderService
          .updateLandingPage(this.builder.currentPage)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(res => {
            const { status, message } = res;
            this.gotoPageList();
            if (status) {
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
          this.builderService
            .createLandingPage(this.builder.currentPage)
            .pipe(
              takeUntilDestroyed(this.destroyRef),
              catchError(() => {
                this.builder.loading$.next(false);
                return of({ status: false });
              })
            )
            .subscribe(res => {
              const { status, message } = res;
              this.gotoPageList();
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
}
