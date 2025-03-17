import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import type { INumberAnimate } from '@core/interface/widgets/INumberAnimate';

@Component({
    selector: 'app-number-animate',
    templateUrl: './number-animate.component.html',
    styleUrls: ['./number-animate.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NumberAnimateComponent implements OnInit {
  @Input() content: INumberAnimate;

  constructor() {}

  ngOnInit(): void {}
}
