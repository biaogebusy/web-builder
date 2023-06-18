import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { IBuilderComponent } from '@core/interface/IBuilder';
import { ICard1v1 } from '@core/interface/widgets/ICard';
import { UtilitiesService } from '@core/service/utilities.service';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuilderState {
  public builderContent$ = new Subject<IPage>();
  public showcase$: Subject<ICard1v1> = new Subject();
  public animateDisable$ = new Subject<boolean>();
  public toolbarDisable$ = new Subject<boolean>();
  public debugeAnimate$ = new Subject<boolean>();
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

  initPage(): void {
    this.page = {
      title: '着陆页',
      body: [],
    };
    this.updatePage();
  }

  updatePage(): void {
    this.storage.store(this.pageKey, Object.assign({}, this.page));
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

  deleteComponent(index: number): void {
    this.page.body.splice(index, 1);
    this.updatePage();
  }

  updateComponent(index: number, content: any): void {
    this.page.body[index] = content;
    this.updatePage();
  }

  dropComponent(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.page.body, event.previousIndex, event.currentIndex);
    this.updatePage();
  }

  // 边栏拖动添加组件
  transferComponet(event: CdkDragDrop<string[]>): void {
    copyArrayItem(
      event.previousContainer.data,
      this.page.body,
      event.previousIndex,
      event.currentIndex
    );
    this.updatePage();
  }

  getRandomElements = (
    data: IBuilderComponent[],
    label: string,
    count: number
  ) => {
    const elements = data.find((item) => item.label === label)?.elements;

    if (elements && elements.length > 0) {
      const randomElements = [];

      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * elements.length);
        randomElements.push(elements[randomIndex]);
      }

      return randomElements;
    } else {
      return [];
    }
  };
}
