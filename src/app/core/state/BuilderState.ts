import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Inject, Injectable } from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import {
  IBuilderComponent,
  IBuilderDynamicContent,
  IBuilderShowcase,
} from '@core/interface/IBuilder';
import { ICard1v1 } from '@core/interface/widgets/ICard';
import { UtilitiesService } from '@core/service/utilities.service';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'lodash-es';
import { DOCUMENT } from '@angular/common';
import { ScreenService } from '@core/service/screen.service';

@Injectable({
  providedIn: 'root',
})
export class BuilderState {
  public fixedShowcase = false;
  public fixedContent: ICard1v1 | null;
  public showcase$: Subject<IBuilderShowcase | false> = new Subject();
  public builderContent$ = new Subject<IPage>();
  public builderContentDrawer$ = new Subject<boolean>();
  public builderThemeMode = new BehaviorSubject<'light' | 'dark'>('light');
  public rightDrawerContent$ = new Subject<IBuilderDynamicContent>();
  public fixedChange$ = new Subject<boolean>();
  public animateDisable$ = new Subject<boolean>();
  public fullScreen$ = new Subject<boolean>();
  public debugeAnimate$ = new Subject<boolean>();
  public metaEditImaPath$ = new Subject<object>();
  public switchPreivew$ = new Subject<
    'xs' | 'sm' | 'md' | 'lg' | 'xs-md' | 'none'
  >();

  public loading$ = new BehaviorSubject<boolean>(true);
  public jsoneditorContent$ = new Subject<{
    content: IPage;
    index: number;
    uuid: string;
  }>();

  private page: IPage = {
    title: '着陆页',
    body: [],
  };

  public version: IPage[] = [];

  pageKey = 'page';
  versionKey = 'version';

  constructor(
    private storage: LocalStorageService,
    private util: UtilitiesService,
    private sreenService: ScreenService,
    @Inject(DOCUMENT) private doc: Document
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
        components: [content],
      },
    });
    this.fixedChange$.next(true);
  }

  updateVersion(page: IPage): void {
    this.version.unshift(page);
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
      this.version.forEach((item) => (item.current = false));
      this.version[index].current = true;

      this.storage.store(this.versionKey, Object.assign([], this.version));
      this.loading$.next(false);
    }, 600);
  }

  updatePage(index: number = 0): void {
    setTimeout(() => {
      this.storage.store(this.versionKey, Object.assign([], this.version));

      if (index) {
        this.sreenService.scrollToAnchor(`item-${index}`);
      }
      this.loading$.next(false);
    }, 600);
  }

  get currentPage(): IPage {
    const currentIndex = this.version.findIndex(
      (page) => page.current === true
    );
    return this.version[currentIndex] || this.version[0];
  }

  upDownComponent(index: number, direction: string) {
    const { body } = this.currentPage;
    if (direction === 'up') {
      [body[index - 1], body[index]] = [body[index], body[index - 1]];
    }

    if (direction === 'down' && index < body.length - 1) {
      [body[index], body[index + 1]] = [body[index + 1], body[index]];
    }

    this.saveLocalVersions();
  }

  pushComponent(content: any): void {
    const { body } = this.currentPage;
    if (content && content.type) {
      body.push(content);
      this.builderContent$.next(this.page);
      this.saveLocalVersions();
    } else {
      this.util.openSnackbar('组件添加错误', 'ok');
    }
  }

  deleteComponent(index: number): void {
    const { body } = this.currentPage;
    body.splice(index, 1);
    this.updatePage();
  }

  updateComponent(index: number, content: any): void {
    const { body } = this.currentPage;
    body[index] = content;
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
    const component = event.item.data.type
      ? event.item.data
      : event.item.data.content;
    body.splice(event.currentIndex, 0, component);
    this.updatePage(event.currentIndex);
  }

  showEditor(content: any, index: number): void {
    this.rightDrawerContent$.next({
      mode: 'over',
      hasBackdrop: false,
      style: {
        width: '500px',
        'max-width': 'calc(100vw - 50px)',
      },
      elements: [
        {
          type: 'jsoneditor',
          index,
          isPreview: true,
          data: content,
          tooltip: '直接修改JSON，更新组件的数据',
        },
      ],
    });
  }

  getRandomElements = (
    data: IBuilderComponent[],
    id: string,
    count: number
  ) => {
    let elements = data.find((item) => item.id === id)?.elements || [];
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
  };

  renderMarkers(isDebugAnimate: boolean): void {
    const markers = this.doc.querySelectorAll('div[class^="gsap-marker"]');
    if (!isDebugAnimate) {
      // hidden marker
      map(markers, (marker) => {
        marker.classList.remove('display-block');
        marker.classList.add('display-none');
      });
    } else {
      if (markers.length) {
        map(markers, (marker) => {
          marker.classList.add('display-block');
          marker.classList.remove('display-none');
        });
      }
    }
  }
}
