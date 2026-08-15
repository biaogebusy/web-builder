import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable, inject, signal, DOCUMENT, DestroyRef } from '@angular/core';
import { IDynamicInputs, IPage } from '@core/interface/IAppConfig';
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
import { cloneDeep, get, map } from 'lodash-es';

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
import {
  getBuilderArrayByPath,
  getBuilderTargetIndex,
  insertBuilderTreeValueAfter,
  removeBuilderTreeValue,
  setBuilderTreeValue,
} from '@core/util/builder-tree.util';

export interface IBuilderPendingPageLoad {
  nid: string;
  langcode?: string;
  quickEdit?: boolean;
}

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
  public debugAnimate$ = new Subject<boolean>();
  public selectedMedia$ = new Subject<ISelectedMedia>();
  public switchPreview$ = new Subject<'xs' | 'sm' | 'md' | 'xs-md' | 'none'>();
  public revealCode$ = new Subject<string>();
  public pendingPageLoad = signal<IBuilderPendingPageLoad | null>(null);

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
  private screenService = inject(ScreenService);
  private storage = inject(LocalStorageService);

  // Component path currently being edited in the code editor, read across external callers
  public editingCodePath = signal<string | null>(null);

  constructor() {
    const localVersion = this.storage.retrieve(this.versionKey);
    if (localVersion?.length) {
      this.version.set(localVersion);
      this.loading.set(false);
    } else {
      this.initPage([{ ...this.defaultPage, current: true, time: new Date().toLocaleString() }]);
    }
    this.listenExternalVersionChanges();
  }

  // Cross-context sync: when another tab/iframe (e.g. /preview) saves a draft, the native
  // storage event only fires in non-writing contexts (no local loopback); use it to sync
  // the latest draft into the version signal so all signal-backed consumers
  // (version panel/toolbar/BUILDER_CURRENT_PAGE) stay live
  private listenExternalVersionChanges(): void {
    if (!this.screenService.isPlatformBrowser()) {
      return;
    }
    // Key prefix must match withNgxWebstorageConfig({ separator: ':' }) in app.config
    const storageKey = `ngx-webstorage:${this.versionKey}`;
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key !== storageKey || !event.newValue) {
        return;
      }
      try {
        const version = JSON.parse(event.newValue);
        if (Array.isArray(version) && version.length > 0) {
          this.version.set(version);
        }
      } catch {
        // Keep the in-memory state if the data is malformed
      }
    });
  }

  queuePageLoad(page: IBuilderPendingPageLoad): void {
    this.pendingPageLoad.set(page);
  }

  consumePageLoad(): IBuilderPendingPageLoad | null {
    const page = this.pendingPageLoad();
    this.pendingPageLoad.set(null);
    return page;
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

  deleteLocalPage(index: number): void {
    const versions = this.version();
    if (!Number.isInteger(index) || index < 0 || index >= versions.length) {
      return;
    }
    this.version.update(v => {
      const next = v.filter((_, itemIndex) => itemIndex !== index);
      if (next.length === 0) {
        return [
          {
            ...this.defaultPage,
            current: true,
            time: new Date().toLocaleString(),
          },
        ];
      }
      if (!next.some(page => page.current)) {
        next[0] = { ...next[0], current: true };
      }
      return next;
    });
    this.closeRightDrawer$.next(true);
    this.saveLocalVersions();
  }

  deleteLocalPageByPage(page: IPage): void {
    this.deleteLocalPage(this.findPageIndex(page));
  }

  private findPageIndex(page: IPage): number {
    const langcode = page.langcode ?? '';
    return this.version().findIndex(item => {
      if (item === page) {
        return true;
      }
      if (
        page.uuid &&
        item.uuid &&
        item.uuid === page.uuid &&
        (item.langcode ?? '') === langcode
      ) {
        return true;
      }
      if (
        page.nid &&
        item.nid &&
        item.nid === page.nid &&
        (item.langcode ?? '') === langcode
      ) {
        return true;
      }
      return false;
    });
  }

  markPageSynced(page: IPage, patch: Partial<IPage> = {}): void {
    const index = this.findPageIndex(page);
    if (index < 0) {
      return;
    }
    this.version.update(list => {
      const next = [...list];
      next[index] = { ...next[index], ...patch, dirty: false };
      return next;
    });
    this.saveLocalVersions();
  }

  // Only flip the flag without persisting; callers run saveLocalVersions themselves after finishing the change
  markCurrentPageDirty(): void {
    this.version.update(list => {
      const currentIndex = list.findIndex(page => page.current === true);
      const targetIndex = currentIndex === -1 ? 0 : currentIndex;
      if (!list[targetIndex] || list[targetIndex].dirty) {
        return list;
      }
      const next = [...list];
      next[targetIndex] = { ...next[targetIndex], dirty: true };
      return next;
    });
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

  updatePage(index?: number): void {
    setTimeout(() => {
      this.saveLocalVersions();

      if (index !== undefined) {
        this.screenService.scrollToAnchor(`item-${index}`);
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
      // Keep consistent with the currentPage getter fallback: write back to the first page when nothing is marked current
      const targetIndex = currentIndex === -1 ? 0 : currentIndex;
      if (next[targetIndex]) {
        // All callers are content edits, so writing always counts as an unsaved change
        next[targetIndex] = { ...page, dirty: true };
      }
      return next;
    });
    this.saveLocalVersions();
  }

  getArrsByPath(path: string, body: any[]): any[] {
    return getBuilderArrayByPath(path, body);
  }

  moveComponent(direction: string, path: string): void {
    const currentPage = this.currentPage;
    const { body } = currentPage;
    const arrs = this.getArrsByPath(path, body);
    const index = this.targetIndex(path);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (!Array.isArray(arrs) || swapIndex < 0 || swapIndex > arrs.length - 1) {
      return;
    }
    const nextArrs = [...arrs];
    [nextArrs[index], nextArrs[swapIndex]] = [nextArrs[swapIndex], nextArrs[index]];
    const lastDotIndex = path.lastIndexOf('.');
    const parentPath = lastDotIndex === -1 ? '' : path.slice(0, lastDotIndex);
    // Immutable update: new page/body references let the currentPage signal notify consumers to re-render
    this.setCurrentPage({
      ...currentPage,
      body: setBuilderTreeValue(body, parentPath, nextArrs),
    });
    this.closeRightDrawer$.next(true);
  }

  pushComponent(content: any): void {
    if (content && content.type) {
      this.version.update(list => {
        const next = list.map(page =>
          page.current ? { ...page, body: [...page.body, content], dirty: true } : page
        );
        return next;
      });
      this.saveLocalVersions();
    } else {
      this.util.openSnackbar('组件添加错误', 'ok');
    }
  }

  deleteComponent(path: string): void {
    const currentPage = this.currentPage;
    const { body } = currentPage;
    const arrs = this.getArrsByPath(path, body);
    const index = this.targetIndex(path);
    if (!Array.isArray(arrs) || index < 0 || index > arrs.length - 1) {
      return;
    }
    this.setCurrentPage({ ...currentPage, body: removeBuilderTreeValue(body, path) });
  }

  targetIndex(path: string): number {
    return getBuilderTargetIndex(path);
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
        dirty: true,
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
    const currentPage = this.currentPage;
    const { body } = currentPage;
    const newBody =
      addType === 'add'
        ? insertBuilderTreeValueAfter(body, path, content)
        : addType === 'remove'
          ? removeBuilderTreeValue(body, path)
          : setBuilderTreeValue(body, path, content);

    // Immutable update: new page/body references let the currentPage signal notify consumers to re-render
    this.setCurrentPage({ ...currentPage, body: newBody });
  }

  onDrop(event: CdkDragDrop<IDynamicInputs[]>): void {
    // Reorder components within the preview
    if (event.previousContainer === event.container) {
      this.dropComponent(event);
    } else {
      // Add the component at the target position
      this.transferComponent(event);
    }
    this.closeRightDrawer$.next(true);
  }

  dropComponent(event: CdkDragDrop<IDynamicInputs[]>): void {
    const currentPage = this.currentPage;
    const body = [...currentPage.body];
    moveItemInArray(body, event.previousIndex, event.currentIndex);
    this.setCurrentPage({ ...currentPage, body });
    this.updatePage(event.currentIndex);
  }

  // Component dragged in from the sidebar
  transferComponent(event: CdkDragDrop<IDynamicInputs[]>): void {
    const currentPage = this.currentPage;
    // base and component have different data structures, so detect which kind this is
    const { data } = event.item;
    const component = data.type ? data : data.content;
    const body = [...currentPage.body];
    body.splice(event.currentIndex, 0, cloneDeep(component));
    this.setCurrentPage({ ...currentPage, body });
    this.updatePage(event.currentIndex);
  }

  loadNewPage(page: IPage, close?: boolean): void {
    const currentPage = { ...page, current: true, time: new Date().toLocaleString() };
    const langcode = page.langcode ?? '';
    this.version.update(list => {
      const next = list.map(version => ({ ...version, current: false }));
      const somePageIndex = next.findIndex(item => {
        if (
          page.uuid &&
          item.uuid &&
          item.uuid === page.uuid &&
          (item.langcode ?? '') === langcode
        ) {
          return true;
        }
        if (
          page.nid &&
          item.nid &&
          item.nid === page.nid &&
          (item.langcode ?? '') === langcode
        ) {
          return true;
        }
        return false;
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
      components.push(...(item.child || []));
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
    // Flatten nested children: if an element has child, push its content elements into the result
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

    // Sampling without replacement: return at most as many distinct elements as the pool holds
    const pool = [...result];
    const randomElements = [];
    const total = Math.min(count, pool.length);

    for (let i = 0; i < total; i++) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      randomElements.push(pool.splice(randomIndex, 1)[0]);
    }

    return randomElements;
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
    let prevPaddingBottom = '';
    if (path && content?.type === 'custom-template') {
      const existing = this.dialog.getDialogById('code-editor-dialog');
      if (existing) {
        // Same component: do not reopen, only locate it in the already-open editor
        if (this.editingCodePath() === path) {
          if (reveal) {
            this.revealCode$.next(reveal);
          }
          return;
        }
        // Different component: close the old editor, then reopen
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
            if (builderList) {
              prevPaddingBottom = builderList.style.paddingBottom;
              builderList.style.paddingBottom = '500px';
            }
            this.fullScreen$.next(true);
            this.closeRightDrawer$.next(true);
          });

        dialogRef.afterClosed().subscribe(() => {
          this.editingCodePath.set(null);
          if (builderList) {
            builderList.style.paddingBottom = prevPaddingBottom;
          }
          this.fullScreen$.next(false);
        });
      });
    }
  }
}
