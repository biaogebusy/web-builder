import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { IBuilderComponent, IBuilderComponentElement } from '@core/interface/IBuilder';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-builder-panel',
  templateUrl: './builder-panel.component.html',
  styleUrls: ['./builder-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BuilderPanelComponent implements OnInit {
  @Input() content: IBuilderComponent[];
  public builder = inject(BuilderState);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private scrrenService = inject(ScreenService);
  public fixLabel = signal<string>('');

  ngOnInit(): void {
    this.builder.fixedChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.cd.detectChanges();
    });
  }

  onShowcase(widget: IBuilderComponentElement): void {
    if (this.builder.fixedShowcase) {
      return;
    }
    this.builder.showcase(cloneDeep(widget));
  }

  onFixed(item: any): void {
    const { label, content } = item;
    if (this.builder.fixedShowcase) {
      // click active
      if (content === this.builder.fixedContent) {
        this.builder.fixedShowcase = false;
        this.builder.showcase$.next(false);
        this.fixLabel.set('');
        return;
      }

      // switch to other
      if (content !== this.builder.fixedContent) {
        this.builder.fixedShowcase = true;
        this.fixLabel.set(label);
        this.builder.showcase(item);
        return;
      }
    }

    // set new active
    if (!this.builder.fixedShowcase) {
      this.builder.fixedShowcase = true;
      this.fixLabel.set(label);
      this.builder.showcase(item);
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

  add(content: any): void {
    this.builder.pushComponent(cloneDeep(content));
    const { body } = this.builder.currentPage;
    setTimeout(() => {
      this.scrrenService.scrollToAnchor(`item-${body.length - 1}`);
    }, 500);
  }
}
