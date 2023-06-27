import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import type { IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BRANDING, BUILDER_FULL_SCREEN } from '@core/token/token-providers';
import { IBranding } from '@core/interface/branding/IBranding';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-builder-toolbar',
  templateUrl: './builder-toolbar.component.html',
  styleUrls: ['./builder-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderToolbarComponent
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
          disableToolbar: true,
        },
      ],
    });
  }

  onFullScreen(event: MatSlideToggleChange): void {
    this.storage.store('builderFullScreen', event.checked);
    this.builder.fullScreen$.next(event.checked);
  }

  onCompnentNavigate(): void {
    this.builder.builderContentDrawer$.next(true);
  }

  onPreview(): void {
    const url = window.location.origin;
    window.open(`${url}/builder/preview`, '_blank');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
