import { Component, DestroyRef, OnInit, inject, AfterViewInit, ChangeDetectionStrategy, viewChild, computed } from '@angular/core';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_FULL_SCREEN } from '@core/token/token-providers';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { filter } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BuilderSidebarComponent } from './sidebar/builder-sidebar/builder-sidebar.component';

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
  public sidebarDrawerOpened = false;

  public builder = inject(BuilderState);
  private destroyRef = inject(DestroyRef);
  public builderFullScreen = inject(BUILDER_FULL_SCREEN);
  private readonly router = inject(Router);
  private readonly navigationEnd = toSignal(
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
  );
  /** Routes with their own navigation can opt out of the sidebar on small screens. */
  readonly hideSidebarOnMobile = computed(() => {
    this.navigationEnd();
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
      if (route.data['hideSidebarOnMobile'] === true) return true;
    }
    return false;
  });

  ngOnInit(): void {
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
