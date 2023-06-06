import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IPage } from '@core/interface/IAppConfig';
import { LocalStorageService } from 'ngx-webstorage';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
  public numbers$ = new Subject<number>();

  public initPage: IPage = {
    title: 'Builder Page',
    body: [],
  };

  builderKey = 'builder';

  constructor(private storage: LocalStorageService) {
    const localPage = this.storage.retrieve(this.builderKey);
    if (localPage) {
      this.initPage = localPage;
      setTimeout(() => {
        this.numbers$.next(this.initPage.body.length);
      }, 0);
    }
  }

  addComponent(content: any): void {
    this.initPage.body.push(content);
    this.builderContent$.next(this.initPage);
    this.updatePage();
  }

  clearComponent(): void {
    this.initPage = {
      title: 'Builder Page',
      body: [],
    };
    this.numbers$.next(0);
    this.storage.clear(this.builderKey);
  }

  deleteComponent(index: number): void {
    this.initPage.body.splice(index, 1);
    this.updatePage();
  }

  updateComponent(index: number, content: any): void {
    this.initPage.body[index] = content;
    this.updatePage();
  }

  updatePage(): void {
    this.numbers$.next(this.initPage.body.length);
    this.storage.store(this.builderKey, Object.assign({}, this.initPage));
  }

  dropComponent(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.initPage.body,
      event.previousIndex,
      event.currentIndex
    );
    this.updatePage();
  }
}
