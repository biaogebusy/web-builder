import { Component, Input } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { BaseComponent } from '@uiux/base/base.widget';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  imports: [MatStepperModule, DynamicComponentComponent],
})
export class StepperComponent extends BaseComponent {
  @Input() content: any;

}
