import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@uiux/base/base.widget';
import { UserState } from '@core/mobx/user/UserState';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  constructor(public userState: UserState) {
    super(userState);
  }

  ngOnInit(): void {}
}
