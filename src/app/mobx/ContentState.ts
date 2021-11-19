import { Inject, Injectable } from '@angular/core';
import { observable } from 'mobx-angular';
import { HttpClient } from '@angular/common/http';
import { AppState } from './AppState';
@Injectable()
export class BrandingState {
  @observable private content: any;
  private _READDY = true;
  constructor(private http: HttpClient, private appState: AppState) {}
}
