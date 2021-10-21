import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';
import { findKey, isEmpty, values } from 'lodash';
@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent implements OnInit {
  @Input() content: any;
  @Input() searchEntry: any;
  @Output() searchChange = new EventEmitter();

  formControl: any;
  form: FormGroup;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.initForm(this.searchEntry);
  }

  initForm(options: any): void {
    if (isEmpty(options) || !('keys' in options || 'title' in options)) {
      this.formControl = {
        key: 'title',
        value: '',
        type: 'input',
      };
    } else {
      Object.keys(options).forEach((key, index) => {
        if (key === 'keys' || key === 'title') {
          this.formControl = {
            key,
            value: options[key],
            type: 'input',
          };
        }
      });
    }
    console.log(this.formControl);
    this.form = this.formService.toFormGroup([this.formControl]);
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.searchChange.emit(this.form.value);
    this.formControl.value = '';
  }
}
