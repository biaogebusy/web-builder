import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  Inject,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { BUILDER_FULL_SCREEN, CORE_CONFIG } from '@core/token/token-providers';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { TagsService } from '@core/service/tags.service';

@Component({
  selector: 'app-builder-workspace',
  templateUrl: './builder-workspace.component.html',
  styleUrl: './builder-workspace.component.scss',
})
export class BuilderWorkspaceComponent implements AfterViewInit {
  builderFullScreen: boolean;
  panelOpenState = false;
  mode: 'side' | 'over' | 'push' = 'side';

  builder = inject(BuilderState);
  utli = inject(UtilitiesService);
  screenState = inject(ScreenState);
  storage = inject(LocalStorageService);
  private destroyRef = inject(DestroyRef);
  tagService = inject(TagsService);
  constructor(
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(BUILDER_FULL_SCREEN) public builderFullScreen$: Observable<boolean>,
  ) {
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
    this.screenState
      .mqAlias$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((alia) => {
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
      if (
        (code === 'KeyS' && localName === 'body') ||
        localName === 'mat-drawer'
      ) {
        this.storage.store('builderFullScreen', !isFull);
        this.builder.fullScreen$.next(!isFull);
      }
    });
  }
}
