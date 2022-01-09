import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IControl } from '@core/interface/widgets/IControl';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements OnInit {
  @Input() content: IControl;
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  get isValid(): boolean {
    return this.form.controls[this.content.key].valid;
  }
}
