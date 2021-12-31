import { ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-animate',
  templateUrl: './number-animate.component.html',
  styleUrls: ['./number-animate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberAnimateComponent implements OnInit {
  @Input() content: any;
  duration: number;
  steps: number;
  first = true;

  @ViewChild('animatedDigit') animatedDigit: ElementRef;
  constructor() {}

  ngOnInit(): void {}
}
