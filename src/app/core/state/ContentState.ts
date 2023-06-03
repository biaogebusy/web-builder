import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IPage } from '@core/interface/IAppConfig';
import { LocalStorageService } from 'ngx-webstorage';
@Injectable({
  providedIn: 'root',
})
export class ContentState {
  public commentChange$ = new Subject();
  public commentQuote$ = new Subject();
  public pageConfig$ = new BehaviorSubject<any | object | boolean>(false);
  public drawerOpened$ = new BehaviorSubject<boolean>(false);
  public drawerLoading$ = new BehaviorSubject<boolean>(false);
  public drawerContent$ = new Subject<IPage>();
  public builderContent$ = new Subject<IPage>();

  initPage: IPage = {
    title: 'Builder Page',
    body: [],
  };

  constructor(private storage: LocalStorageService) {}

  addComponent(content: any): void {
    this.initPage.body.push(content);
    this.builderContent$.next(this.initPage);
    this.storage.store('builder', Object.assign({}, this.initPage));
  }
}
