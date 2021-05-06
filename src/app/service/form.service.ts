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
}
