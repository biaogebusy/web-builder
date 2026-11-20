import { ApplicationRef, EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { NavigationStart, Router, provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { vi } from 'vitest';

import { BuilderState } from '@core/state/BuilderState';
import { ManageService } from '@core/service/manage.service';
import { NodeService } from '@core/service/node.service';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { InlineImageService } from './inline-image.service';

describe('InlineImageService', () => {
  let service: InlineImageService;
  let appRef: ApplicationRef;
  let envInjector: EnvironmentInjector;
  let img: HTMLImageElement;
  let canvas: HTMLElement;
  let navigation: Subject<NavigationStart>;
  let dialogs: { close: ReturnType<typeof vi.fn>; closed: Subject<void> }[];
  let builderMock: {
    updatePageContentByPath: ReturnType<typeof vi.fn>;
    rightContent$: Subject<any>;
    selectedMedia$: Subject<any>;
    pageSelection$: Subject<void>;
    currentPage: { body: { src: string; alt?: string }[] };
  };
  let dialogMock: { open: ReturnType<typeof vi.fn>; closeAll: ReturnType<typeof vi.fn> };
  let nodeServiceMock: { pickAndUploadImage: ReturnType<typeof vi.fn> };

  const barHost = (): HTMLElement | null => document.querySelector('app-inline-image-bar');

  beforeEach(() => {
    builderMock = {
      updatePageContentByPath: vi.fn(),
      rightContent$: new Subject(),
      selectedMedia$: new Subject(),
      pageSelection$: new Subject(),
      currentPage: { body: [{ src: '/files/a.png' }, { src: '/files/b.png' }] },
    };
    dialogs = [];
    dialogMock = {
      open: vi.fn(() => {
        const closed = new Subject<void>();
        const close = vi.fn(() => closed.next());
        dialogs.push({ close, closed });
        return { close, afterClosed: () => closed };
      }),
      closeAll: vi.fn(),
    };
    nodeServiceMock = { pickAndUploadImage: vi.fn() };
    TestBed.configureTestingModule({
      imports: [MatIconTestingModule],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: NodeService, useValue: nodeServiceMock },
        { provide: ManageService, useValue: { mediaDialogClass: ['media-dialog'] } },
      ],
    });
    navigation = new Subject();
    vi.spyOn(TestBed.inject(Router), 'events', 'get').mockReturnValue(navigation);
    service = TestBed.inject(InlineImageService);
    appRef = TestBed.inject(ApplicationRef);
    envInjector = TestBed.inject(EnvironmentInjector);
    img = document.createElement('img');
    img.setAttribute('src', '/files/a.png');
    img.setAttribute('alt', 'old alt');
    canvas = document.createElement('div');
    document.body.appendChild(canvas);
    canvas.appendChild(img);
  });

  afterEach(() => {
    service.deselect();
    canvas.remove();
    barHost()?.remove();
    vi.restoreAllMocks();
  });

  it('选中:描边高亮并在 body 浮出操作条', () => {
    service.select(img, '0.src', envInjector);
    appRef.tick();

    expect(img.classList.contains('inline-img-selected')).toBe(true);
    expect(service.activeImage).toBe(img);
    expect(barHost()?.querySelector('[role="toolbar"]')).toBeTruthy();
  });

  it('重复选中同图不重建;换图切换选中态', () => {
    const other = document.createElement('img');
    canvas.appendChild(other);
    service.select(img, '0.src', envInjector);

    service.select(img, '0.src', envInjector);
    expect(service.activeImage).toBe(img);

    service.select(other, '1.src', envInjector);
    expect(img.classList.contains('inline-img-selected')).toBe(false);
    expect(other.classList.contains('inline-img-selected')).toBe(true);
    other.remove();
  });

  it('上传替换:经 pickAndUploadImage 回调写回 src 路径', () => {
    service.select(img, '0.src', envInjector);

    service.uploadImage();
    expect(nodeServiceMock.pickAndUploadImage).toHaveBeenCalled();
    nodeServiceMock.pickAndUploadImage.mock.calls[0][0]('/files/new.png');

    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('0.src', '/files/new.png');
  });

  it('媒体库:令牌匹配才认领选择结果并写回', () => {
    service.select(img, '0.src', envInjector);
    service.openMediaLibrary();
    expect(dialogMock.open).toHaveBeenCalled();
    // Dialog content must be created with the click-site environment injector, otherwise ManageMediaComponent cannot resolve the route-level BUILDER_CONFIG
    expect(dialogMock.open.mock.calls[0][1].injector).toBe(envInjector);
    const time = dialogMock.open.mock.calls[0][1].data.inputData.content.time;

    // Selections from other img-pickers (different token) are not claimed
    builderMock.selectedMedia$.next({ img: { src: '/x.png' }, time: new Date(0) });
    expect(builderMock.updatePageContentByPath).not.toHaveBeenCalled();

    builderMock.selectedMedia$.next({ img: { src: '/lib.png' }, time });
    expect(dialogs[0].close).toHaveBeenCalledOnce();
    expect(dialogMock.closeAll).not.toHaveBeenCalled();
    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('0.src', '/lib.png');
  });


  const finishUpload = (index = 0, url = '/files/uploaded.png') =>
    nodeServiceMock.pickAndUploadImage.mock.calls[index][0](url);

  const selectOtherImage = () => {
    const other = document.createElement('img');
    canvas.appendChild(other);
    service.select(other, '1.src', envInjector);
  };

  it.each(['another image', 'original image reselected', 'deselected', 'page selection',
    'navigation', 'detached image', 'replaced data', 'reused element path', 'destroyed service'])(
    'ignores pending uploads after %s', reason => {
      service.select(img, '0.src', envInjector);
      service.uploadImage();
      switch (reason) {
        case 'another image': selectOtherImage(); break;
        case 'original image reselected':
          selectOtherImage();
          service.select(img, '0.src', envInjector);
          break;
        case 'deselected': service.deselect(); break;
        case 'page selection': builderMock.pageSelection$.next(); break;
        case 'navigation': navigation.next(new NavigationStart(1, '/me')); break;
        case 'detached image': img.remove(); break;
        case 'replaced data':
          builderMock.currentPage.body[0] = { src: '/files/a.png', alt: 'New image data' };
          break;
        case 'reused element path': service.select(img, '1.src', envInjector); break;
        case 'destroyed service': TestBed.resetTestingModule(); break;
      }
      finishUpload();
      expect(builderMock.updatePageContentByPath).not.toHaveBeenCalled();
    }
  );

  it('only applies the latest upload once when responses arrive in reverse order', () => {
    service.select(img, '0.src', envInjector);
    service.uploadImage();
    service.uploadImage();
    finishUpload(1, '/files/latest.png');
    finishUpload(0, '/files/older.png');
    finishUpload(1, '/files/latest.png');
    expect(builderMock.updatePageContentByPath.mock.calls).toEqual([['0.src', '/files/latest.png']]);
  });

  it('does not open upload or media pickers without a valid image selection', () => {
    service.uploadImage();
    service.openMediaLibrary();
    service.select(img, 'missing.src', envInjector);
    service.uploadImage();
    service.openMediaLibrary();
    expect(nodeServiceMock.pickAndUploadImage).not.toHaveBeenCalled();
    expect(dialogMock.open).not.toHaveBeenCalled();
  });

  it.each(['deselected', 'page selection', 'dialog closed'])(
    'ignores media results after %s without closing unrelated dialogs', reason => {
      service.select(img, '0.src', envInjector);
      service.openMediaLibrary();
      const time = dialogMock.open.mock.calls[0][1].data.inputData.content.time;
      if (reason === 'deselected') service.deselect();
      if (reason === 'page selection') builderMock.pageSelection$.next();
      if (reason === 'dialog closed') dialogs[0].closed.next();
      selectOtherImage();
      builderMock.selectedMedia$.next({ img: { src: '/stale.png' }, time });
      expect(builderMock.updatePageContentByPath).not.toHaveBeenCalled();
      expect(dialogMock.closeAll).not.toHaveBeenCalled();
    }
  );

  it('a new media picker invalidates an upload and owns only its own result', () => {
    service.select(img, '0.src', envInjector);
    service.uploadImage();
    service.openMediaLibrary();
    const time = dialogMock.open.mock.calls[0][1].data.inputData.content.time;
    finishUpload();
    builderMock.selectedMedia$.next({ img: { src: '/library.png' }, time });
    builderMock.selectedMedia$.next({ img: { src: '/duplicate.png' }, time });
    expect(builderMock.updatePageContentByPath.mock.calls).toEqual([['0.src', '/library.png']]);
    expect(dialogs[0].close).toHaveBeenCalledOnce();
    expect(dialogMock.closeAll).not.toHaveBeenCalled();
  });

  it('closing an older media picker cannot invalidate a newer replacement', () => {
    service.select(img, '0.src', envInjector);
    service.openMediaLibrary();
    const oldTime = dialogMock.open.mock.calls[0][1].data.inputData.content.time;
    service.openMediaLibrary();
    const newTime = dialogMock.open.mock.calls[1][1].data.inputData.content.time;
    dialogs[0].closed.next();
    builderMock.selectedMedia$.next({ img: { src: '/old.png' }, time: oldTime });
    builderMock.selectedMedia$.next({ img: { src: '/new.png' }, time: newTime });
    expect(builderMock.updatePageContentByPath.mock.calls).toEqual([['0.src', '/new.png']]);
    expect(dialogs[0].close).toHaveBeenCalledOnce();
    expect(dialogs[1].close).toHaveBeenCalledOnce();
    expect(dialogMock.closeAll).not.toHaveBeenCalled();
  });

  it('an upload supersedes the current media picker', () => {
    service.select(img, '0.src', envInjector);
    service.openMediaLibrary();
    const time = dialogMock.open.mock.calls[0][1].data.inputData.content.time;
    service.uploadImage();
    builderMock.selectedMedia$.next({ img: { src: '/old.png' }, time });
    finishUpload();
    expect(builderMock.updatePageContentByPath.mock.calls).toEqual([['0.src', '/files/uploaded.png']]);
    expect(dialogs[0].close).toHaveBeenCalledOnce();
  });

  it('ALT 与清除样式写到 src 同级字段;根级 src 路径无点号也正确', () => {
    service.select(img, '0.src', envInjector);
    service.setAlt('新替代文本');
    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('0.alt', '新替代文本');

    img.style.opacity = '0.5';
    service.clearStyles();
    expect(img.getAttribute('style')).toBeNull();
    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('0.style', {});

    service.deselect();
    service.select(img, 'src', envInjector);
    service.setAlt('root');
    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('alt', 'root');
  });

  it('更多设置:回落到右侧 drawer 的完整图片表单并取消选中', () => {
    const emissions: any[] = [];
    builderMock.rightContent$.subscribe(content => emissions.push(content));
    service.select(img, '0.src', envInjector);

    service.openFullPanel();

    expect(emissions.length).toBe(1);
    expect(emissions[0].elements[0].mode).toBe('img');
    expect(emissions[0].elements[0].path).toBe('0.src');
    expect(service.activeImage).toBeNull();
  });

  it('Esc 与点击外部取消选中;点击图片自身保持', () => {
    service.select(img, '0.src', envInjector);

    img.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(service.activeImage).toBe(img);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(service.activeImage).toBeNull();

    service.select(img, '0.src', envInjector);
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(service.activeImage).toBeNull();
  });
});
