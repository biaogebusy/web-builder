import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/service/api.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  autoList$: Subject<any[]> = new Subject();
  constructor(private http: HttpClient, private apiService: ApiService) {}

  toFormGroup(items: any[]): any {
    const group: any = {};
    items.forEach((item: any) => {
      switch (item.type) {
        case 'datepicker':
          if (item.range) {
            group.start = item.params?.required
              ? new FormControl(item.start || '', Validators.required)
              : new FormControl(item.start || '');
            group.end = item.params?.required
              ? new FormControl(item.end || '', Validators.required)
              : new FormControl(item.end || '');
          }
          if (!item.range && item.key) {
            group[item.key] = item.params?.required
              ? new FormControl(item.value || '', Validators.required)
              : new FormControl(item.value || '');
          }
          break;
        case 'select':
          if (item.multiple) {
            const value = item?.value?.split('+') || '';
            group[item.key] = item.params?.required
              ? new FormControl(value, Validators.required)
              : new FormControl(value);
          } else {
            group[item.key] = item.params?.required
              ? new FormControl(item.value || '', Validators.required)
              : new FormControl(item.value || '');
          }
          break;
        default:
          if (item.key) {
            group[item.key] = item.params?.required
              ? new FormControl(item.value || '', Validators.required)
              : new FormControl(item.value || '');
          }
      }
    });
    return new FormGroup(group);
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
      this.apiService.httpOptionsOfCommon
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
    if (value.page) {
      value.page = value.page - 1;
    }
    return value;
  }
}
