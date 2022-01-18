import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../service/form.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../service/api.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { UserState } from '@core/mobx/user/UserState';

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
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    public formService: FormService,
    private http: HttpClient,
    private utilitiesService: UtilitiesService,
    private userState: UserState
  ) {}

  ngOnInit(): void {
    this.form = this.formService.toFormGroup(
      this.content.footerNewsletter.forms
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submited = true;
    const data = this.formService.getwebFormData(
      this.content.footerNewsletter.params,
      this.form
    );
    this.http
      .post(
        `${this.apiService.apiUrl}/webform_rest/submit`,
        data,
        this.apiService.optionsWithCookieAndToken(this.userState.csrfToken)
      )
      .subscribe(
        (res) => {
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
