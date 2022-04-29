import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
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
          group[item.key] = item.params?.required
            ? new FormControl(item.value || '', Validators.required)
            : new FormControl(item.value || '');
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

  handleDatePicker(group: any): any {
    return {};
  }

  getwebFormData(params: any, form: any): any {
    const id = {
      webform_id: params.webform_id,
    };
    return Object.assign({}, id, form.value);
  }

  submitWebForm(data: any): Observable<any> {
    return this.http.post(
      `${this.apiService.apiUrl}/webform_rest/submit`,
      data,
      this.apiService.httpOptionsOfCommon
    );
  }
}
