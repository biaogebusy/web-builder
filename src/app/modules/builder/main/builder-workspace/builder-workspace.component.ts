import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { BUILDER_FULL_SCREEN, CORE_CONFIG } from '@core/token/token-providers';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-builder-workspace',
  templateUrl: './builder-workspace.component.html',
  styleUrl: './builder-workspace.component.scss',
})
export class BuilderWorkspaceComponent implements AfterViewInit, OnDestroy {
  @ViewChild('builderRightDrawer', { static: false })
  builderRightDrawer: MatDrawer;
  builderFullScreen: boolean;
  panelOpenState = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  mode: 'side' | 'over' | 'push' = 'side';

  builder = inject(BuilderState);
  utli = inject(UtilitiesService);
  screenState = inject(ScreenState);
  storage = inject(LocalStorageService);

  constructor(
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(BUILDER_FULL_SCREEN) public builderFullScreen$: Observable<boolean>,
  ) {}

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
    this.builder.rightContent$
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

    this.builder.closeRightDrawer$
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
