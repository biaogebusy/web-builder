import { Inject, Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx-angular';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class BrandingState {

  @observable public content: any;
  constructor(
    private http: HttpClient
  ) {
    this.initBranding();
    }

    @action
    initBranding(): any {
      this.http.get(`http://localhost:4200/assets/app/core/branding.json`).subscribe(branding => {
        this.content = branding;
      });
    }
}
