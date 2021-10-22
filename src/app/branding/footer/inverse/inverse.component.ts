import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../service/form.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../../service/api.service';
import { UtilitiesService } from 'src/app/service/utilities.service';

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
    public formService: FormService,
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private apiService: ApiService,
    private utilitiesService: UtilitiesService
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
    const httpOptons = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.apiService.csrfToken,
      }),
    };
    const data = this.formService.getwebFormData(
      this.content.footerNewsletter.params,
      this.form
    );
    this.http
      .post(`${this.apiService.apiUrl}/webform_rest/submit`, data, httpOptons)
      .subscribe(
        (res) => {
          this.submited = false;
          this.success = true;
          this.utilitiesService.openSnackbar('成功订阅！');
        },
        (error) => {
          this.submited = false;
          this.utilitiesService.openSnackbar(`Error: ${error.message}`);
        }
      );
  }
}
