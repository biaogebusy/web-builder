import { ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import type { INumberAnimate } from '@core/interface/widgets/INumberAnimate';

@Component({
  selector: 'app-number-animate',
  templateUrl: './number-animate.component.html',
  styleUrls: ['./number-animate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberAnimateComponent implements OnInit {
  @Input() content: INumberAnimate;

  @ViewChild('animatedDigit') animatedDigit: ElementRef;
  constructor() {}

  ngOnInit(): void {}
}
