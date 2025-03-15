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
  standalone: false,
})
export class BuilderComponent implements OnInit, AfterViewInit {
  @ViewChild('builderRightDrawer', { static: false })
  private builderRightDrawer: MatDrawer;
  public sidebarDrawerOpened = false;

  public builder = inject(BuilderState);
  private destroyRef = inject(DestroyRef);
  public builderFullScreen$ = inject<Observable<boolean>>(BUILDER_FULL_SCREEN);

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
    this.builder.closeRightDrawer$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(state => {
      if (state) {
        this.onClose();
      }
    });
  }

  onClose(): void {
    this.builderRightDrawer.close();
  }
}
