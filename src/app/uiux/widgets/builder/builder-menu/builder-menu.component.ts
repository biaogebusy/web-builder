import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import type { IPage } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';
import {
  BUILDER_CURRENT_PAGE,
  COLOR_TEST,
  DEBUG_ANIMATE,
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
    @Inject(DEBUG_ANIMATE) public debugAnimate$: Observable<boolean>,
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>,
    @Inject(COLOR_TEST) private colorTestPage: IPage
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

  onColorTest(): void {
    this.util.openSnackbar(`正在载入${this.colorTestPage.title}...`, 'ok');
    this.builder.loadNewPage(this.colorTestPage);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
