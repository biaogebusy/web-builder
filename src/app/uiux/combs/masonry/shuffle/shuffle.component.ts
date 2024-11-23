import {
  Component,
  Input,
  OnInit,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import type { IShuffle } from '@core/interface/combs/IMasonry';
import { ScreenService } from '@core/service/screen.service';
import Shuffle from 'shufflejs';
@Component({
  selector: 'app-shuffle',
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShuffleComponent implements OnInit, AfterViewInit {
  @Input() content: IShuffle;
  shuffle: any;
  private el = inject(ElementRef);
  private screenService = inject(ScreenService);

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
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
      }, 0);
    }
  }
  onChange(category: any): void {
    this.shuffle.filter(category.value);
  }
}
