import { Component, Input } from '@angular/core';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
    selector: 'app-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss'],
    standalone: false
})
export class StepperComponent extends BaseComponent {
  @Input() content: any;

}
