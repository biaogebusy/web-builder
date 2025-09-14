import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IPage } from '@core/interface/IAppConfig';
@Injectable({
  providedIn: 'root',
})
export class ContentState {
  public commentChange$ = new BehaviorSubject<boolean>(true);
  public commentQuote$ = new Subject();
  public pageConfig$ = new BehaviorSubject<any | object | boolean>(false);
  public drawerOpened$ = new BehaviorSubject<boolean>(false);
  public drawerLoading$ = new BehaviorSubject<boolean>(false);
  public drawerContent$ = new Subject<IPage>();
  public mediaAssetsFormChange$ = new Subject<object>();
}
