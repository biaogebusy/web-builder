import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
    selector: 'app-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss'],
    standalone: false
})
export class StepperComponent extends BaseComponent implements OnInit {
  @Input() content: any;

  ngOnInit(): void {}
}
