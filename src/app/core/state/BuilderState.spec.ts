import { DOCUMENT, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import type { IPage } from '@core/interface/IAppConfig';
import { LocalStorageService, withNgxWebstorageConfig } from 'ngx-webstorage';
import { vi } from 'vitest';
import { of } from 'rxjs';

import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderPageState } from './BuilderPageState';
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

  const createState = (
    pages: IPage[],
    isBrowser = false,
    storageConfig: Parameters<typeof withNgxWebstorageConfig>[0] = {
      separator: ':',
      caseSensitive: true,
    }
  ) => {
    const storage = {
      retrieve: vi.fn(() => pages),
      store: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        BuilderState,
        ...withNgxWebstorageConfig(storageConfig).providers,
        { provide: DOCUMENT, useValue: document },
        { provide: LocalStorageService, useValue: storage },
        { provide: MatDialog, useValue: { open: vi.fn(), getDialogById: vi.fn() } },
        {
          provide: ScreenService,
          useValue: { scrollToAnchor: vi.fn(), isPlatformBrowser: vi.fn(() => isBrowser) },
        },
        { provide: UtilitiesService, useValue: { openSnackbar: vi.fn() } },
      ],
    });

    return {
      state: TestBed.inject(BuilderState),
      storage,
    };
  };

  describe('delayed local draft selection', () => {
    const drafts = () => ['A', 'B', 'C'].map((title, index) =>
      makePage([], { title, current: index === 0 }));

    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('keeps only the latest selection and its full loading delay', () => {
      const { state, storage } = createState(drafts());
      state.showVersionPage(1);
      vi.advanceTimersByTime(200);
      state.showVersionPage(2);
      vi.advanceTimersByTime(400);

      expect(state.currentPage.title).toBe('A');
      expect(state.loading()).toBe(true);
      expect(storage.store).not.toHaveBeenCalled();
      vi.advanceTimersByTime(200);
      expect(state.currentPage).toMatchObject({ title: 'C', current: true });
      expect(state.loading()).toBe(false);
      expect(storage.store).toHaveBeenCalledOnce();
    });

    it('keeps the selected draft when an earlier background draft is removed', () => {
      const { state } = createState(drafts());
      state.showVersionPage(2);
      state.deleteLocalPage(1);
      expect(state.loading()).toBe(true);
      vi.advanceTimersByTime(600);

      expect(state.version()).toEqual([
        makePage([], { title: 'A', current: false }),
        makePage([], { title: 'C', current: true }),
      ]);
      expect(state.loading()).toBe(false);
    });

    it('keeps the current draft when the pending selection is deleted', () => {
      const { state, storage } = createState(drafts());
      state.showVersionPage(1);
      state.deleteLocalPage(1);
      expect(state.loading()).toBe(false);
      vi.advanceTimersByTime(600);

      expect(state.currentPage).toMatchObject({ title: 'A', current: true });
      expect(state.version().map(page => page.title)).toEqual(['A', 'C']);
      expect(storage.store).toHaveBeenCalledOnce();
    });

    it('does not replace a newly loaded draft with an older selection', () => {
      const { state, storage } = createState(drafts());
      state.showVersionPage(2);
      state.loadNewPage(makePage([], { title: 'New draft' }));
      vi.advanceTimersByTime(600);

      expect(state.currentPage).toMatchObject({ title: 'New draft', current: true });
      expect(storage.store).toHaveBeenCalledOnce();
    });

    it('preserves reinitialization and its loading delay', () => {
      const { state } = createState(drafts());
      state.showVersionPage(2);
      vi.advanceTimersByTime(200);
      state.initPage([makePage([], { title: 'Initialized draft' })]);
      vi.advanceTimersByTime(400);

      expect(state.currentPage.current).toBe(true);
      expect(state.loading()).toBe(true);
      vi.advanceTimersByTime(200);
      expect(state.currentPage).toMatchObject({ title: 'Initialized draft', current: true });
      expect(state.loading()).toBe(false);
    });

    it('keeps the fallback selection after deleting the current draft', () => {
      const { state, storage } = createState(drafts());
      state.showVersionPage(2);
      state.deleteLocalPage(0);
      vi.advanceTimersByTime(600);

      expect(state.currentPage).toMatchObject({ title: 'B', current: true });
      expect(storage.store).toHaveBeenCalledOnce();
    });

    it('preserves edits to an unsaved draft while its selection is pending', () => {
      const { state } = createState(drafts());
      state.showVersionPage(2);
      state.version.update(list => list.map((page, index) => index === 2
        ? { ...page, title: 'Renamed draft', dirty: true } : page));
      state.deleteLocalPage(1);
      vi.advanceTimersByTime(600);

      expect(state.currentPage).toMatchObject({ title: 'Renamed draft', dirty: true, current: true });
    });

    it('does not let an invalid index cancel a valid pending selection', () => {
      const { state } = createState(drafts());
      state.showVersionPage(1);
      for (const index of [-1, 3, 0.5, Number.NaN]) state.showVersionPage(index);
      vi.advanceTimersByTime(600);

      expect(state.currentPage).toMatchObject({ title: 'B', current: true });
    });

    it('does not persist a pending selection after state destruction', () => {
      const { state, storage } = createState(drafts());
      state.showVersionPage(1);
      TestBed.resetTestingModule();
      vi.advanceTimersByTime(600);

      expect(storage.store).not.toHaveBeenCalled();
      expect(state.currentPage).toMatchObject({ title: 'A', current: true });
    });

    it.each([false, true])('respects the clear-history decision (confirmed: %s)', async confirmed => {
      await import('@uiux/widgets/dialog/dialog.component');
      const { state } = createState(drafts());
      const open = vi.spyOn(TestBed.inject(MatDialog), 'open').mockReturnValue({
        afterClosed: () => of(confirmed),
      } as any);
      state.showVersionPage(2);
      state.clearAllHistory();
      await vi.waitFor(() => expect(open).toHaveBeenCalledOnce());
      vi.advanceTimersByTime(600);

      expect(state.currentPage).toMatchObject({
        title: confirmed ? '未命名' : 'C', current: true,
      });
      expect(state.loading()).toBe(false);
    });

    it.each([false, true])('handles external replacement during selection (valid: %s)', valid => {
      const { state, storage } = createState(drafts(), true);
      state.showVersionPage(2);
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'ngx-webstorage:version',
        newValue: valid ? JSON.stringify([makePage([], { title: 'External draft' })]) : '{broken',
      }));
      vi.advanceTimersByTime(600);

      expect(state.currentPage).toMatchObject({
        title: valid ? 'External draft' : 'C', current: true,
      });
      expect(storage.store).toHaveBeenCalledTimes(valid ? 0 : 1);
      expect(state.loading()).toBe(false);
    });

    it('tracks the selection through removal of all languages of another page', () => {
      const { state } = createState([
        makePage([], { title: 'A' }),
        makePage([], { nid: '7', langcode: 'en', current: false }),
        makePage([], { nid: '7', langcode: 'zh-hans', current: false }),
        makePage([], { title: 'D', current: false }),
      ]);
      state.showVersionPage(3);
      state.deleteLocalPageByPage({ nid: '7' }, true);
      vi.advanceTimersByTime(600);

      expect(state.currentPage).toMatchObject({ title: 'D', current: true });
      expect(state.version()).toHaveLength(2);
    });
  });

  describe('delayed canvas updates', () => {
    const drafts = () => [
      makePage([{ type: 'text', body: 'First' }, { type: 'text', body: 'Second' }]),
      makePage([], { title: 'Other draft', current: false }),
    ];
    const drop = (state: BuilderState, currentIndex = 0) =>
      state.dropComponent({ previousIndex: 1, currentIndex } as any);

    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('persists initialization and finishes loading after the full delay', () => {
      const { state, storage } = createState([]);
      expect(state.loading()).toBe(true);
      vi.advanceTimersByTime(599);
      expect(storage.store).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(storage.store).toHaveBeenCalledWith('version', state.version());
      expect(state.loading()).toBe(false);
    });

    it('keeps only the latest drop scroll while saving every edit immediately', () => {
      const { state, storage } = createState(drafts());
      const screen = TestBed.inject(ScreenService);
      drop(state);
      expect(storage.store).toHaveBeenCalledOnce();
      vi.advanceTimersByTime(200);
      state.transferComponent({ currentIndex: 1,
        item: { data: { type: 'text', body: 'Inserted' } } } as any);
      expect(storage.store).toHaveBeenCalledTimes(2);
      expect(state.currentPage.body).toEqual([
        { type: 'text', body: 'Second' }, { type: 'text', body: 'Inserted' },
        { type: 'text', body: 'First' },
      ]);
      vi.advanceTimersByTime(400);
      expect(screen.scrollToAnchor).not.toHaveBeenCalled();
      expect(storage.store).toHaveBeenCalledTimes(2);
      vi.advanceTimersByTime(200);
      expect(screen.scrollToAnchor).toHaveBeenCalledExactlyOnceWith('item-1');
      expect(storage.store).toHaveBeenCalledTimes(3);
    });

    it('does not finish a later local selection or scroll its canvas', () => {
      const { state, storage } = createState(drafts());
      const screen = TestBed.inject(ScreenService);
      drop(state);
      vi.advanceTimersByTime(200);
      state.showVersionPage(1);
      vi.advanceTimersByTime(400);
      expect(state.loading()).toBe(true);
      expect(screen.scrollToAnchor).not.toHaveBeenCalled();
      expect(storage.store).toHaveBeenCalledOnce();
      vi.advanceTimersByTime(200);
      expect(state.currentPage.title).toBe('Other draft');
      expect(state.version()[0].body[0]).toMatchObject({ body: 'Second' });
      expect(state.loading()).toBe(false);
      expect(storage.store).toHaveBeenCalledTimes(2);
    });

    it('preserves the new initialization delay and saves the new drafts once', () => {
      const { state, storage } = createState(drafts());
      state.initPage([makePage([], { title: 'First initialization' })]);
      vi.advanceTimersByTime(200);
      state.initPage([makePage([], { title: 'Latest initialization' })]);
      vi.advanceTimersByTime(400);
      expect(state.loading()).toBe(true);
      expect(storage.store).not.toHaveBeenCalled();
      vi.advanceTimersByTime(200);
      expect(state.loading()).toBe(false);
      expect(storage.store).toHaveBeenCalledExactlyOnceWith('version', state.version());
      expect(state.currentPage.title).toBe('Latest initialization');
    });

    it.each(['load', 'delete'] as const)('cancels the old scroll after %s replaces the page', action => {
      const { state, storage } = createState(drafts());
      const screen = TestBed.inject(ScreenService);
      drop(state);
      if (action === 'load') state.loadNewPage(makePage([], { title: 'Loaded draft' }));
      else state.deleteLocalPage(0);
      expect(storage.store).toHaveBeenCalledTimes(2);
      vi.advanceTimersByTime(600);
      expect(screen.scrollToAnchor).not.toHaveBeenCalled();
      expect(storage.store).toHaveBeenCalledTimes(2);
      expect(state.currentPage.title).toBe(action === 'load' ? 'Loaded draft' : 'Other draft');
    });

    it('keeps a pending scroll when only a background draft is deleted', () => {
      const { state, storage } = createState(drafts());
      const screen = TestBed.inject(ScreenService);
      drop(state);
      state.deleteLocalPage(1);
      vi.advanceTimersByTime(600);
      expect(screen.scrollToAnchor).toHaveBeenCalledExactlyOnceWith('item-0');
      expect(storage.store).toHaveBeenCalledTimes(3);
      expect(state.currentPage.body[0]).toMatchObject({ body: 'Second' });
    });

    it.each([false, true])('handles external replacement during initialization (valid: %s)', valid => {
      const { state, storage } = createState(drafts(), true);
      state.initPage([makePage([], { title: 'Initialized draft' })]);
      const selection = vi.fn();
      state.pageSelection$.subscribe(selection);
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'ngx-webstorage:version',
        newValue: valid ? JSON.stringify([makePage([], { title: 'External draft' })]) : '{broken',
      }));
      expect(state.loading()).toBe(!valid);
      vi.advanceTimersByTime(600);
      expect(state.currentPage.title).toBe(valid ? 'External draft' : 'Initialized draft');
      expect(storage.store).toHaveBeenCalledTimes(valid ? 0 : 1);
      expect(selection).not.toHaveBeenCalled();
    });

    it('does not scroll or write back an external replacement after a drop', () => {
      const { state, storage } = createState(drafts(), true);
      const screen = TestBed.inject(ScreenService);
      drop(state);
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'ngx-webstorage:version',
        newValue: JSON.stringify([makePage([], { title: 'External draft' })]),
      }));
      vi.advanceTimersByTime(600);
      expect(screen.scrollToAnchor).not.toHaveBeenCalled();
      expect(storage.store).toHaveBeenCalledOnce();
      expect(state.currentPage.title).toBe('External draft');
    });

    it('does not run pending canvas work after state destruction', () => {
      const { state, storage } = createState(drafts());
      const screen = TestBed.inject(ScreenService);
      drop(state);
      TestBed.resetTestingModule();
      vi.advanceTimersByTime(600);
      expect(screen.scrollToAnchor).not.toHaveBeenCalled();
      expect(storage.store).toHaveBeenCalledOnce();
    });

    it.each([false, true])('respects the clear-history decision after a drop (%s)', async confirmed => {
      await import('@uiux/widgets/dialog/dialog.component');
      const { state, storage } = createState(drafts());
      const screen = TestBed.inject(ScreenService);
      const open = vi.spyOn(TestBed.inject(MatDialog), 'open').mockReturnValue({
        afterClosed: () => of(confirmed),
      } as any);
      drop(state);
      state.clearAllHistory();
      await vi.waitFor(() => expect(open).toHaveBeenCalledOnce());
      vi.advanceTimersByTime(600);
      expect(screen.scrollToAnchor).toHaveBeenCalledTimes(confirmed ? 0 : 1);
      expect(storage.store).toHaveBeenCalledTimes(2);
      expect(state.currentPage.title).toBe(confirmed ? '未命名' : 'Test page');
    });
  });

  it('shares restored and updated drafts with public language readers', () => {
    const { state } = createState([makePage([], { langcode: 'en' })]);
    const pageState = TestBed.inject(BuilderPageState);
    expect(pageState.currentPage()?.langcode).toBe('en');
    state.setCurrentPage(makePage([], { langcode: 'zh-hans' }));
    expect(pageState.currentPage()?.langcode).toBe('zh-hans');
    state.version.set([makePage([], { langcode: 'en', current: false })]);
    expect(pageState.currentPage()?.langcode).toBe('en');
  });

  it('keeps fresh getter reads independent of the cached public draft selection', () => {
    const first = makePage([], { title: 'First' });
    const second = makePage([], { title: 'Second', current: false });
    const { state } = createState([first, second]);
    const pageState = TestBed.inject(BuilderPageState);
    expect(state.currentPage).toBe(first);
    expect(pageState.currentPage()).toBe(first);

    first.current = false;
    second.current = true;
    expect(state.currentPage).toBe(second);
    expect(pageState.currentPage()).toBe(first);
    state.version.set([...state.version()]);
    expect(pageState.currentPage()).toBe(second);

    state.version = signal([first]);
    expect(state.currentPage).toBe(first);
    expect(pageState.currentPage()).toBe(second);
    state.version.set([]);
    expect(state.currentPage).toBeUndefined();
    expect(pageState.currentPage()).toBe(second);
    pageState.version.set([]);
    expect(pageState.currentPage()).toBeUndefined();
  });

  it('updates saved settings for one translation while preserving unsaved canvas content', () => {
    const body = [{ type: 'text', body: 'Unsaved content' }];
    const page = makePage(body, { uuid: 'page-1', langcode: 'en', published: true, dirty: true,
      config: { node: { nid: '12' }, headerMode: { transparent: true } } });
    const other = makePage([], { uuid: 'page-1', langcode: 'zh-hans', published: true });
    const { state, storage } = createState([page, other]);
    state.updatePageSettings({ uuid: 'page-1', langcode: 'en' }, {
      published: false, title: 'Updated title', config: { headerMode: { transparent: false } },
    });
    expect(state.version()[0]).toEqual({ ...page, published: false, title: 'Updated title',
      config: { node: { nid: '12' }, headerMode: { transparent: false } } });
    expect(state.version()[0].body).toBe(body);
    expect(state.version()[1]).toBe(other);
    expect(storage.store).toHaveBeenCalledOnce();
    state.updatePageSettings({ uuid: 'missing', langcode: 'en' }, { published: false });
    expect(storage.store).toHaveBeenCalledOnce();
  });

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

  it('keeps a translation draft separate from its source language page', () => {
    const source = makePage([], { nid: '7', langcode: 'zh-hans', dirty: true });
    const { state } = createState([source]);

    state.loadNewPage(
      makePage([], {
        nid: '7',
        langcode: 'zh-hans',
        translation: true,
        target: 'en',
        dirty: true,
      })
    );

    expect(state.version()).toHaveLength(2);
    expect(state.version()[1]).toMatchObject({ langcode: 'zh-hans', dirty: true, current: false });
    expect(state.getLocalPageByPage({ nid: '7', langcode: 'en' })).toMatchObject({
      translation: true,
      target: 'en',
      current: true,
    });
  });

  it('replaces the first matching page even when a later page matches the UUID', () => {
    const first = makePage([], { nid: '7', uuid: 'first', langcode: 'en' });
    const later = makePage([], { nid: '8', uuid: 'later', langcode: 'en', current: false });
    const { state, storage } = createState([first, later]);

    state.loadNewPage(makePage([], { nid: '7', uuid: 'later', langcode: 'en', title: 'Loaded' }));

    expect(state.version()).toHaveLength(2);
    expect(state.version()[0]).toMatchObject({ title: 'Loaded', current: true });
    expect(state.version()[1]).toEqual(later);
    expect(storage.store).toHaveBeenCalledExactlyOnceWith('version', state.version());
  });

  it('loads an anonymous draft as a new copy while lookup still supports object references', () => {
    const original = makePage([], { title: 'Anonymous draft' });
    const { state, storage } = createState([original]);
    expect(state.getLocalPageByPage(original)).toBe(original);

    state.loadNewPage(original, false);

    expect(state.version()).toHaveLength(2);
    expect(state.version()[0]).toMatchObject({ title: 'Anonymous draft', current: true });
    expect(state.version()[1]).toEqual({ ...original, current: false });
    expect(storage.store).toHaveBeenCalledOnce();
  });

  it('replaces a translation draft by its saved target identity and keeps the source', () => {
    const source = makePage([], { nid: '7', langcode: 'en', current: false });
    const draft = makePage([], { nid: '7', langcode: 'en', translation: true, target: 'zh-hans' });
    const { state } = createState([source, draft]);

    state.loadNewPage(makePage([], { nid: '7', langcode: 'zh-hans', title: 'Saved translation' }));

    expect(state.version()).toHaveLength(2);
    expect(state.version()[0]).toEqual(source);
    expect(state.version()[1]).toMatchObject({ title: 'Saved translation', current: true });
    expect(state.currentPage.translation).toBeUndefined();
    expect(state.currentPage.target).toBeUndefined();
  });

  it.each([undefined, ''])('preserves an unspecified language identity: %s', langcode => {
    const { state } = createState([makePage([], { uuid: 'page' })]);
    state.loadNewPage(makePage([], { uuid: 'page', langcode, title: 'Loaded' }));
    expect(state.version()).toHaveLength(1);
    expect(state.currentPage.title).toBe('Loaded');
  });

  it('finds a local page by nid and language and reports its dirty state', () => {
    const source = makePage([], { nid: '7', langcode: 'zh-hans', dirty: true });
    const translation = makePage([], { nid: '7', langcode: 'en', current: false });
    const { state } = createState([source, translation]);

    expect(state.getLocalPageByPage({ nid: '7', langcode: 'zh-hans' })).toBe(source);
    expect(state.isPageDirty({ nid: '7', langcode: 'zh-hans' })).toBe(true);
    expect(state.isPageDirty({ nid: '7', langcode: 'en' })).toBe(false);
  });

  it('deletes only the matching local language version by default', () => {
    const source = makePage([], { nid: '7', langcode: 'zh-hans' });
    const translation = makePage([], { nid: '7', langcode: 'en', current: false });
    const other = makePage([], { nid: '8', langcode: 'zh-hans', current: false });
    const { state } = createState([source, translation, other]);

    state.deleteLocalPageByPage({ nid: '7', langcode: 'en' });

    expect(state.version().map(page => `${page.nid}:${page.langcode}`)).toEqual([
      '7:zh-hans',
      '8:zh-hans',
    ]);
  });

  it('deletes every local language version when the source page is removed', () => {
    const source = makePage([], { nid: '7', langcode: 'zh-hans' });
    const translation = makePage([], { nid: '7', langcode: 'en', current: false });
    const other = makePage([], { nid: '8', langcode: 'zh-hans', current: false });
    const { state } = createState([source, translation, other]);

    state.deleteLocalPageByPage({ nid: '7', langcode: 'zh-hans' }, true);

    expect(state.version()).toHaveLength(1);
    expect(state.currentPage).toMatchObject({ nid: '8', current: true });
  });

  it('keeps the right drawer open when a background page is deleted', () => {
    const current = makePage([], { nid: '7', langcode: 'zh-hans' });
    const other = makePage([], { nid: '8', langcode: 'zh-hans', current: false });
    const { state } = createState([current, other]);
    const closeDrawer = vi.fn();
    state.closeRightDrawer$.subscribe(closeDrawer);

    state.deleteLocalPageByPage({ nid: '8', langcode: 'zh-hans' });
    expect(closeDrawer).not.toHaveBeenCalled();

    state.deleteLocalPageByPage({ nid: '7', langcode: 'zh-hans' });
    expect(closeDrawer).toHaveBeenCalledWith(true);
  });

  it('marks the current page dirty when its content is edited', () => {
    const { state } = createState([makePage([{ type: 'text' }], { nid: '42' })]);

    expect(state.currentPage.dirty).toBeFalsy();

    state.updatePageContentByPath('0', { type: 'img' });

    expect(state.currentPage.dirty).toBe(true);
  });

  it('marks a submitted page synced without deleting it from the history', () => {
    const current = makePage([{ type: 'text' }], { nid: '42', uuid: 'page-1', dirty: true });
    const other = makePage([], { title: 'Other draft', current: false });
    const { state, storage } = createState([current, other]);

    state.markPageSynced(state.currentPage);

    expect(state.version().length).toBe(2);
    expect(state.version()[0]).toMatchObject({ nid: '42', dirty: false, current: true });
    expect(storage.store).toHaveBeenCalledOnce();
  });

  it('attaches the server nid to a local-only draft when marked synced', () => {
    const { state } = createState([makePage([{ type: 'text' }], { dirty: true })]);
    const draft = state.currentPage;

    state.markPageSynced(draft, { nid: '7' });

    expect(state.version()[0]).toMatchObject({ nid: '7', dirty: false });
  });

  it('ignores markPageSynced for pages that are not in the history', () => {
    const { state, storage } = createState([makePage([])]);

    state.markPageSynced({ title: 'Ghost', body: [], nid: '404' });

    expect(storage.store).not.toHaveBeenCalled();
  });

  it('marks the current page dirty without persisting via markCurrentPageDirty', () => {
    const { state, storage } = createState([makePage([], { nid: '42' })]);

    state.markCurrentPageDirty();

    expect(state.currentPage.dirty).toBe(true);
    expect(storage.store).not.toHaveBeenCalled();
  });

  it.each([
    { config: { separator: ':', caseSensitive: true }, key: 'ngx-webstorage:version' },
    { config: { separator: '|', caseSensitive: true }, key: 'ngx-webstorage|version' },
    { config: {}, key: 'ngx-webstorage|version' },
    { config: { prefix: 'drafts', separator: '/' }, key: 'drafts/version' },
    { config: { prefix: '', separator: '' }, key: 'version' },
  ])('syncs external drafts using the configured key $key', ({ config, key }) => {
    const { state, storage } = createState([makePage([], { title: 'Local' })], true, config);

    window.dispatchEvent(
      new StorageEvent('storage', {
        key,
        newValue: JSON.stringify([{ title: '外部更新', body: [], current: true }]),
      })
    );

    expect(state.currentPage.title).toBe('外部更新');
    expect(TestBed.inject(BuilderPageState).currentPage()?.title).toBe('外部更新');
    expect(storage.store).not.toHaveBeenCalled();
  });

  it.each([':', '|'])('ignores invalid external drafts with separator %s', separator => {
    const { state, storage } = createState([makePage([], { title: 'Local' })], true, { separator });
    const storageKey = `ngx-webstorage${separator}version`;
    const initialVersion = state.version();

    for (const key of [
      `ngx-webstorage${separator}other`,
      `ngx-webstorage${separator === ':' ? '|' : ':'}version`,
      `foreign${separator}version`,
      `${storageKey}-backup`,
      null,
    ]) {
      window.dispatchEvent(new StorageEvent('storage', { key, newValue: '[{}]' }));
      expect(state.version()).toBe(initialVersion);
    }
    for (const newValue of ['[]', '{broken', '{}', 'null', 'false', '', null]) {
      window.dispatchEvent(new StorageEvent('storage', { key: storageKey, newValue }));
      expect(state.version()).toBe(initialVersion);
    }

    expect(storage.store).not.toHaveBeenCalled();
  });

  it('stops syncing external drafts when the state is destroyed', () => {
    const { state } = createState([makePage([], { title: 'Local' })], true);
    const initialVersion = state.version();
    TestBed.resetTestingModule();

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'ngx-webstorage:version',
        newValue: JSON.stringify([makePage([], { title: 'External' })]),
      })
    );

    expect(state.version()).toBe(initialVersion);
  });
});
