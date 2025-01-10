import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import type { IContactUs1v1 } from '@core/interface/combs/IForm';
import { FormService } from '@core/service/form.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-contact-us-1v1',
  templateUrl: './contact-us1v1.component.html',
  styleUrls: ['./contact-us1v1.component.scss'],
})
export class ContactUs1v1Component extends BaseComponent implements OnInit {
  @Input() content: IContactUs1v1;
  form: UntypedFormGroup = new UntypedFormGroup({});
  model: any = {};
  constructor(
    private formService: FormService,
    private util: UtilitiesService
  ) {
    super();
  }

  ngOnInit(): void {}

  onSubmit(value: any): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = this.formService.getwebFormData(this.content.params, value.form);
    this.formService.submitWebForm(data).subscribe(
      res => {
        this.util.openSnackbar('成功提交！');
        this.form.reset();
      },
      error => {
        this.util.openSnackbar(`提交失败！`);
      }
    );
  }
}
