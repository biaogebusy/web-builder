import { Component, Inject, ViewChild, inject } from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_FULL_SCREEN } from '@core/token/token-providers';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

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

  constructor(
    @Inject(BUILDER_FULL_SCREEN) public builderFullScreen$: Observable<boolean>,
  ) {}

  get drawerStyle(): object {
    return {
      paddingLeft: this.sidebarDrawerOpened ? '0' : '80px',
    };
  }
}
