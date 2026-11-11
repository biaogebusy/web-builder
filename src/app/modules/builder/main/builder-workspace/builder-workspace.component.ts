
import { AfterViewInit, Component, DestroyRef, inject, OnInit, DOCUMENT, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CONFIG, BUILDER_FULL_SCREEN, CORE_CONFIG } from '@core/token/token-providers';
import { LocalStorageService } from 'ngx-webstorage';
import { ScreenService } from '@core/service/screen.service';
import { TourService } from '@core/service/tour.service';
import { IBuilderConfig } from '@core/interface/IBuilder';
import { TranslateService } from '@ngx-translate/core';
import { BuilderToolbarComponent } from '../../toolbar/builder-toolbar/builder-toolbar.component';
import { BuilderVersionComponent } from '../../sidebar/builder-version/builder-version.component';
import { BuilderShowcaseComponent } from '../builder-showcase/builder-showcase.component';
import { BuilderListComponent } from '../builder-list/builder-list.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-builder-workspace',
  templateUrl: './builder-workspace.component.html',
  styleUrl: './builder-workspace.component.scss',
  imports: [
    SHARE_IMPORTS,
    WIDGETS_IMPORTS,
    MatSidenavModule,
    RouterOutlet,
    BuilderToolbarComponent,
    BuilderVersionComponent,
    BuilderShowcaseComponent,
    BuilderListComponent,
  ],
})
export class BuilderWorkspaceComponent implements AfterViewInit, OnInit {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private doc = inject<Document>(DOCUMENT);
  private builderConfig = inject(BUILDER_CONFIG);
  public builderFullScreen = inject(BUILDER_FULL_SCREEN);

  public builder = inject(BuilderState);
  private utli = inject(UtilitiesService);
  private storage = inject(LocalStorageService);
  private destroyRef = inject(DestroyRef);
  private tourService = inject(TourService);
  private screenSerivce = inject(ScreenService);
  private translate = inject(TranslateService);

  ngOnInit(): void {
    if (this.coreConfig.builder?.enable) {
      const stored = this.storage.retrieve('builderFullScreen');
      if (!stored) {
        this.storage.store('builderFullScreen', false);
      }
      this.builder.animateDisable$.next(true);
    } else {
      this.utli.openSnackbar(this.translate.instant('BUILDER.WORKSPACE.ENABLE_BUILDER'), 'ok');
    }
  }

  ngAfterViewInit(): void {
    if (!this.screenSerivce.isPlatformBrowser()) return;
    this.builderConfig
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((config: IBuilderConfig) => {
        if (!config) {
          return;
        }
        const { tour } = config;
        if (tour?.enable) {
          this.tourService.init(tour);
        }
      });

    const toggleFullWidth = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        event.code !== 'KeyS' || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey ||
        event.repeat || event.isComposing || event.defaultPrevented || target?.isContentEditable ||
        (target?.localName !== 'body' && target?.localName !== 'mat-drawer')
      ) return;
      // Navigation and viewport changes can reset the visible layout without updating storage.
      const isFull = !this.builderFullScreen();
      this.storage.store('builderFullScreen', isFull);
      this.builder.fullScreen$.next(isFull);
    };
    this.doc.addEventListener('keydown', toggleFullWidth);
    this.destroyRef.onDestroy(() => this.doc.removeEventListener('keydown', toggleFullWidth));
  }
}

