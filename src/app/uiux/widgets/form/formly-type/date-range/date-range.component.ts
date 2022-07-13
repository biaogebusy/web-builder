import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent extends FieldType implements OnInit {
  formControl: FormControl;
  range = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
  });
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.range.valueChanges.subscribe((res) => {
      // TODO: form value已生效，但是model不是最新的值
      this.form.get('start')?.patchValue(res.start, {
        emitEvent: true,
      });
      this.form.get('end')?.patchValue(res.end, {
        emitEvent: true,
      });
    });
  }
}
