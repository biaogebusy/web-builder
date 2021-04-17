import {
  Component,
  Input,
  OnInit,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { isArray, keyBy, map } from 'lodash-es';
import Shuffle from 'shufflejs';
@Component({
  selector: 'app-shuffle',
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.scss'],
})
export class ShuffleComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  shuffle: any;
  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.el);
    const sizer = this.el.nativeElement.querySelectorAll('.sizer')[0];
    const shuffleEl = this.el.nativeElement.querySelectorAll(
      '.shuffle-inner'
    )[0];
    console.log(shuffleEl);
    this.shuffle = new Shuffle(shuffleEl, {
      itemSelector: '.item',
      sizer,
      speed: 500,
      easing: 'ease-out',
      delimiter: ',',
    });
  }
  onFilter(category: string): void {
    console.log(category);
    this.shuffle.filter(category);
    // this.shuffle.filter((elements: any) => {
    //   map(elements, (element: any) => {
    //     console.log(element);
    //     return element.getAttribute('data-groups') === category;
    //   });
    // });
  }
}
