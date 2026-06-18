import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable, inject, signal, DOCUMENT, DestroyRef } from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import {
  IBuilderComponent,
  IBuilderDynamicContent,
  IBuilderShowcase,
  ILayoutSetting,
} from '@core/interface/IBuilder';
import { ICard1v1 } from '@core/interface/widgets/ICard';
import { UtilitiesService } from '@core/service/utilities.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { cloneDeep, get, map, set } from 'lodash-es';

import { ScreenService } from '@core/service/screen.service';
import { ISelectedMedia } from '@core/interface/manage/IManage';
import { MatDialog } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import type { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

const loadDialogComponent = (): Promise<typeof DialogComponent> =>
  import('@uiux/widgets/dialog/dialog.component').then(m => m.DialogComponent);
import { IDialog } from '@core/interface/IDialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IComponentToolbar } from '@core/interface/combs/IBuilder';

@Injectable({
  providedIn: 'root',
})
export class BuilderState {
  private doc = inject<Document>(DOCUMENT);

  public fixedShowcase = signal(false);
  public fixedContent = signal<ICard1v1 | null>(null);
  public currentShowcase = signal<IBuilderShowcase | false>(false);
  public themeMode = signal<'light' | 'dark'>('light');
  public rightContent$ = new Subject<IBuilderDynamicContent>();
  public closeRightDrawer$ = new Subject<boolean>();
  public fixedChange$ = new Subject<boolean>();
  public animateDisable$ = new Subject<boolean>();
  public fullScreen$ = new Subject<boolean>();
  public debugeAnimate$ = new Subject<boolean>();
  public selectedMedia$ = new Subject<ISelectedMedia>();
  public switchPreivew$ = new Subject<'xs' | 'sm' | 'md' | 'xs-md' | 'none'>();
  public revealCode$ = new Subject<string>();

  public loading = signal(true);
  public updateSuccess$ = new Subject<boolean>();
  public COPYCOMPONENTKEY = 'cck';
  public COPYWIDGETKEY = 'cwk';
  private destroyRef = inject(DestroyRef);

  private defaultPage: IPage = {
    title: '着陆页',
    body: [],
  };

  public version = signal<IPage[]>([]);

  versionKey = 'version';

  private dialog = inject(MatDialog);
  private util = inject(UtilitiesService);
  private sreenService = inject(ScreenService);
  private storage = inject(LocalStorageService);

  // code-editor 当前正在编辑的组件路径,跨外部调用方读取
  public editingCodePath = signal<string | null>(null);

  constructor() {
    const localVersion = this.storage.retrieve(this.versionKey);
    if (localVersion) {
      this.version.set(localVersion);
      this.loading.set(false);
    } else {
      this.initPage([{ ...this.defaultPage, current: true, time: new Date().toLocaleString() }]);
    }
  }

  showcase(widget: any): void {
    if (this.fixedShowcase()) {
      this.fixedContent.set(widget.content);
    } else {
      this.fixedContent.set(null);
    }
    this.currentShowcase.set({
      title: widget.content.type,
      card: {
        type: 'card-1v1',
        components: [{ ...widget, animate: false }],
      },
    });
    this.fixedChange$.next(true);
  }

  updateVersion(page: IPage): void {
    this.version.update(v => {
      v.unshift(page);
      return [...v];
    });
    this.saveLocalVersions();
  }

  deleteLocalPage(index: number): void {
    this.version.update(v => {
      const next = [...v];
      next.splice(index, 1);
      if (next[0]) {
        next[0].current = true;
      }
      return next;
    });
    this.closeRightDrawer$.next(true);
    this.saveLocalVersions();
  }

  clearAllHistory(): void {
    const config: IDialog = {
      title: '清空草稿',
      titleClasses: 'text-red-500',
      noLabel: '取消',
      yesLabel: '确认清空',
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: `是否要清空本地所有历史草稿记录？`,
        },
      },
    };
    loadDialogComponent().then(DialogComponent => {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '340px',
        panelClass: ['close-outside', 'close-icon-white'],
        data: config,
      });
      dialogRef
        .afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(result => {
          if (result) {
            this.version.set([
              {
                title: '未命名',
                body: [],
                current: true,
                time: new Date().toLocaleString(),
              },
            ]);
            this.closeRightDrawer$.next(true);
            this.saveLocalVersions();
          }
        });
    });
  }

  saveLocalVersions(): void {
    this.storage.store(this.versionKey, Object.assign([], this.version()));
  }

  initPage(version: IPage[]): void {
    this.loading.set(true);
    this.version.set(version);
    this.updatePage();
  }

  showVersionPage(index: number): void {
    this.loading.set(true);
    setTimeout(() => {
      // reset current
      this.version.update(list => {
        const next = list.map(item => ({ ...item, current: false }));
        if (next[index]) {
          next[index].current = true;
        }
        return next;
      });

      this.saveLocalVersions();
      this.loading.set(false);
    }, 600);
  }

  updatePage(index = 0): void {
    setTimeout(() => {
      this.saveLocalVersions();

      if (index) {
        this.sreenService.scrollToAnchor(`item-${index}`);
      }
      this.loading.set(false);
    }, 600);
  }

  get currentPage(): IPage {
    const list = this.version();
    const currentIndex = list.findIndex(page => page.current === true);
    return list[currentIndex] || list[0];
  }

  setCurrentPage(page: IPage): void {
    this.version.update(list => {
      const next = [...list];
      const currentIndex = next.findIndex((item: IPage) => item.current === true);
      if (next[currentIndex]) {
        next[currentIndex] = page;
      }
      return next;
    });
    this.saveLocalVersions();
  }

  getArrsByPath(path: string, body: any[]): any[] {
    if (path.includes('.')) {
      const after = path.slice(0, path.lastIndexOf('.'));
      return get(body, after);
    } else {
      // 一级组件
      return body;
    }
  }

  upDownComponent(direction: string, path: string): void {
    const { body } = this.currentPage;
    const arrs = this.getArrsByPath(path, body);
    const index = this.targetIndex(path);
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
    if (content && content.type) {
      this.version.update(list => {
        const next = list.map(page =>
          page.current ? { ...page, body: [...page.body, content] } : page
        );
        return next;
      });
      this.saveLocalVersions();
    } else {
      this.util.openSnackbar('组件添加错误', 'ok');
    }
  }

  deleteComponent(path: string): void {
    const { body } = this.currentPage;
    const arrs = this.getArrsByPath(path, body);
    const index = this.targetIndex(path);
    arrs.splice(index, 1);
    this.updatePage();
  }

  targetIndex(path: string): number {
    const lastDotIndex = path.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      return Number(path.slice(lastDotIndex + 1));
    } else {
      return Number(path);
    }
  }

  bulkUpdateComponent(content: object): void {
    this.version.update(list => {
      const idx = list.findIndex(page => page.current === true);
      if (idx === -1) {
        return list;
      }
      const next = [...list];
      next[idx] = {
        ...next[idx],
        body: next[idx].body.map(item => ({ ...item, ...content })),
      };
      return next;
    });
    this.saveLocalVersions();
  }

  /**
   * example: "2.elements.1"
   * before: 2
   * targetIndex: 1
   */
  updatePageContentByPath(path: string, content: any, addType?: 'add' | 'remove'): void {
    const { body } = this.currentPage;
    const lastDotIndex = path.lastIndexOf('.');
    const before = path.slice(0, lastDotIndex);
    const targetIndex = Number(path.slice(lastDotIndex + 1));
    const targetArray = get(body, before);

    switch (addType) {
      case 'add':
        if (lastDotIndex !== -1) {
          // 对子级组件的数组操作
          if (Array.isArray(targetArray)) {
            targetArray.splice(targetIndex + 1, 0, content);
            set(body, before, targetArray);
          }
        } else {
          // body 一级组件
          body.splice(Number(path) + 1, 0, cloneDeep(content));
        }
        break;
      case 'remove':
        // 移除子级数组的组件
        if (Array.isArray(targetArray)) {
          targetArray.splice(targetIndex, 1);
          set(body, before, targetArray);
        }
        break;
      default:
        // 根据路径直接覆盖，整个对象、某个属性等
        set(body, path, content);
        break;
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
    // base 和 component 数据结构不同，需要做判断
    const { data } = event.item;
    const component = data.type ? data : data.content;
    body.splice(event.currentIndex, 0, cloneDeep(component));
    this.updatePage(event.currentIndex);
  }

  loadNewPage(page: IPage, close?: boolean): void {
    const currentPage = { ...page, current: true, time: new Date().toLocaleString() };
    this.version.update(list => {
      const next = list.map(version => ({ ...version, current: false }));
      const somePageIndex = next.findIndex(item => {
        return item.uuid === page.uuid && item.langcode === page.langcode;
      });
      if (somePageIndex > -1) {
        next[somePageIndex] = currentPage;
      } else {
        next.unshift(currentPage);
      }
      return next;
    });

    this.closeRightDrawer$.next(close ?? true);
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
      title: '组件配置',
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
    this.currentShowcase.set(false);
    this.fixedContent.set(null);
    this.fixedShowcase.set(false);
    this.fixedChange$.next(true);
  }

  getAllComponents(data: IBuilderComponent[]): any[] {
    const components: any[] = [];
    data.forEach(item => {
      components.push(...item.child);
    });
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

  getRandomElements(data: IBuilderComponent[], label: string, count: number): any[] {
    const elements = data.find(item => item.label === label)?.child || [];
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

  onNewPage(): void {
    this.fixedShowcase.set(false);
    this.currentShowcase.set(false);
    const config: IDialog = {
      title: '选择模板创建页面',
      disableActions: true,
      inputData: {
        content: {
          type: 'builder-template',
        },
      },
    };
    loadDialogComponent().then(DialogComponent => {
      this.dialog.open(DialogComponent, {
        width: '1200px',
        data: config,
      });
    });
  }

  switchVersion(page: IPage, index: number): void {
    this.showVersionPage(index);
    this.closeRightDrawer$.next(true);
    this.fixedShowcase.set(false);
    this.currentShowcase.set(false);
  }

  editorCode(component: IComponentToolbar, reveal?: string): void {
    const { path, content } = component;
    let builderList: any;
    if (path && content?.type === 'custom-template') {
      const existing = this.dialog.getDialogById('code-editor-dialog');
      if (existing) {
        // 同一组件：不重复弹出，仅在已开编辑器中定位
        if (this.editingCodePath() === path) {
          if (reveal) {
            this.revealCode$.next(reveal);
          }
          return;
        }
        // 其他组件：关闭旧编辑器后重新打开
        existing.afterClosed().subscribe(() => this.editorCode(component, reveal));
        existing.close();
        return;
      }
      this.editingCodePath.set(path);
      const config: IDialog = {
        disableActions: true,
        inputData: {
          content: {
            type: 'code-editor',
            path,
            content: get(this.currentPage.body, path),
            fullWidth: true,
            reveal,
          },
        },
      };

      loadDialogComponent().then(DialogComponent => {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '85vw',
          hasBackdrop: false,
          panelClass: ['close-outside', 'code-editor-dialog'],
          position: {
            bottom: '0px',
          },
          id: 'code-editor-dialog',
          data: config,
        });

        dialogRef
          .afterOpened()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            builderList = this.doc.querySelector('#builder-list');
            builderList.style.paddingBottom = '500px';
            this.fullScreen$.next(true);
            this.closeRightDrawer$.next(true);
          });

        dialogRef.afterClosed().subscribe(() => {
          this.editingCodePath.set(null);
          builderList.style.paddingBottom = '150px';
          this.fullScreen$.next(false);
        });
      });
    }
  }
}
