import { Component, DestroyRef, OnInit, inject, AfterViewInit, ChangeDetectionStrategy, viewChild, effect, signal } from '@angular/core';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_FULL_SCREEN } from '@core/token/token-providers';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BuilderSidebarComponent } from './sidebar/builder-sidebar/builder-sidebar.component';
import { ScreenState } from '@core/state/screen/ScreenState';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  imports: [
    SHARE_IMPORTS,
    WIDGETS_IMPORTS,
    MatSidenavModule,
    RouterOutlet,
    BuilderSidebarComponent,
  ],
})
export class BuilderComponent implements OnInit, AfterViewInit {
  private readonly builderRightDrawer = viewChild<MatDrawer>('builderRightDrawer');
  /** Whether the full navigation drawer is expanded. */
  readonly sidebarDrawerOpened = signal(false);

  public builder = inject(BuilderState);
  private destroyRef = inject(DestroyRef);
  public builderFullScreen = inject(BUILDER_FULL_SCREEN);
  private readonly router = inject(Router);
  /** Use the shared mobile breakpoint for drawer mode and navigation controls. */
  readonly isMobile = toSignal(
    inject(ScreenState).mqAlias$().pipe(
      map(aliases => aliases.includes('xs')),
      distinctUntilChanged()
    ),
    { initialValue: false }
  );

  constructor() {
    effect(() => {
      if (this.isMobile()) this.sidebarDrawerOpened.set(false);
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      if (this.isMobile()) this.sidebarDrawerOpened.set(false);
    });
    this.builder.rightContent$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(content => {
      if (content) {
        setTimeout(() => {
          this.builderRightDrawer()!.open();
        }, 100);
      }
    });
  }

  ngAfterViewInit(): void {
    this.builder.closeRightDrawer$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(state => {
      if (state) {
        this.onClose();
      }
    });
  }

  onClose(): void {
    this.builderRightDrawer()!.close();
  }
}
