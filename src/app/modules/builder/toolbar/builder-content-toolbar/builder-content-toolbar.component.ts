import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import type { IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { LocalStorageService } from 'ngx-webstorage';
import { ScreenService } from '../../../../core/service/screen.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BRANDING, BUILDER_FULL_SCREEN } from '@core/token/token-providers';
import { IBranding } from '@core/interface/branding/IBranding';

@Component({
  selector: 'app-builder-content-toolbar',
  templateUrl: './builder-content-toolbar.component.html',
  styleUrls: ['./builder-content-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderContentToolbarComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() containerDrawer: MatDrawer;
  @Input() page: IPage;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private storage: LocalStorageService,
    private builder: BuilderState,
    private screenState: ScreenState,
    private screenService: ScreenService,
    @Inject(BUILDER_FULL_SCREEN) public builderFullScreen$: Observable<boolean>,
    @Inject(BRANDING) public branding$: Observable<IBranding>
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screenState
        .mqAlias$()
        .pipe(takeUntil(this.destroy$))
        .subscribe((alia) => {
          if (alia.includes('xs')) {
            this.builder.fullScreen$.next(true);
            this.containerDrawer.close();
          }
        });
    }
  }

  onGenerate(): void {
    this.builder.dynamicContent$.next({
      elements: [
        {
          type: 'builder-generater',
        },
      ],
    });
  }

  onFullScreen(event: MatSlideToggleChange): void {
    this.storage.store('builderFullScreen', event.checked);
    this.builder.fullScreen$.next(event.checked);
    this.containerDrawer.close();
  }

  onCompnentNavigate(): void {
    this.builder.builderContentDrawer$.next(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
