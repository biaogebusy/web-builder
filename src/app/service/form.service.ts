import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  toFormGroup(items: any): any {
    const group: any = {};
    items.forEach((item: any) => {
      group[item.key] = item.params?.required
        ? new FormControl(item.value || '', Validators.required)
        : new FormControl(item.value || '');
    });
    return new FormGroup(group);
  }

  getwebFormData(params: any, form: any): any {
    const id = {
      webform_id: params.webform_id,
    };
    return Object.assign({}, id, form.value);
  }
}
