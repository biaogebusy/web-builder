import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ContentState {
  @observable private content: any;
  public commentChange$ = new Subject();
  public commentQuote$ = new Subject();
  constructor() {}
}
