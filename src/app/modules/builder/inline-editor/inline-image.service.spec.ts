import { ApplicationRef, EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
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
  let builderMock: {
    updatePageContentByPath: ReturnType<typeof vi.fn>;
    rightContent$: Subject<any>;
    selectedMedia$: Subject<any>;
  };
  let dialogMock: { open: ReturnType<typeof vi.fn>; closeAll: ReturnType<typeof vi.fn> };
  let nodeServiceMock: { pickAndUploadImage: ReturnType<typeof vi.fn> };

  const barHost = (): HTMLElement | null => document.querySelector('app-inline-image-bar');

  beforeEach(() => {
    builderMock = {
      updatePageContentByPath: vi.fn(),
      rightContent$: new Subject(),
      selectedMedia$: new Subject(),
    };
    dialogMock = { open: vi.fn(), closeAll: vi.fn() };
    nodeServiceMock = { pickAndUploadImage: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: NodeService, useValue: nodeServiceMock },
        { provide: ManageService, useValue: { mediaDialogClass: ['media-dialog'] } },
      ],
    });
    service = TestBed.inject(InlineImageService);
    appRef = TestBed.inject(ApplicationRef);
    envInjector = TestBed.inject(EnvironmentInjector);
    img = document.createElement('img');
    img.setAttribute('src', '/files/a.png');
    img.setAttribute('alt', 'old alt');
    document.body.appendChild(img);
  });

  afterEach(() => {
    service.deselect();
    img.remove();
    barHost()?.remove();
  });

  it('选中:描边高亮并在 body 浮出操作条', () => {
    service.select(img, 'img.src', envInjector);
    appRef.tick();

    expect(img.classList.contains('inline-img-selected')).toBe(true);
    expect(service.activeImage).toBe(img);
    expect(barHost()?.querySelector('[role="toolbar"]')).toBeTruthy();
  });

  it('重复选中同图不重建;换图切换选中态', () => {
    const other = document.createElement('img');
    document.body.appendChild(other);
    service.select(img, 'img.src', envInjector);

    service.select(img, 'img.src', envInjector);
    expect(service.activeImage).toBe(img);

    service.select(other, '1.img.src', envInjector);
    expect(img.classList.contains('inline-img-selected')).toBe(false);
    expect(other.classList.contains('inline-img-selected')).toBe(true);
    other.remove();
  });

  it('上传替换:经 pickAndUploadImage 回调写回 src 路径', () => {
    service.select(img, 'img.src', envInjector);

    service.uploadImage();
    expect(nodeServiceMock.pickAndUploadImage).toHaveBeenCalled();
    nodeServiceMock.pickAndUploadImage.mock.calls[0][0]('/files/new.png');

    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('img.src', '/files/new.png');
  });

  it('媒体库:令牌匹配才认领选择结果并写回', () => {
    service.select(img, 'img.src', envInjector);
    service.openMediaLibrary();
    expect(dialogMock.open).toHaveBeenCalled();
    // Dialog content must be created with the click-site environment injector, otherwise ManageMediaComponent cannot resolve the route-level BUILDER_CONFIG
    expect(dialogMock.open.mock.calls[0][1].injector).toBe(envInjector);
    const time = dialogMock.open.mock.calls[0][1].data.inputData.content.time;

    // Selections from other img-pickers (different token) are not claimed
    builderMock.selectedMedia$.next({ img: { src: '/x.png' }, time: new Date(0) });
    expect(builderMock.updatePageContentByPath).not.toHaveBeenCalled();

    builderMock.selectedMedia$.next({ img: { src: '/lib.png' }, time });
    expect(dialogMock.closeAll).toHaveBeenCalled();
    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('img.src', '/lib.png');
  });

  it('ALT 与清除样式写到 src 同级字段;根级 src 路径无点号也正确', () => {
    service.select(img, 'img.src', envInjector);
    service.setAlt('新替代文本');
    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('img.alt', '新替代文本');

    img.style.opacity = '0.5';
    service.clearStyles();
    expect(img.getAttribute('style')).toBeNull();
    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('img.style', {});

    service.deselect();
    service.select(img, 'src', envInjector);
    service.setAlt('root');
    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('alt', 'root');
  });

  it('更多设置:回落到右侧 drawer 的完整图片表单并取消选中', () => {
    const emissions: any[] = [];
    builderMock.rightContent$.subscribe(content => emissions.push(content));
    service.select(img, 'img.src', envInjector);

    service.openFullPanel();

    expect(emissions.length).toBe(1);
    expect(emissions[0].elements[0].mode).toBe('img');
    expect(emissions[0].elements[0].path).toBe('img.src');
    expect(service.activeImage).toBeNull();
  });

  it('Esc 与点击外部取消选中;点击图片自身保持', () => {
    service.select(img, 'img.src', envInjector);

    img.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(service.activeImage).toBe(img);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(service.activeImage).toBeNull();

    service.select(img, 'img.src', envInjector);
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(service.activeImage).toBeNull();
  });
});
