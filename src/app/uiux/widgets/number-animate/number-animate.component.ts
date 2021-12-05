import { ElementRef, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ScreenService } from 'src/app/core/service/screen.service';
import { ScreenState } from '../../../mobx/screen/ScreenState';

@Component({
  selector: 'app-number-animate',
  templateUrl: './number-animate.component.html',
  styleUrls: ['./number-animate.component.scss'],
})
export class NumberAnimateComponent implements OnInit {
  @Input() content: any;
  duration: number;
  steps: number;
  first = true;

  @ViewChild('animatedDigit') animatedDigit: ElementRef;
  constructor(
    private screenState: ScreenState,
    private screen: ScreenService
  ) {}

  ngOnInit(): void {}
}
