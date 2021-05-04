import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

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
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.toFormGroup(this.content.forms);
    console.log(this.form);
  }

  toFormGroup(items: any): any {
    const group: any = {};
    items.forEach((item: any) => {
      group[item.key] = item.params?.required
        ? new FormControl(item.value || '', Validators.required)
        : new FormControl(item.value || '');
    });
    return new FormGroup(group);
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
