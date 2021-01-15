import { Inject, Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx-angular';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';


@Injectable()
export class BrandingState {

  @observable public content: any;
  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
    this.initBranding();
    }

    @action
    initBranding(): any {
      this.http.get(`/assets/app/core/branding.json`).subscribe(branding => {
        this.content = branding;
      });
    }
}
