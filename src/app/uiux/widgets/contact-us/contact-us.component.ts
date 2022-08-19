import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormService } from '@core/service/form.service';
import { FormGroup } from '@angular/forms';
import { UtilitiesService } from '@core/service/utilities.service';

// TODO: need move to combs
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent implements OnInit {
  @Input() content: any;
  form: FormGroup;
  success = false;
  submited = false;
  constructor(
    private cd: ChangeDetectorRef,
    public formService: FormService,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.content.forms);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submited = true;
    const data = this.formService.getwebFormData(
      this.content.params,
      this.form
    );
    this.formService.submitWebForm(data).subscribe(
      (res) => {
        this.submited = false;
        this.success = true;
        this.utilitiesService.openSnackbar('成功提交！');
        this.form.reset();
        this.cd.detectChanges();
      },
      (error) => {
        this.submited = false;
        this.utilitiesService.openSnackbar(`Error: ${error.message}`);
        this.cd.detectChanges();
      }
    );
  }
}
