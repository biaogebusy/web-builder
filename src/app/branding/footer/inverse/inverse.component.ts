import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../service/form.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(public formService: FormService, private snackbar: MatSnackBar) {}

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
    this.success = true;
    setTimeout(() => {
      this.submited = false;
      this.snackbar.open('Welcome Subject!', '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }, 2000);
  }
}
