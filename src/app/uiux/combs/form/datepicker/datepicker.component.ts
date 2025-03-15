import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DatepickerComponent implements OnInit {
  @Input() content: any;
  @Input() form: UntypedFormGroup;
  selected: Date | null;
  constructor() {}

  ngOnInit(): void {}

  get isValid(): boolean {
    if (!this.content.range && this.content?.key) {
      return this.form.controls[this.content.key].valid;
    } else {
      return false;
    }
  }

  onSelectedChange(value: Date): void {
    console.log(value);
    this.form.controls[this.content.key].setValue(
      formatDate(value, 'y-MM-dd', 'en-US')
    );
  }
}
