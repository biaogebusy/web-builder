import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IPage } from '@core/interface/IAppConfig';
import { LocalStorageService } from 'ngx-webstorage';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
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
  public page: IPage = {
    title: '着陆页',
    body: [],
  };

  pageKey = 'page';

  constructor(
    private storage: LocalStorageService,
    private util: UtilitiesService
  ) {
    const localPage = this.storage.retrieve(this.pageKey);
    if (localPage) {
      this.page = localPage;
    } else {
      this.initPage();
    }
  }

  pushComponent(content: any): void {
    if (content && content.type) {
      this.page.body.push(content);
      this.builderContent$.next(this.page);
      this.updatePage();
    } else {
      this.util.openSnackbar('组件添加错误', 'ok');
    }
  }

  initPage(): void {
    this.page = {
      title: '着陆页',
      body: [],
    };
    this.updatePage();
  }

  deleteComponent(index: number): void {
    this.page.body.splice(index, 1);
    this.updatePage();
  }

  updateComponent(index: number, content: any): void {
    this.page.body[index] = content;
    this.updatePage();
  }

  updatePage(): void {
    this.storage.store(this.pageKey, Object.assign({}, this.page));
  }

  dropComponent(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.page.body, event.previousIndex, event.currentIndex);
    this.updatePage();
  }

  // 边栏拖动添加组件
  transferComponet(event: CdkDragDrop<string[]>): void {
    transferArrayItem(
      event.previousContainer.data,
      this.page.body,
      event.previousIndex,
      event.currentIndex
    );
    this.updatePage();
  }
}
