import { Component, Inject, ViewChild, inject } from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';
import {
  BUILDER_FULL_SCREEN,
  IS_BUILDER_MODE,
} from '@core/token/token-providers';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  host: { ngSkipHydration: 'true' },
})
export class BuilderComponent {
  @ViewChild('builderRightDrawer', { static: false })
  builderRightDrawer: MatDrawer;
  sidebarDrawerOpened = false;
  builder = inject(BuilderState);
  isBuilderMode: boolean;

  constructor(
    @Inject(BUILDER_FULL_SCREEN) public builderFullScreen$: Observable<boolean>,
    @Inject(IS_BUILDER_MODE) public isBuilderMode$: Observable<boolean>,
  ) {
    this.isBuilderMode$.pipe(takeUntilDestroyed()).subscribe((state) => {
      this.isBuilderMode = state;
    });
  }

  get drawerStyle(): object {
    if (this.isBuilderMode) {
      return {
        paddingLeft: this.sidebarDrawerOpened ? '0' : '80px',
      };
    } else {
      return {
        paddingLeft: 0,
      };
    }
  }
}
