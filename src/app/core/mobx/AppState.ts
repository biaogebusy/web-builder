import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { version } from '../../../../package.json';
import { ApiService } from '@core/service/api.service';

const initPage = {
  title: '',
  body: [],
};
@Injectable({
  providedIn: 'root',
})
export class AppState {
  public switchChange$ = new Subject();
  constructor(public apiService: ApiService) {}

  get version(): string {
    return version;
  }
}
