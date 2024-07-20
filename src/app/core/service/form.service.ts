import { Injectable } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/service/api.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  autoList$: Subject<any[]> = new Subject();
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) {}

  toFormGroup(items: any[]): any {
    const group: any = {};
    items.forEach((item: any) => {
      switch (item.type) {
        case 'datepicker':
          if (item.range) {
            group.start = item.params?.required
              ? new UntypedFormControl(item.start || '', Validators.required)
              : new UntypedFormControl(item.start || '');
            group.end = item.params?.required
              ? new UntypedFormControl(item.end || '', Validators.required)
              : new UntypedFormControl(item.end || '');
          }
          if (!item.range && item.key) {
            group[item.key] = item.params?.required
              ? new UntypedFormControl(item.value || '', Validators.required)
              : new UntypedFormControl(item.value || '');
          }
          break;
        case 'select':
          if (item.multiple) {
            const value = item?.value?.split('+') || '';
            group[item.key] = item.params?.required
              ? new UntypedFormControl(value, Validators.required)
              : new UntypedFormControl(value);
          } else {
            group[item.key] = item.params?.required
              ? new UntypedFormControl(item.value || '', Validators.required)
              : new UntypedFormControl(item.value || '');
          }
          break;
        default:
          if (item.key) {
            group[item.key] = item.params?.required
              ? new UntypedFormControl(item.value || '', Validators.required)
              : new UntypedFormControl(item.value || '');
          }
      }
    });
    return new UntypedFormGroup(group);
  }

  getwebFormData(params: any, value: any): any {
    const id = {
      webform_id: params.webform_id,
    };
    return Object.assign({}, id, value);
  }

  submitWebForm(data: any): Observable<any> {
    return this.http.post(
      `${this.apiService.apiUrl}/webform_rest/submit`,
      data,
      this.apiService.httpOptionsOfCommon,
    );
  }

  handleRangeDate(value: any): any {
    if (value.date) {
      if (value.date.start) {
        value.start = formatDate(value.date.start, 'yyyy-MM-dd', 'en-US');
      }
      if (value.date.end) {
        value.end = formatDate(value.date.end, 'yyyy-MM-dd', 'en-US');
      }
      delete value.date;
    }
    return value;
  }
}
