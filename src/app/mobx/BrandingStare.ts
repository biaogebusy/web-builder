import { Inject, Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx-angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { environment } from '../../environments/environment';
@Injectable()
export class BrandingState {
  @observable public content: any;
  constructor(private http: HttpClient, private apiService: ApiService) {
    this.initBranding();
  }

  @action
  initBranding(): any {
    if (environment.production) {
      this.http
        .get(
          `${this.apiService.apiUrl}${this.apiService.apiBase}/config?content=${this.apiService.brandingConfigUrl}`
        )
        .subscribe((branding) => {
          this.content = branding;
        });
    } else {
      this.http
        .get(
          `${this.apiService.localConfigUrl}${this.apiService.brandingConfigUrl}.json`
        )
        .subscribe((branding) => {
          this.content = branding;
        });
    }
  }
}
