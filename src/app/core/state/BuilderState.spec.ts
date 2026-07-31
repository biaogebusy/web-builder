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

    state.moveComponent('up', '1');

    expect(state.currentPage.body.map(item => item.type)).toEqual(['b', 'a', 'c']);
    expect(state.currentPage).not.toBe(before);
    expect(state.currentPage.body).not.toBe(body);
    expect(body.map(item => item.type)).toEqual(['a', 'b', 'c']);
    expect(storage.store).toHaveBeenCalledOnce();

    state.moveComponent('down', '1');
    expect(state.currentPage.body.map(item => item.type)).toEqual(['b', 'c', 'a']);
  });

  it('moves nested elements and ignores out-of-range moves', () => {
    const body = [{ type: 'layout', elements: [{ type: 'text' }, { type: 'img' }] }];
    const { state } = createState([makePage(body)]);

    state.moveComponent('down', '0.elements.0');
    expect(state.currentPage.body[0].elements?.map(item => item.type)).toEqual(['img', 'text']);
    expect(body[0].elements?.map(item => item.type)).toEqual(['text', 'img']);

    const untouched = state.currentPage;
    state.moveComponent('up', '0.elements.0');
    expect(state.currentPage).toBe(untouched);

    state.moveComponent('down', '0.elements.1');
    expect(state.currentPage).toBe(untouched);
  });

  it('deletes root and nested components immutably', () => {
    const body = [
      { type: 'layout', elements: [{ type: 'text' }, { type: 'img' }] },
      { type: 'hero' },
    ];
    const { state } = createState([makePage(body)]);
    const before = state.currentPage;

    state.deleteComponent('1');
    expect(state.currentPage.body.map(item => item.type)).toEqual(['layout']);
    expect(state.currentPage).not.toBe(before);
    expect(body.length).toBe(2);

    state.deleteComponent('0.elements.1');
    expect(state.currentPage.body[0].elements?.map(item => item.type)).toEqual(['text']);
    expect(body[0].elements?.length).toBe(2);
  });

  it('ignores component deletion for invalid paths', () => {
    const body = [{ type: 'hero' }];
    const { state, storage } = createState([makePage(body)]);
    const before = state.currentPage;

    state.deleteComponent('5');
    state.deleteComponent('0.elements.0');

    expect(state.currentPage).toBe(before);
    expect(storage.store).not.toHaveBeenCalled();
  });

  it('reorders components on drop immutably and scrolls to the target index', () => {
    vi.useFakeTimers();
    try {
      const body = [{ type: 'a' }, { type: 'b' }];
      const { state } = createState([makePage(body)]);
      const screen = TestBed.inject(ScreenService);

      state.dropComponent({ previousIndex: 1, currentIndex: 0 } as any);

      expect(state.currentPage.body.map(item => item.type)).toEqual(['b', 'a']);
      expect(state.currentPage.body).not.toBe(body);
      expect(body.map(item => item.type)).toEqual(['a', 'b']);

      vi.advanceTimersByTime(600);
      expect(screen.scrollToAnchor).toHaveBeenCalledWith('item-0');
    } finally {
      vi.useRealTimers();
    }
  });

  it('inserts a dragged component clone at the drop index', () => {
    const body = [{ type: 'a' }];
    const widget = { type: 'card', nested: { value: 1 } };
    const { state } = createState([makePage(body)]);

    state.transferComponent({ currentIndex: 0, item: { data: widget } } as any);

    expect(state.currentPage.body.map(item => item.type)).toEqual(['card', 'a']);
    expect(state.currentPage.body[0]).toEqual(widget);
    expect(state.currentPage.body[0]).not.toBe(widget);
    expect(body.length).toBe(1);
  });

  it('adds a page without uuid as a new draft instead of replacing other drafts', () => {
    const draft = makePage([{ type: 'a' }], { title: 'Draft' });
    const { state } = createState([draft]);

    state.loadNewPage({ title: 'Template', body: [] });

    expect(state.version().length).toBe(2);
    expect(state.version()[0]).toMatchObject({ title: 'Template', current: true });
    expect(state.version()[1]).toMatchObject({ title: 'Draft', current: false });
  });

  it('falls back to the first page when no page is marked current', () => {
    const body = [{ type: 'text' }];
    const { state } = createState([makePage(body, { current: false })]);

    state.updatePageContentByPath('0', { type: 'img' });

    expect(state.version()[0].body[0]).toEqual({ type: 'img' });
  });

  it('initializes the default page when stored versions are empty', () => {
    const { state } = createState([]);

    expect(state.version().length).toBe(1);
    expect(state.currentPage).toMatchObject({ title: '着陆页', current: true });
  });

  it('collects child components and tolerates groups without child', () => {
    const { state } = createState([makePage([])]);

    const result = state.getAllComponents([
      { label: 'a', child: [{ type: 'btn' }] },
      { label: 'b' },
    ] as any);

    expect(result).toEqual([{ type: 'btn' }]);
  });

  it('returns unique random elements capped at the pool size', () => {
    const { state } = createState([makePage([])]);
    const data = [
      {
        label: 'hero',
        child: [{ type: 'hero-1v1' }, { type: 'hero-2v1' }, { type: 'hero-3v1' }],
      },
    ] as any;

    const picked = state.getRandomElements(data, 'hero', 5);
    expect(picked.length).toBe(3);
    expect(new Set(picked).size).toBe(3);

    const two = state.getRandomElements(data, 'hero', 2);
    expect(two.length).toBe(2);
    expect(new Set(two).size).toBe(2);

    expect(state.getRandomElements(data, 'missing', 2)).toEqual([]);
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
