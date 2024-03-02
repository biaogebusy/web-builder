import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

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
  page: IPage;
  destroy$: Subject<boolean> = new Subject<boolean>();
  showNavigate: boolean = false;

  constructor(
    private storage: LocalStorageService,
    public builder: BuilderState,
    private screenState: ScreenState,
    private screenService: ScreenService,
    private util: UtilitiesService,
    private builderService: BuilderService,
    private dialog: MatDialog,
    @Inject(USER) private user: IUser,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(BUILDER_FULL_SCREEN) public builderFullScreen$: Observable<boolean>,
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>
  ) {}

  ngOnInit(): void {
    this.currentPage$.subscribe((page) => {
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

  toggleNavigate(): void {
    this.showNavigate = !this.showNavigate;
    this.builder.previewListDrawer$.next(this.showNavigate);
  }

  onSubmit(): void {
    if (!this.user) {
      this.util.openSnackbar('请登录后提交！', 'ok');
    }
    this.util.openSnackbar('正在提交！', 'ok');
    this.builderService
      .createLandingPage(this.builder.currentPage)
      .subscribe((res) => {
        this.builder.updateVersion(this.page);
        this.util.openSnackbar('提交成功！', 'ok');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
