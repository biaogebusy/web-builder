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

@Component({
  selector: 'app-builder-toolbar',
  templateUrl: './builder-toolbar.component.html',
  styleUrls: ['./builder-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderToolbarComponent implements OnInit, AfterViewInit {
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
      this.builderService.addTranslation(page).subscribe(res => {
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
            res => {
              this.builder.loading$.next(false);
              const { status, message } = res;
              this.util.openSnackbar(message, 'ok');

              if (status) {
                this.builder.updateSuccess$.next(true);
              }
            },
            error => {
              const {
                error: { message },
              } = error;
              this.builder.loading$.next(false);
              this.util.openSnackbar(message, 'ok');
            }
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
              })
            )
            .subscribe(res => {
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
    this.userService.openLoginDialog(queryParams);
  }
}
