import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ContentState {
  public commentChange$ = new Subject();
  public commentQuote$ = new Subject();
  public pageConfig$ = new BehaviorSubject<any | object | boolean>(false);
  public drawerOpened$ = new BehaviorSubject<boolean>(false);
  public drawerContent$ = new BehaviorSubject<any | object | boolean>(false);
  constructor() {}
}
