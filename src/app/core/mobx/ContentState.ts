import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IPage } from './IAppConfig';
@Injectable({
  providedIn: 'root',
})
export class ContentState {
  public commentChange$ = new Subject();
  public commentQuote$ = new Subject();
  public pageConfig$ = new BehaviorSubject<IPage | object | boolean>(false);
  constructor() {}
}
