import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss'],
})
export class DynamicFormControlComponent implements OnInit {
  @Input() control: any;
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit(): void {}
  get isValid(): boolean {
    return this.form.controls[this.control.key].valid;
  }
}
