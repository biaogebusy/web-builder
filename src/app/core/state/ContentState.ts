import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IPage } from '@core/interface/IAppConfig';
import { LocalStorageService } from 'ngx-webstorage';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UtilitiesService } from '@core/service/utilities.service';
@Injectable({
  providedIn: 'root',
})
export class ContentState {
  public commentChange$ = new Subject();
  public commentQuote$ = new Subject();
  public pageConfig$ = new BehaviorSubject<any | object | boolean>(false);
  public drawerOpened$ = new BehaviorSubject<boolean>(false);
  public drawerLoading$ = new BehaviorSubject<boolean>(false);
  public animateDisable$ = new BehaviorSubject<boolean>(true);
  public drawerContent$ = new Subject<IPage>();
  public builderContent$ = new Subject<IPage>();
  public jsoneditorContent$ = new Subject<{
    content: IPage;
    index: number;
    uuid: number;
  }>();
  public initPage: IPage = {
    title: 'Builder Page',
    body: [],
  };

  pageKey = 'page';

  constructor(
    private storage: LocalStorageService,
    private util: UtilitiesService
  ) {
    const localPage = this.storage.retrieve(this.pageKey);
    if (localPage) {
      this.initPage = localPage;
    }
  }

  addComponent(content: any): void {
    if (content && content.type) {
      this.initPage.body.push(content);
      this.builderContent$.next(this.initPage);
      this.updatePage();
    } else {
      this.util.openSnackbar('组件添加错误', 'ok');
    }
  }

  clearComponent(): void {
    this.initPage = {
      title: 'Builder Page',
      body: [],
    };
    this.storage.clear(this.pageKey);
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
    this.storage.store(this.pageKey, Object.assign({}, this.initPage));
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
