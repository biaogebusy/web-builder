import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IControl } from '@core/interface/IForm';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() content: IControl;
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  get isValid(): boolean {
    return this.form.controls[this.content.key].valid;
  }
}
