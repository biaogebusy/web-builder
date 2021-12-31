import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-carousel1v2',
  templateUrl: './carousel1v2.component.html',
  styleUrls: ['./carousel1v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carousel1v2Component implements OnInit {
  @Input() content: any;
  navigation$ = new Subject();
  constructor() {}

  ngOnInit(): void {}

  onPrev(): void {
    this.navigation$.next(-1);
  }
  onNext(): void {
    this.navigation$.next(1);
  }
}
