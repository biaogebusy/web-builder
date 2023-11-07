import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { BuilderState } from '@core/state/BuilderState';
import type { IBuilderSamplePage, IUiux } from '@core/interface/IBuilder';
import {
  BUILDER_FULL_SCREEN,
  BUILDER_SAMPLE_PAGE,
  CORE_CONFIG,
  UIUX,
} from '@core/token/token-providers';
import { UtilitiesService } from '@core/service/utilities.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScreenState } from '@core/state/screen/ScreenState';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: IPage;
  @LocalStorage('page')
  page: IPage;
  @ViewChild('containerDrawer', { static: false }) containerDrawer: MatDrawer;
  @LocalStorage('builderFullScreen')
  builderFullScreen: boolean;
  panelOpenState = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  mode: 'side' | 'over' | 'push' = 'side';
  constructor(
    private injector: Injector,
    public builder: BuilderState,
    private cd: ChangeDetectorRef,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(BUILDER_FULL_SCREEN) public builderFullScreen$: Observable<boolean>,
    @Inject(UIUX) public uiux: IUiux[],
    @Inject(BUILDER_SAMPLE_PAGE) public samples: IBuilderSamplePage
  ) {}

  ngOnInit(): void {
    const storage = this.injector.get(LocalStorageService);
    const utli = this.injector.get(UtilitiesService);
    if (this.coreConfig.builder?.enable) {
      this.content = this.page;
      if (!this.builderFullScreen) {
        storage.store('builderFullScreen', false);
      }
      this.builder.animateDisable$.next(true);
    } else {
      utli.openSnackbar('请开启 Builder 功能！', 'ok');
    }
    this.builder.dynamicContent$.subscribe((content) => {
      if (content) {
        setTimeout(() => {
          this.containerDrawer.open();
        }, 100);
      }
    });
  }

  ngAfterViewInit(): void {
    const builder = this.injector.get(BuilderState);
    const storage = this.injector.get(LocalStorageService);
    const screenState = this.injector.get(ScreenState);
    storage
      .observe(builder.pageKey)
      .pipe(takeUntil(this.destroy$))
      .subscribe((page) => {
        this.content = page;
        this.cd.detectChanges();
      });
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
  }

  onExpand(): void {
    this.containerDrawer.close();
  }

  onTabChange(): void {
    this.builder.showcase$.next(false);
    this.builder.fixedContent = null;
    this.builder.fixedShowcase = false;
    this.builder.fixedChange$.next(true);
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
