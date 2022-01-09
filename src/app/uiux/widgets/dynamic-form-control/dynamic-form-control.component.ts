import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IControl } from '@core/interface/widgets/IControl';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormControlComponent implements OnInit {
  @Input() control: IControl;
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit(): void {}
  get isValid(): boolean {
    return this.form.controls[this.control.key].valid;
  }
}
