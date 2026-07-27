import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import type { IPage } from '@core/interface/IAppConfig';
import { LocalStorageService } from 'ngx-webstorage';
import { vi } from 'vitest';

import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from './BuilderState';

const makePage = (body: any[], extra: Partial<IPage> = {}): IPage => ({
  title: 'Test page',
  body,
  current: true,
  ...extra,
});

describe('BuilderState tree and draft behavior', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  const createState = (pages: IPage[]) => {
    const storage = {
      retrieve: vi.fn(() => pages),
      store: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        BuilderState,
        { provide: DOCUMENT, useValue: document },
        { provide: LocalStorageService, useValue: storage },
        { provide: MatDialog, useValue: { open: vi.fn(), getDialogById: vi.fn() } },
        { provide: ScreenService, useValue: { scrollToAnchor: vi.fn() } },
        { provide: UtilitiesService, useValue: { openSnackbar: vi.fn() } },
      ],
    });

    return {
      state: TestBed.inject(BuilderState),
      storage,
    };
  };

  it('resolves root and nested component paths', () => {
    const body = [
      { type: 'layout', elements: [{ type: 'text' }, { type: 'img' }] },
      { type: 'hero' },
    ];
    const { state } = createState([makePage(body)]);

    expect(state.targetIndex('2.elements.1')).toBe(1);
    expect(state.targetIndex('3')).toBe(3);
    expect(state.getArrsByPath('0.elements.1', body)).toBe(body[0].elements);
    expect(state.getArrsByPath('1', body)).toBe(body);
  });

  it('replaces nested content without mutating the previous body', () => {
    const body = [{ type: 'layout', elements: [{ type: 'text' }] }];
    const { state, storage } = createState([makePage(body)]);

    state.updatePageContentByPath('0.elements.0', { type: 'img' });

    expect(state.currentPage.body[0].elements?.[0]).toEqual({ type: 'img' });
    expect(body[0].elements?.[0]).toEqual({ type: 'text' });
    expect(storage.store).toHaveBeenCalledOnce();
  });

  it('adds and removes nested content relative to the target index', () => {
    const body = [{ type: 'layout', elements: [{ type: 'text' }] }];
    const { state } = createState([makePage(body)]);

    state.updatePageContentByPath('0.elements.0', { type: 'img' }, 'add');
    expect(state.currentPage.body[0].elements?.map(item => item.type)).toEqual(['text', 'img']);

    state.updatePageContentByPath('0.elements.1', undefined, 'remove');
    expect(state.currentPage.body[0].elements?.map(item => item.type)).toEqual(['text']);
  });

  it('clones a root component when inserting after a root index', () => {
    const body = [{ type: 'text' }];
    const widget = { type: 'card', nested: { value: 1 } };
    const { state } = createState([makePage(body)]);

    state.updatePageContentByPath('0', widget, 'add');

    const inserted = state.currentPage.body[1];
    expect(inserted).toEqual(widget);
    expect(inserted).not.toBe(widget);
  });

  it('moves a root component up and down with new page and body references', () => {
    const body = [{ type: 'a' }, { type: 'b' }, { type: 'c' }];
    const { state, storage } = createState([makePage(body)]);
    const before = state.currentPage;

    state.upDownComponent('up', '1');

    expect(state.currentPage.body.map(item => item.type)).toEqual(['b', 'a', 'c']);
    expect(state.currentPage).not.toBe(before);
    expect(state.currentPage.body).not.toBe(body);
    expect(body.map(item => item.type)).toEqual(['a', 'b', 'c']);
    expect(storage.store).toHaveBeenCalledOnce();

    state.upDownComponent('down', '1');
    expect(state.currentPage.body.map(item => item.type)).toEqual(['b', 'c', 'a']);
  });

  it('moves nested elements and ignores out-of-range moves', () => {
    const body = [{ type: 'layout', elements: [{ type: 'text' }, { type: 'img' }] }];
    const { state } = createState([makePage(body)]);

    state.upDownComponent('down', '0.elements.0');
    expect(state.currentPage.body[0].elements?.map(item => item.type)).toEqual(['img', 'text']);
    expect(body[0].elements?.map(item => item.type)).toEqual(['text', 'img']);

    const untouched = state.currentPage;
    state.upDownComponent('up', '0.elements.0');
    expect(state.currentPage).toBe(untouched);

    state.upDownComponent('down', '0.elements.1');
    expect(state.currentPage).toBe(untouched);
  });

  it('replaces an existing page by uuid and language while updating current flags', () => {
    const current = makePage([], { uuid: 'page-1', langcode: 'zh-hans' });
    const other = makePage([], { uuid: 'page-2', langcode: 'en', current: false });
    const { state, storage } = createState([current, other]);
    const closeDrawer = vi.fn();
    state.closeRightDrawer$.subscribe(closeDrawer);

    state.loadNewPage(
      makePage([], {
        uuid: 'page-1',
        langcode: 'zh-hans',
        title: 'Updated page',
      })
    );

    expect(state.version()[0]).toMatchObject({
      uuid: 'page-1',
      langcode: 'zh-hans',
      title: 'Updated page',
      current: true,
    });
    expect(state.version()[1].current).toBe(false);
    expect(closeDrawer).toHaveBeenCalledWith(true);
    expect(storage.store).toHaveBeenCalledOnce();
  });
});
