import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScreenService } from '@core/service/screen.service';
import { FormService } from '@core/service/form.service';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss'],
})
export class FullCalendarComponent implements OnInit {
  @Input() content: any;
  selected: Date | null;
  form: FormGroup;
  constructor(
    private screenService: ScreenService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.initForm();
    }
  }

  initForm(): void {
    this.form = this.formService.toFormGroup(this.content.sidebar);
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
