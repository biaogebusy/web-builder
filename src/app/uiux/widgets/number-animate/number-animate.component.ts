import { ChangeDetectionStrategy, input } from '@angular/core';
import { Component } from '@angular/core';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import type { INumberAnimate } from '@core/interface/widgets/INumberAnimate';

@Component({
  selector: 'app-number-animate',
  templateUrl: './number-animate.component.html',
  styleUrls: ['./number-animate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContenteditDirective],
})
export class NumberAnimateComponent {
  readonly content = input<INumberAnimate>();

  constructor() {}

}
