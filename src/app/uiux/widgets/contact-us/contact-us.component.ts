import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../../../service/form.service';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../../service/api.service';
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
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.content.forms);
    console.log(this.form);
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
    console.log(this.form.value);
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
          this.snackbar.open(`Sumbit successs!`, '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.submited = false;
          this.snackbar.open(`Error: ${error.message}`, '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      );
  }
}
