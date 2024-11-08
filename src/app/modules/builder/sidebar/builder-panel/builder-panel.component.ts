import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { IBuilderComponent } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-builder-panel',
  templateUrl: './builder-panel.component.html',
  styleUrls: ['./builder-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' },
})
export class BuilderPanelComponent implements OnInit {
  @Input() content: IBuilderComponent[];
  public builder = inject(BuilderState);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.builder.fixedChange$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.cd.detectChanges();
      });
  }

  onShowcase(content: any): void {
    if (this.builder.fixedShowcase) {
      return;
    }
    this.builder.showcase(content);
  }

  onFixed(content: any): void {
    if (this.builder.fixedShowcase) {
      // click active
      if (content === this.builder.fixedContent) {
        this.builder.fixedShowcase = false;
        this.builder.showcase$.next(false);
        return;
      }

      // switch to other
      if (content !== this.builder.fixedContent) {
        this.builder.showcase(content);
        return;
      }
    }

    // set new active
    if (!this.builder.fixedShowcase) {
      this.builder.fixedShowcase = true;
      this.builder.showcase(content);
    }
  }

  hideShowcase(): void {
    if (!this.builder.fixedShowcase) {
      this.builder.showcase$.next(false);
    }
  }

  onMoved(): void {
    this.builder.showcase$.next(false);
  }

  onDragStarted(): void {
    this.builder.closeRightDrawer$.next(true);
    this.builder.switchPreivew$.next('none');
  }

  onAfterExpand(): void {
    this.builder.cancelFixedShowcase();
  }
}
