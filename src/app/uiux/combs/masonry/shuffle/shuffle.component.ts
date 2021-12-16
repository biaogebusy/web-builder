import {
  Component,
  Input,
  OnInit,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import Shuffle from 'shufflejs';
@Component({
  selector: 'app-shuffle',
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.scss'],
})
export class ShuffleComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  shuffle: any;
  constructor(private el: ElementRef, private screenService: ScreenService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      const sizer = this.el.nativeElement.querySelectorAll('.sizer')[0];
      const shuffleEl =
        this.el.nativeElement.querySelectorAll('.shuffle-inner')[0];
      this.shuffle = new Shuffle(shuffleEl, {
        itemSelector: '.item',
        sizer,
        speed: 500,
        easing: 'ease-out',
        delimiter: ',',
      });
    }
  }
  onFilter(category: string): void {
    this.shuffle.filter(category);
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
