import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { FormService } from '@core/service/form.service';
import { UntypedFormGroup } from '@angular/forms';
import { UtilitiesService } from '@core/service/utilities.service';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ContactUsComponent implements OnInit {
  private cd = inject(ChangeDetectorRef);
  formService = inject(FormService);
  private utilitiesService = inject(UtilitiesService);

  @Input() content: any;
  form = new UntypedFormGroup({});
  model: any = {};
  success = false;
  submited = false;

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submited = true;
    const data = this.formService.getwebFormData(this.content.params, this.form.value);
    this.formService.submitWebForm(data).subscribe(
      res => {
        this.submited = false;
        this.success = true;
        this.utilitiesService.openSnackbar('成功提交！');
        this.form.reset();
        this.cd.detectChanges();
      },
      error => {
        this.submited = false;
        this.utilitiesService.openSnackbar(`Error: ${error.message}`);
        this.cd.detectChanges();
      }
    );
  }
}
