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
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { LocalStorageService } from 'ngx-webstorage';
import { ScreenService } from '../../../core/service/screen.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BRANDING, BUILDERFULLSCREEN } from '@core/token/token-providers';
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
  @Output() animateChange: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private storage: LocalStorageService,
    private builder: BuilderState,
    private util: UtilitiesService,
    private screenState: ScreenState,
    private screenService: ScreenService,
    @Inject(BUILDERFULLSCREEN) public builderFullScreen$: Observable<boolean>,
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
            this.builder.toolbarDisable$.next(true);
            this.builder.fullScreen$.next(true);
            this.containerDrawer.close();
          } else {
          }
        });
    }
  }

  loadAnimate(): void {
    this.animateChange.emit(true);
  }

  onGenerate(): void {
    this.containerDrawer.toggle();
  }

  onFullScreen(event: MatSlideToggleChange): void {
    this.storage.store('builderFullScreen', event.checked);
    this.builder.fullScreen$.next(event.checked);
    this.builder.toolbarDisable$.next(event.checked);
    this.containerDrawer.close();
    this.util.openSnackbar('已禁用编辑组件，可预览组件动画', 'ok');
  }

  onCompnentNavigate(): void {
    this.builder.builderContentDrawer$.next(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
