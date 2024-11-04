import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormService } from '@core/service/form.service';
import { UtilitiesService } from '@core/service/utilities.service';

@Component({
  selector: 'app-inverse',
  templateUrl: './inverse.component.html',
  styleUrls: ['./inverse.component.scss'],
  host: { ngSkipHydration: 'true' },
})
export class InverseComponent {
  @Input() content: any;
  form: UntypedFormGroup = new UntypedFormGroup({});
  success = false;
  submited = false;

  private cd = inject(ChangeDetectorRef);
  public formService = inject(FormService);
  private util = inject(UtilitiesService);

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submited = true;
    const data = this.formService.getwebFormData(
      this.content.footerNewsletter.params,
      this.form.value
    );
    this.formService.submitWebForm(data).subscribe(
      () => {
        this.submited = false;
        this.success = true;
        this.util.openSnackbar('成功订阅！');
        this.cd.detectChanges();
      },
      (error) => {
        this.submited = false;
        this.util.openSnackbar(`Error: ${error.message}`);
      }
    );
  }
}
