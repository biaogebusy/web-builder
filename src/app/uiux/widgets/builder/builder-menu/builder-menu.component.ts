import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import type { IPage } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';
import {
  BUILDER_CURRENT_PAGE,
  DEBUG_ANIMATE,
  USER,
} from '@core/token/token-providers';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-builder-menu',
  templateUrl: './builder-menu.component.html',
  styleUrls: ['./builder-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  page: IPage;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public contentState: ContentState,
    private builder: BuilderState,
    private util: UtilitiesService,
    private cd: ChangeDetectorRef,
    private builderService: BuilderService,
    @Inject(DEBUG_ANIMATE) public debugAnimate$: Observable<boolean>,
    @Inject(USER) private user: IUser,
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.debugAnimate$.subscribe((state) => {
      this.builder.renderMarkers(state);
    });
    this.currentPage$.subscribe((page) => {
      this.page = page;
      this.cd.detectChanges();
    });
  }

  onPageJson(): void {
    this.builder.builderRightContent$.next({
      mode: 'over',
      hasBackdrop: true,
      style: {
        width: '800px',
      },
      elements: [
        {
          type: 'jsoneditor',
          isPreview: true,
          data: this.page,
          isPage: true,
        },
      ],
    });
  }

  onClear(): void {
    this.builder.version.forEach((page) => (page.current = false));
    this.builder.version.unshift({
      title: '初始页面',
      body: [],
      current: true,
      time: new Date(),
    });
    this.builder.saveLocalVersions();
    this.contentState.drawerOpened$.next(false);
    this.util.openSnackbar('预览页面的组件已清空', 'ok');
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

  get canShow(): boolean {
    return !environment.production;
  }

  onDebugAnimate(event: MatSlideToggleChange): void {
    const isDebugAnimate = event.checked;
    this.builder.debugeAnimate$.next(isDebugAnimate);
    this.builder.renderMarkers(isDebugAnimate);
  }

  onPreview(): void {
    if (!this.page || this.page.body.length === 0) {
      this.util.openSnackbar('预览页面没有组件，请添加再预览', 'ok');
      return;
    }
    const url = window.location.origin;
    window.open(`${url}/builder/preview`, '_blank');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
