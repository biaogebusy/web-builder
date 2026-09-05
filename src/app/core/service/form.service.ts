import { Injectable, inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '@core/service/api.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private http = inject(HttpClient);
  private apiService = inject(ApiService);

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
    return this.apiService.getToken().pipe(
      switchMap((token: string) => {
        // Drupal rejects cookie-authenticated REST writes without the session CSRF token
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
        });
        return this.http.post(
          `${this.apiService.apiUrl}/webform_rest/submit`,
          this.serializeDates(data),
          { headers }
        );
      })
    );
  }

  /**
   * The datepicker binds a Date, which JSON serializes to a UTC ISO timestamp.
   * Drupal date elements only accept Y-m-d, and the UTC shift can move the value
   * to the previous day, so format in local time before posting.
   */
  private serializeDates(data: any): any {
    const values: any = {};
    for (const [key, value] of Object.entries(data ?? {})) {
      values[key] = value instanceof Date ? formatDate(value, 'yyyy-MM-dd', 'en-US') : value;
    }
    return values;
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
