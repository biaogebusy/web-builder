import {
  Component,
  DestroyRef,
  Inject,
  OnInit,
  ViewChild,
  inject,
  AfterViewInit,
} from '@angular/core';
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
export class BuilderComponent implements OnInit, AfterViewInit {
  @ViewChild('builderRightDrawer', { static: false })
  builderRightDrawer: MatDrawer;
  sidebarDrawerOpened = false;
  builder = inject(BuilderState);
  isBuilderMode: boolean;
  private destroyRef = inject(DestroyRef);

  constructor(
    @Inject(BUILDER_FULL_SCREEN) public builderFullScreen$: Observable<boolean>,
    @Inject(IS_BUILDER_MODE) public isBuilderMode$: Observable<boolean>,
  ) {
    this.isBuilderMode$.pipe(takeUntilDestroyed()).subscribe((state) => {
      this.isBuilderMode = state;
    });
  }

  ngOnInit(): void {
    this.builder.rightContent$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((content) => {
        if (content) {
          setTimeout(() => {
            this.builderRightDrawer.open();
          }, 100);
        }
      });
  }

  ngAfterViewInit(): void {
    this.builder.closeRightDrawer$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.onClose();
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

  onClose(): void {
    this.builderRightDrawer.close();
  }
}
