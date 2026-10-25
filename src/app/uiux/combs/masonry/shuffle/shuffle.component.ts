import { Component, DestroyRef, ElementRef, inject, afterNextRender, ChangeDetectionStrategy, input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import type { IShuffle } from '@core/interface/combs/IMasonry';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import Shuffle from 'shufflejs';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shuffle',
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.scss'],
  imports: [MatButtonToggleModule, TitleComponent, DynamicComponentComponent],
})
export class ShuffleComponent {
  readonly content = input<IShuffle>();
  /** Active layout instance for the rendered grid. */
  shuffle?: Shuffle;
  private el = inject(ElementRef);
  private destroyRef = inject(DestroyRef);
  private initTimer?: ReturnType<typeof setTimeout>;
  constructor() {
    this.destroyRef.onDestroy(() => {
      clearTimeout(this.initTimer);
      this.shuffle?.destroy();
    });
    afterNextRender(() => {
      const sizer = this.el.nativeElement.querySelectorAll('.sizer')[0];
      const shuffleEl = this.el.nativeElement.querySelectorAll('.shuffle-inner')[0];
      // Optional content can leave the grid absent during the first render.
      if (!shuffleEl) {
        return;
      }
      this.initTimer = setTimeout(() => {
        this.shuffle = new Shuffle(shuffleEl, {
          itemSelector: '.item',
          sizer,
          speed: 500,
          easing: 'ease-out',
          delimiter: ',',
        });
      }, 500);
    });
  }

  onChange(category: any): void {
    this.shuffle?.filter(category.value);
  }
}
