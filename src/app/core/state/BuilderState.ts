import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Inject, Injectable, inject } from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import {
  IBuilderComponent,
  IBuilderDynamicContent,
  IBuilderShowcase,
  ILayoutSetting,
  IWidgetPicker,
  IWidgets,
} from '@core/interface/IBuilder';
import { ICard1v1 } from '@core/interface/widgets/ICard';
import { UtilitiesService } from '@core/service/utilities.service';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Subject } from 'rxjs';
import { cloneDeep, get, map, set } from 'lodash-es';
import { DOCUMENT } from '@angular/common';
import { ScreenService } from '@core/service/screen.service';
import { ISelectedMedia } from '@core/interface/manage/IManage';
import { MatDialog } from '@angular/material/dialog';
import { WIDGETS } from '@core/token/token-providers';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({
  providedIn: 'root',
})
export class BuilderState {
  public fixedShowcase = false;
  public fixedContent: ICard1v1 | null;
  public showcase$ = new Subject<IBuilderShowcase | false>();
  public themeMode = new BehaviorSubject<'light' | 'dark'>('light');
  public rightContent$ = new Subject<IBuilderDynamicContent>();
  public wigetsPicker$ = new Subject<IWidgetPicker>();
  public closeRightDrawer$ = new Subject<boolean>();
  public fixedChange$ = new Subject<boolean>();
  public animateDisable$ = new Subject<boolean>();
  public fullScreen$ = new Subject<boolean>();
  public debugeAnimate$ = new Subject<boolean>();
  public selectedMedia$ = new Subject<ISelectedMedia>();
  public switchPreivew$ = new Subject<'xs' | 'sm' | 'md' | 'xs-md' | 'none'>();

  public loading$ = new BehaviorSubject<boolean>(true);
  public updateSuccess$ = new Subject<boolean>();
  public COPYCOMPONENTKEY = 'cck';
  public COPYWIDGETKEY = 'cwk';

  private page: IPage = {
    title: '着陆页',
    body: [],
  };

  public version: IPage[] = [];

  pageKey = 'page';
  versionKey = 'version';

