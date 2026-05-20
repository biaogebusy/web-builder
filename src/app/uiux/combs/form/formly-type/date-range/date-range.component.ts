import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FieldType, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormlyModule,
  ],
})
export class DateRangeComponent extends FieldType implements OnInit {
  private cd = inject(ChangeDetectorRef);

  start: UntypedFormControl;
  end: UntypedFormControl;

  ngOnInit(): void {
    if (this.field.fieldGroup && this.field.fieldGroup?.length > 0) {
      this.field.fieldGroup.map((item: any) => {
        if (item.key === 'start') {
          this.start = item.formControl;
        }
        if (item.key === 'end') {
          this.end = item.formControl;
        }
      });
      this.cd.detectChanges();
    }
  }
}
