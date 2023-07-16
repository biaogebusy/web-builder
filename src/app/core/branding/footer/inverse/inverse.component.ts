import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../service/form.service';
import { UtilitiesService } from '@core/service/utilities.service';

@Component({
  selector: 'app-inverse',
  templateUrl: './inverse.component.html',
  styleUrls: ['./inverse.component.scss'],
})
export class InverseComponent implements OnInit {
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
    if (this.content?.footerNewsletter) {
      this.form = this.formService.toFormGroup(
        this.content.footerNewsletter.forms
      );
    }
  }

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
