import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnInit {
  @Input() content: any;
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  get isValid(): boolean {
    return this.form.controls[this.content.key].valid;
  }
}
