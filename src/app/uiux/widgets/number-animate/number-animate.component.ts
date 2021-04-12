import { ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-animate',
  templateUrl: './number-animate.component.html',
  styleUrls: ['./number-animate.component.scss'],
})
export class NumberAnimateComponent implements OnInit {
  @Input() content: any;
  duration: number;
  steps: number;
  @ViewChild('animatedDigit') animatedDigit: ElementRef;
  constructor() {}

  ngOnInit(): void {}
  animateCount(): void {
    if (!this.content.duration) {
      this.duration = 1000;
    }

    if (typeof this.content.value === 'number') {
      this.counterFunc(this.content.value, this.duration, this.animatedDigit);
    }
  }

  counterFunc(endValue: number, durationMs: number, element: ElementRef): void {
    if (!this.steps) {
      this.steps = 12;
    }

    const stepCount = Math.abs(durationMs / this.steps);
    const valueIncrement = (endValue - 0) / stepCount;
    const sinValueIncrement = Math.PI / stepCount;

    let currentValue = 0;
    let currentSinValue = 0;

    function step(): void {
      currentSinValue += sinValueIncrement;
      currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;

      element.nativeElement.textContent = Math.abs(Math.floor(currentValue));

      if (currentSinValue < Math.PI) {
        window.requestAnimationFrame(step);
      }
    }

    step();
  }

  ngAfterViewInit(): void {
    if (this.content.value) {
      this.animateCount();
    }
  }
}
