import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { BuilderState } from '@core/state/BuilderState';
import { IBuilderTab } from '@core/interface/IBuilder';
import {
  BUILDERFULLSCREEN,
  BUILDERTABS,
  CORE_CONFIG,
} from '@core/token/token-providers';
import { UtilitiesService } from '@core/service/utilities.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScreenState } from '@core/state/screen/ScreenState';
import { tabs } from './data/tabs.data';
import { samples } from './data/samples.data';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  providers: [
    {
      provide: BUILDERTABS,
      useValue: tabs,
    },
  ],
})
export class BuilderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: IPage;
  @LocalStorage('page')
  page: IPage;
  @ViewChild('containerDrawer', { static: false }) containerDrawer: MatDrawer;
  @LocalStorage('builderFullScreen')
  builderFullScreen: boolean;
  samples: any;
  panelOpenState = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  mode: 'side' | 'over' | 'push' = 'side';
  constructor(
    private storage: LocalStorageService,
    public builder: BuilderState,
    private utli: UtilitiesService,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(BUILDERFULLSCREEN) public builderFullScreen$: Observable<boolean>,
    @Inject(BUILDERTABS) public tabs: IBuilderTab[],
    private screenState: ScreenState
  ) {}

  ngOnInit(): void {
    if (this.coreConfig.builder?.enable) {
      this.content = this.page;
      this.samples = samples;
      if (!this.builderFullScreen) {
        this.storage.store('builderFullScreen', false);
      }
      this.builder.animateDisable$.next(true);
    } else {
      this.utli.openSnackbar('请开启 Builder 功能！', 'ok');
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
    this.storage
      .observe(this.builder.pageKey)
      .pipe(takeUntil(this.destroy$))
      .subscribe((page) => {
        this.content = page;
      });
    this.screenState
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

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
