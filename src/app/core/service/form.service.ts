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

  toFormGroup(items: any): any {
    const group: any = {};
    items.forEach((item: any) => {
      switch (item.type) {
        case 'select':
          group[item.key] = item.params?.required
            ? new FormControl(item.value || '', Validators.required)
            : new FormControl(item.value || '');
          break;
        default:
          group[item.key] = item.params?.required
            ? new FormControl(item.value || '', Validators.required)
            : new FormControl(item.value || '');
      }
    });
    return new FormGroup(group);
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
