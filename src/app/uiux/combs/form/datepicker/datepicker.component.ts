import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
})
export class DatepickerComponent {
  @Input() content: any;
  @Input() form: UntypedFormGroup;
  selected: Date | null;
  constructor() {}


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
