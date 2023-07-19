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
import { CanvasService } from '@core/service/canvas.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';
import { DEBUG_ANIMATE } from '@core/token/token-providers';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-builder-menu',
  templateUrl: './builder-menu.component.html',
  styleUrls: ['./builder-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: any;
  @LocalStorage('page')
  page: IPage;
  total: number;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public contentState: ContentState,
    private builder: BuilderState,
    private util: UtilitiesService,
    private cd: ChangeDetectorRef,
    private storage: LocalStorageService,
    private canvasService: CanvasService,
    @Inject(DEBUG_ANIMATE) public debugAnimate$: Observable<boolean>
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getTotal();
    this.debugAnimate$.subscribe((state) => {
      //TODO
      this.builder.renderMarkers(state);
    });
  }

  getTotal(): void {
    const localPage = this.storage.retrieve(this.builder.pageKey);
    if (localPage) {
      this.total = localPage.body.length;
    } else {
      this.total = 0;
    }
    this.cd.detectChanges();
    this.storage
      .observe(this.builder.pageKey)
      .pipe(takeUntil(this.destroy$))
      .subscribe((page) => {
        if (page && page.body) {
          this.total = page.body.length;
        } else {
          this.total = 0;
        }
        this.cd.detectChanges();
      });
  }

  onPreview(): void {
    if (!this.page || this.page.body.length === 0) {
      this.util.openSnackbar('预览页面没有组件，请添加再预览', 'ok');
      return;
    }
    this.contentState.drawerOpened$.next(true);
    this.contentState.drawerContent$.next(this.page);
  }

  onPageJson(): void {
    this.builder.dynamicContent$.next({
      mode: 'side',
      hasBackdrop: true,
      style: {
        width: '800px',
      },
      elements: [
        {
          type: 'jsoneditor',
          isPreview: true,
          data: this.page,
          disableToolbar: true,
        },
      ],
    });
  }

  onClear(): void {
    this.builder.initPage({
      title: '着陆页',
      body: [],
    });
    this.contentState.drawerOpened$.next(false);
    this.util.openSnackbar('预览页面的组件已清空', 'ok');
  }

  onSubmit(): void {
    this.util.openSnackbar('功能尚未开发，可以手动复制页面 JSON', 'ok');
  }

  onDebugAnimate(event: MatSlideToggleChange): void {
    const isDebugAnimate = event.checked;
    this.builder.debugeAnimate$.next(isDebugAnimate);
    this.builder.renderMarkers(isDebugAnimate);
  }

  onDownload(): void {
    const page = document.getElementById('builder-list');
    if (page) {
      this.canvasService.openDialog(page);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
