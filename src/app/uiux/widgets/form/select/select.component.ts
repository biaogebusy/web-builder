import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IControl } from '@core/interface/widgets/IControl';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit {
  @Input() content: IControl;
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit(): void {}
  get isValid(): boolean {
    return this.form.controls[this.content.key].valid;
  }
}
