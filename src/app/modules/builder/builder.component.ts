import {
  AfterViewInit,
  Component,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { LocalStorageService } from 'ngx-webstorage';
import { BuilderState } from '@core/state/BuilderState';
import {
  BUILDER_CURRENT_PAGE,
  BUILDER_FULL_SCREEN,
  CORE_CONFIG,
} from '@core/token/token-providers';
import { UtilitiesService } from '@core/service/utilities.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScreenState } from '@core/state/screen/ScreenState';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  host: { ngSkipHydration: 'true' },
})
export class BuilderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('builderRightDrawer', { static: false })
  builderRightDrawer: MatDrawer;
  builderFullScreen: boolean;
  panelOpenState = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  mode: 'side' | 'over' | 'push' = 'side';
  constructor(
    private injector: Injector,
    public builder: BuilderState,
    private storage: LocalStorageService,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(BUILDER_FULL_SCREEN) public builderFullScreen$: Observable<boolean>,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>,
  ) {}

  ngOnInit(): void {
    const storage = this.injector.get(LocalStorageService);
    const utli = this.injector.get(UtilitiesService);
    if (this.coreConfig.builder?.enable) {
      this.builderFullScreen = storage.retrieve('builderFullScreen');
      if (!this.builderFullScreen) {
        storage.store('builderFullScreen', false);
      }
      this.builder.animateDisable$.next(true);
    } else {
      utli.openSnackbar('请开启 Builder 功能！', 'ok');
    }
    this.builder.builderRightContent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((content) => {
        if (content) {
          setTimeout(() => {
            this.builderRightDrawer.open();
          }, 100);
        }
      });
  }

  ngAfterViewInit(): void {
    const screenState = this.injector.get(ScreenState);

    screenState
      .mqAlias$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((alia) => {
        if (alia.includes('xs')) {
          this.mode = 'over';
        } else {
          this.mode = 'side';
        }
      });

    this.builder.closeBuilderRightDrawer$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.onClose();
      });

    this.doc.addEventListener('keydown', (event: any) => {
      const isFull = this.storage.retrieve('builderFullScreen');
      const {
        code,
        target: { localName },
      } = event;
      if (
        (code === 'KeyS' && localName === 'body') ||
        localName === 'mat-drawer'
      ) {
        this.storage.store('builderFullScreen', !isFull);
        this.builder.fullScreen$.next(!isFull);
      }
    });
  }

  onClose(): void {
    this.builderRightDrawer.close();
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