  dialog = inject(MatDialog);
  util = inject(UtilitiesService);
  sreenService = inject(ScreenService);
  storage = inject(LocalStorageService);
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(WIDGETS) public widgets: any[]
  ) {
    const localVersion = this.storage.retrieve(this.versionKey);
    if (localVersion) {
      this.version = localVersion;
      this.loading$.next(false);
    } else {
      this.initPage([{ ...this.page, current: true, time: new Date() }]);
    }
  }

  showcase(content: any): void {
    if (this.fixedShowcase) {
      this.fixedContent = content;
    } else {
      this.fixedContent = null;
    }
    this.showcase$.next({
      title: content.type,
      card: {
        type: 'card-1v1',
        components: [{ ...content, animate: false }],
      },
    });
    this.fixedChange$.next(true);
  }

  updateVersion(page: IPage): void {
    this.version.unshift(page);
    this.saveLocalVersions();
  }

  deleteLocalPage(index: number): void {
    this.version.splice(index, 1);
    this.version[0].current = true;
    this.closeRightDrawer$.next(true);
    this.saveLocalVersions();
  }

  clearAllVersion(): void {
    this.version = [
      {
        title: '欢迎页',
        body: [],
        current: true,
        time: new Date(),
      },
    ];
    this.closeRightDrawer$.next(true);
    this.saveLocalVersions();
  }

  saveLocalVersions(): void {
    this.storage.store(this.versionKey, Object.assign([], this.version));
  }

  initPage(version: IPage[]): void {
    this.loading$.next(true);
    this.version = version;
    this.updatePage();
  }

  showVersionPage(page: IPage, index: number): void {
    this.loading$.next(true);
    setTimeout(() => {
      // reset current
      this.version.forEach(item => (item.current = false));
      this.version[index].current = true;

      this.storage.store(this.versionKey, Object.assign([], this.version));
      this.loading$.next(false);
    }, 600);
  }

  updatePage(index = 0): void {
    setTimeout(() => {
      this.storage.store(this.versionKey, Object.assign([], this.version));

      if (index) {
        this.sreenService.scrollToAnchor(`item-${index}`);
      }
      this.loading$.next(false);
    }, 600);
  }

  get currentPage(): IPage {
    const currentIndex = this.version.findIndex(page => page.current === true);
    return this.version[currentIndex] || this.version[0];
  }

  setCurrentPage(page: IPage): void {
    const currentIndex = this.version.findIndex((item: IPage) => item.current === true);
    this.version[currentIndex] = page;
    this.storage.store(this.versionKey, Object.assign([], this.version));
  }

  getObjectByPath(path: string, body: any[]): any[] {
    if (path.includes('.')) {
      const after = path.slice(0, path.lastIndexOf('.'));
      return get(body, after);
    } else {
      // 一级组件
      return body;
    }
  }

  upDownComponent(index: number, direction: string, path: string): void {
    const { body } = this.currentPage;
    let arrs = this.getObjectByPath(path, body);
    if (direction === 'up') {
      [arrs[index - 1], arrs[index]] = [arrs[index], arrs[index - 1]];
    }

    if (direction === 'down' && index < arrs.length - 1) {
      [arrs[index], arrs[index + 1]] = [arrs[index + 1], arrs[index]];
    }
    this.closeRightDrawer$.next(true);
    this.saveLocalVersions();
  }

  pushComponent(content: any): void {
    const { body } = this.currentPage;
    if (content && content.type) {
      body.push(content);
      this.saveLocalVersions();
    } else {
      this.util.openSnackbar('组件添加错误', 'ok');
    }
  }

  deleteComponent(index: number, path: string): void {
    const { body } = this.currentPage;
    const arrs = this.getObjectByPath(path, body);
    arrs.splice(index, 1);
    this.updatePage();
  }

  updateComponent(index: number, content: any): void {
    const { body } = this.currentPage;
    body[index] = content;
    this.updatePage();
  }

  bulkUpdateComponent(content: object): void {
    this.currentPage.body = this.currentPage.body.map(item => {
      return {
        ...item,
        ...content,
      };
    });
    this.saveLocalVersions();
  }

  updatePageContentByPath(path: string, content: any, addType?: 'add'): void {
    const { body } = this.currentPage;
    if (!addType) {
      set(body, path, content);
    }

    if (addType === 'add') {
      const lastDotIndex = path.lastIndexOf('.');
      if (lastDotIndex !== -1) {
        // loop element 等，新增组件到数组
        const before = path.slice(0, lastDotIndex);
        const index = path.slice(lastDotIndex + 1);
        const targetArray = get(body, before);
        if (Array.isArray(targetArray)) {
          targetArray.splice(Number(index) + 1, 0, content);
          set(body, before, targetArray);
        }
      } else {
        // body 一级组件
        body.splice(Number(path) + 1, 0, cloneDeep(content));
      }
    }

    this.updatePage();
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    // 预览上下排序组件
    if (event.previousContainer === event.container) {
      this.dropComponent(event);
    } else {
      // 添加组件到指定位置
      this.transferComponet(event);
    }
    this.closeRightDrawer$.next(true);
  }

  dropComponent(event: CdkDragDrop<string[]>): void {
    const { body } = this.currentPage;
    moveItemInArray(body, event.previousIndex, event.currentIndex);
    this.updatePage(event.currentIndex);
  }

  // 边栏拖动添加组件
  transferComponet(event: CdkDragDrop<string[]>): void {
    const { body } = this.currentPage;
    // base 和 component的数据结构不同，需要做判断
    const { data } = event.item;
    const component = data.type ? data : data.content;
    body.splice(event.currentIndex, 0, cloneDeep(component));
    this.updatePage(event.currentIndex);
  }

  loadNewPage(page: IPage): void {
    const currentPage = { ...page, current: true, time: new Date() };
    let somePageIndex = -1;
    this.version.forEach(version => (version.current = false));
    somePageIndex = this.version.findIndex(item => {
      return item.uuid === page.uuid && item.langcode === page.langcode;
    });
    if (somePageIndex > -1) {
      this.version[somePageIndex] = currentPage;
    } else {
      this.version.unshift(currentPage);
    }

    this.closeRightDrawer$.next(true);
    this.saveLocalVersions();
  }

  showComponentSetting(widget: any, fields: FormlyFieldConfig[], path: string): void {
    const data: ILayoutSetting = {
      type: 'layout-setting',
      path,
      fields,
      content: widget,
      fullWidth: true,
    };
    this.rightContent$.next({
      mode: 'over',
      hasBackdrop: false,
      style: {
        'width': '318px',
        'max-width': 'calc(100vw - 50px)',
      },
      elements: [data],
    });
  }

  cancelFixedShowcase(): void {
    this.showcase$.next(false);
    this.fixedContent = null;
    this.fixedShowcase = false;
    this.fixedChange$.next(true);
  }

  getAllComponents(data: IBuilderComponent[]): any[] {
    const components: any[] = [];
    data.forEach(item => {
      components.push(...item.elements);
    });
    components.push(...this.widgets);
    const result = components.reduce((acc: any[], element: any) => {
      if (typeof element === 'object' && element.child) {
        map(element.child, (item: any) => {
          acc.push(item.content);
        });
      } else {
        acc.push(element);
      }
      return acc;
    }, []);
    return result;
  }

  getRandomElements(data: IBuilderComponent[], id: string, count: number): any[] {
    const elements = data.find(item => item.id === id)?.elements || [];
    // 如果元素中包含 content.child，则将其元素也添加到结果中
    const result = elements.reduce((acc: any[], element: any) => {
      if (typeof element === 'object' && element.child) {
        map(element.child, (item: any) => {
          acc.push(item.content);
        });
      } else {
        acc.push(element);
      }
      return acc;
    }, []);

    if (result && result.length > 0) {
      const randomElements = [];

      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * result.length);
        randomElements.push(result[randomIndex]);
      }

      return randomElements;
    } else {
      return [];
    }
  }

  renderMarkers(isDebugAnimate: boolean): void {
    const markers = this.doc.querySelectorAll('div[class^="gsap-marker"]');
    if (!isDebugAnimate) {
      // hidden marker
      map(markers, marker => {
        marker.classList.remove('block');
        marker.classList.add('hidden');
      });
    } else {
      if (markers.length) {
        map(markers, marker => {
          marker.classList.add('block');
          marker.classList.remove('hidden');
        });
      }
    }
  }
}
