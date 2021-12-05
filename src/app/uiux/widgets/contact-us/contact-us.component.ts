import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '@core/service/form.service';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '@core/service/api.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  @Input() content: any;
  form: FormGroup;
  success = false;
  submited = false;
  constructor(
    public formService: FormService,
    private http: HttpClient,
    private apiService: ApiService,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.content.forms);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submited = true;
    const httpOptons = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.apiService.csrfToken,
      }),
    };
    const data = this.formService.getwebFormData(
      this.content.params,
      this.form
    );
    this.http
      .post(`${this.apiService.apiUrl}/webform_rest/submit`, data, httpOptons)
      .subscribe(
        (res) => {
          this.submited = false;
          this.success = true;
          this.utilitiesService.openSnackbar('成功提交！');
        },
        (error) => {
          this.submited = false;
          this.utilitiesService.openSnackbar(`Error: ${error.message}`);
        }
      );
  }
}
