import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../service/form.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../../service/api.service';

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
    private apiService: ApiService
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
    console.log(this.form.value);
    const httpOptons = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.apiService.csrfToken,
      }),
    };
    this.http
      .post(
        `${this.apiService.apiUrl}/webform_rest/submit`,
        {
          webform_id: this.content.footerNewsletter.action.webform_id,
          email: this.form.value.email,
        },
        httpOptons
      )
      .subscribe(
        (res) => {
          this.submited = false;
          this.success = true;
          this.snackbar.open(`Subscibe successs!`, '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.snackbar.open(`Error: ${error.error.error.message}`, '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      );
  }
}
