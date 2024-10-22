import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormService } from '@core/service/form.service';
import { UtilitiesService } from '@core/service/utilities.service';

@Component({
  selector: 'app-inverse',
  templateUrl: './inverse.component.html',
  styleUrls: ['./inverse.component.scss'],
  host: { ngSkipHydration: 'true' },
})
export class InverseComponent implements OnInit {
  @Input() content: any;
  form: UntypedFormGroup = new UntypedFormGroup({});
  success = false;
  submited = false;

  constructor(
    private cd: ChangeDetectorRef,
    public formService: FormService,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {}

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
        this.utilitiesService.openSnackbar('成功订阅！');
        this.cd.detectChanges();
      },
      (error) => {
        this.submited = false;
        this.utilitiesService.openSnackbar(`Error: ${error.message}`);
      }
    );
  }
}
