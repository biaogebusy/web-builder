import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { BUILDER_CONFIG, BUILDER_FULL_SCREEN, CORE_CONFIG } from '@core/token/token-providers';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { TagsService } from '@core/service/tags.service';
import { ScreenService } from '@core/service/screen.service';
import { TourService } from '@core/service/tour.service';
import { IBuilderConfig } from '@core/interface/IBuilder';

@Component({
  selector: 'app-builder-workspace',
  templateUrl: './builder-workspace.component.html',
  styleUrl: './builder-workspace.component.scss',
})
export class BuilderWorkspaceComponent implements AfterViewInit, OnInit {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private doc = inject<Document>(DOCUMENT);
  builderConfig$ = inject<Observable<IBuilderConfig>>(BUILDER_CONFIG);
  builderFullScreen$ = inject<Observable<boolean>>(BUILDER_FULL_SCREEN);

  builderFullScreen: boolean;
  panelOpenState = false;
  mode: 'side' | 'over' | 'push' = 'side';

  builder = inject(BuilderState);
  utli = inject(UtilitiesService);
  screenState = inject(ScreenState);
  storage = inject(LocalStorageService);
  private destroyRef = inject(DestroyRef);
  tagService = inject(TagsService);
  private tourService = inject(TourService);
  private screenSerivce = inject(ScreenService);

  constructor() {
    this.tagService.setTitle('工作区');
  }

  ngOnInit(): void {
    if (this.coreConfig.builder?.enable) {
      this.builderFullScreen = this.storage.retrieve('builderFullScreen');
      if (!this.builderFullScreen) {
        this.storage.store('builderFullScreen', false);
      }
      this.builder.animateDisable$.next(true);
    } else {
      this.utli.openSnackbar('请开启 Builder 功能！', 'ok');
    }
  }

  ngAfterViewInit(): void {
    if (this.screenSerivce.isPlatformBrowser()) {
      this.builderConfig$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((config: IBuilderConfig) => {
          const { tour } = config;
          if (tour?.enable) {
            this.tourService.init(tour);
          }
        });
    }
    this.screenState
      .mqAlias$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(alia => {
        if (alia.includes('xs')) {
          this.mode = 'over';
        } else {
          this.mode = 'side';
        }
      });

    this.doc.addEventListener('keydown', (event: any) => {
      const isFull = this.storage.retrieve('builderFullScreen');
      const {
        code,
        target: { localName },
      } = event;
      if ((code === 'KeyS' && localName === 'body') || localName === 'mat-drawer') {
        this.storage.store('builderFullScreen', !isFull);
        this.builder.fullScreen$.next(!isFull);
      }
    });
  }
}
