import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../../../service/form.service';
import { FormGroup } from '@angular/forms';

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
  constructor(public formService: FormService) {}

  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.content.forms);
    console.log(this.form);
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
    }, 2000);
  }
}
