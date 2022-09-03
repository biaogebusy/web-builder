import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeComponent extends FieldType implements OnInit {
  formControl: FormControl;
  start: FormControl;
  end: FormControl;
  constructor(private cd: ChangeDetectorRef) {
    super();
  }

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
