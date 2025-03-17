import { Component, Input, ElementRef, inject, afterNextRender } from '@angular/core';
import type { IShuffle } from '@core/interface/combs/IMasonry';
import Shuffle from 'shufflejs';
@Component({
    selector: 'app-shuffle',
    templateUrl: './shuffle.component.html',
    styleUrls: ['./shuffle.component.scss'],
    standalone: false
})
export class ShuffleComponent {
  @Input() content: IShuffle;
  shuffle: any;
  private el = inject(ElementRef);
  constructor() {
    afterNextRender(() => {
      const sizer = this.el.nativeElement.querySelectorAll('.sizer')[0];
      const shuffleEl = this.el.nativeElement.querySelectorAll('.shuffle-inner')[0];
      setTimeout(() => {
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
    this.shuffle.filter(category.value);
  }
}
