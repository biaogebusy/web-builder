import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() content: any;
  form: FormGroup;
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.content);
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
