import { Component, DestroyRef, OnInit, ViewChild, inject, AfterViewInit } from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_FULL_SCREEN } from '@core/token/token-providers';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  host: { ngSkipHydration: 'true' },
})
export class BuilderComponent implements OnInit, AfterViewInit {
  builderFullScreen$ = inject<Observable<boolean>>(BUILDER_FULL_SCREEN);

  @ViewChild('builderRightDrawer', { static: false })
  builderRightDrawer: MatDrawer;
  sidebarDrawerOpened = false;
  builder = inject(BuilderState);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.builder.rightContent$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(content => {
      if (content) {
        setTimeout(() => {
          this.builderRightDrawer.open();
        }, 100);
      }
    });
  }

  ngAfterViewInit(): void {
    this.builder.closeRightDrawer$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.onClose();
    });
  }

  onClose(): void {
    this.builderRightDrawer.close();
  }
}
