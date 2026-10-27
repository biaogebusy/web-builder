import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, type WritableSignal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { provideRouter } from '@angular/router';
import { ManageService } from '@core/service/manage.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { ScreenService } from '@core/service/screen.service';
import type { IManageAssets } from '@core/interface/manage/IManage';
import { BUILDER_CONFIG, MEDIA_ASSETS } from '@core/token/token-providers';
import { ContentState } from '@core/state/ContentState';
import {
  createManageServiceMock,
  createMatDialogMock,
  createScreenServiceMock,
  createUtilitiesServiceMock,
  provideCoreMocks,
} from '@core/testing/mocks';
import { of } from 'rxjs';

import { ManageMediaComponent } from './manage-media.component';

describe('ManageMediaComponent', () => {
  let component: ManageMediaComponent;
  let fixture: ComponentFixture<ManageMediaComponent>;
  let contentState: ContentState;
  let searchChanges: unknown[];
  const manageService = createManageServiceMock();
  const dialog = createMatDialogMock();
  const util = createUtilitiesServiceMock();

  const confirmWith = (result: boolean) =>
    dialog.open.mockReturnValueOnce({ afterClosed: () => of(result) } as never);

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [ManageMediaComponent, MatIconTestingModule],
      providers: [
        provideRouter([]),
        ...provideCoreMocks(),
        { provide: ManageService, useValue: manageService },
        { provide: MatDialog, useValue: dialog },
        { provide: UtilitiesService, useValue: util },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageMediaComponent);
    fixture.componentRef.setInput('content', { mode: '', time: '' });
    component = fixture.componentInstance;
    contentState = TestBed.inject(ContentState);
    searchChanges = [];
    contentState.mediaAssetsFormChange$.subscribe(value => searchChanges.push(value));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('warns about the missing uuid instead of opening the confirm dialog', () => {
    component.onDelete('');

    expect(util.openSnackbar).toHaveBeenCalledWith('MANAGE.MEDIA.MISSING_UUID', 'ok');
    expect(dialog.open).not.toHaveBeenCalled();
    expect(manageService.deleteMedia).not.toHaveBeenCalled();
  });

  it('deletes the media after confirmation and refreshes the asset search', () => {
    confirmWith(true);

    component.onDelete('media-1');

    expect(manageService.deleteMedia).toHaveBeenCalledWith('media-1');
    expect(searchChanges).toEqual([component.form.value]);
  });

  it('keeps the media when the confirm dialog is cancelled', () => {
    confirmWith(false);

    component.onDelete('media-1');

    expect(manageService.deleteMedia).not.toHaveBeenCalled();
    expect(searchChanges).toEqual([]);
  });

  it('keeps the batch selection when deletion is cancelled', () => {
    confirmWith(false);
    component.selectedIds.set(['media-1', 'media-2']);
    component.bulkDelete(component.selectedIds());

    expect(component.selectedIds()).toEqual(['media-1', 'media-2']);
    expect(manageService.deleteMedia).not.toHaveBeenCalled();
  });

  it('bulk-deletes sequentially, reports full progress and resets the selection', () => {
    confirmWith(true);
    component.selectedIds.set(['media-1', 'media-2']);

    component.bulkDelete(component.selectedIds());

    expect(manageService.deleteMedia).toHaveBeenNthCalledWith(1, 'media-1');
    expect(manageService.deleteMedia).toHaveBeenNthCalledWith(2, 'media-2');
    expect(component.progress).toBe(100);
    expect(util.openSnackbar).toHaveBeenCalledWith('MANAGE.MEDIA.ALL_DELETED', 'ok');
    expect(component.selectedIds()).toEqual([]);
    expect(searchChanges).toEqual([component.form.value]);
  });
});

describe('ManageMediaComponent pagination', () => {
  let component: ManageMediaComponent;
  let fixture: ComponentFixture<ManageMediaComponent>;
  let response: WritableSignal<IManageAssets | boolean>;
  let requests: object[];

  const page = (currentPage: number, ids: number[], totalPages = 3): IManageAssets => ({
    rows: ids.map(id => ({
      id: String(id), uuid: `media-${id}`, title: `Image ${id}`, src: `/media/${id}.png`,
    })),
    pager: { currentPage, totalPages, itemsPerPage: 2, totalItems: totalPages * 2 },
  });

  const receive = (value: IManageAssets | boolean) => {
    response.set(value);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    response = signal<IManageAssets | boolean>(false);
    requests = [];
    const screen = createScreenServiceMock();
    screen.isPlatformBrowser.mockReturnValue(true);
    await TestBed.configureTestingModule({
      imports: [ManageMediaComponent, MatIconTestingModule],
      providers: [
        provideRouter([]),
        ...provideCoreMocks(),
        { provide: ScreenService, useValue: screen },
        { provide: MEDIA_ASSETS, useValue: response },
        {
          provide: BUILDER_CONFIG,
          useValue: of({ manageMedia: { row: 2, sidebar: { form: [] } } }),
        },
      ],
    }).compileComponents();

    TestBed.inject(ContentState).mediaAssetsFormChange$.subscribe(value => {
      requests.push(value);
      response.set(true);
    });
    fixture = TestBed.createComponent(ManageMediaComponent);
    fixture.componentRef.setInput('content', { type: 'manage-media', time: new Date() });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('defaults to infinite scrolling and appends unique media with one request at a time', () => {
    expect(component.infiniteScroll()).toBe(true);
    expect(requests).toEqual([{ page: 0 }]);
    receive(page(0, [1, 2]));
    component.onChange(true, 'media-2');
    component.loadMore();
    component.loadMore();

    expect(requests).toEqual([{ page: 0 }, { page: 1 }]);
    expect(component.visibleAssets()?.rows.map(item => item.id)).toEqual(['1', '2']);
    receive(page(1, [2, 3]));
    expect(component.visibleAssets()?.rows.map(item => item.id)).toEqual(['1', '2', '3']);
    expect(component.selectedIds()).toEqual(['media-2']);

    component.loadMore();
    receive(page(2, [4, 5]));
    component.loadMore();
    expect(requests).toHaveLength(3);
    expect(component.hasMore()).toBe(false);
  });

  it('stops after an empty page even when the reported total still has more pages', () => {
    receive(page(0, [1, 2]));
    component.loadMore();
    receive(page(1, []));
    component.loadMore();

    expect(requests).toHaveLength(2);
    expect(component.visibleAssets()?.rows).toHaveLength(2);
    expect(component.hasMore()).toBe(false);
  });

  it('resets the page, collection, scroll position and selection for a new search', () => {
    receive(page(0, [1, 2]));
    component.loadMore();
    const viewport = fixture.nativeElement.querySelector('.media-scroll') as HTMLElement;
    viewport.scrollTop = 200;
    component.onChange(true, 'media-1');
    component.onSearch({ name: 'new', page: 1 });

    expect(requests.at(-1)).toEqual({ name: 'new', page: 0 });
    expect(component.visibleAssets()).toBeUndefined();
    expect(component.selectedIds()).toEqual([]);
    expect(viewport.scrollTop).toBe(0);
    receive(page(0, [7], 1));
    expect(component.visibleAssets()?.rows.map(item => item.id)).toEqual(['7']);
  });

  it('keeps loaded rows on failure and retries the same page and filters', () => {
    component.onSearch({ name: 'landscape' });
    receive(page(0, [1, 2]));
    component.loadMore();
    receive(false);
    const requestCount = requests.length;
    component.loadMore();

    expect(component.loadError()).toBe(true);
    expect(component.loading()).toBe(false);
    expect(component.visibleAssets()?.rows).toHaveLength(2);
    expect(requests).toHaveLength(requestCount);
    component.retryLoad();
    expect(requests.at(-1)).toEqual({ name: 'landscape', page: 1 });
    receive(page(1, [3, 4]));
    expect(component.loadError()).toBe(false);
    expect(component.visibleAssets()?.rows).toHaveLength(4);
  });

  it('allows retrying the first page after a failed initial request', () => {
    receive(false);
    expect(component.visibleAssets()).toBeUndefined();
    expect(component.loadError()).toBe(true);

    component.retryLoad();
    expect(requests).toEqual([{ page: 0 }, { page: 0 }]);
    receive(page(0, [1, 2]));
    expect(component.loadError()).toBe(false);
  });

  it('keeps management checkboxes in sync when selecting loaded media and clearing selection', () => {
    fixture.componentRef.setInput('content', { type: 'manage-media', mode: 'manage' });
    receive(page(0, [1, 2]));
    component.onChange(true, 'media-1');
    component.loadMore();
    receive(page(1, [2, 3]));
    component.selectLoaded();
    fixture.detectChanges();

    expect(component.selectedIds()).toEqual(['media-1', 'media-2', 'media-3']);
    const checkboxes = Array.from<HTMLInputElement>(
      fixture.nativeElement.querySelectorAll('input[type="checkbox"]')
    );
    expect(checkboxes.map(checkbox => checkbox.checked)).toEqual([true, true, true]);
    component.clearSelection();
    fixture.detectChanges();
    expect(checkboxes.every(checkbox => !checkbox.checked)).toBe(true);
    expect(fixture.nativeElement.querySelector('.selection-toolbar')).toBeNull();
    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('.media-scroll'));
  });

  it('uses replacement pages when numbered pagination is configured', () => {
    component.manageMediaConfig.update(config => ({ ...config, pagination: 'paged' }));
    receive(page(0, [1, 2]));
    component.loadMore();
    expect(requests).toHaveLength(1);

    component.onChange(true, 'media-1');
    component.onPageChange({ pageIndex: 2, pageSize: 2, length: 6 });
    expect(component.selectedIds()).toEqual([]);
    expect(requests.at(-1)).toEqual({ page: 2 });
    receive(page(2, [5, 6]));
    expect(component.visibleAssets()?.rows.map(item => item.id)).toEqual(['5', '6']);
  });

  it('does not submit the Enter search again when the pending debounce finishes', () => {
    vi.useFakeTimers();
    receive(page(0, [1, 2]));
    component.form.addControl('name', new FormControl(''), { emitEvent: false });
    component.form.get('name')?.setValue('new');
    component.onEnter(new Event('keydown'));
    const requestCount = requests.length;
    vi.advanceTimersByTime(1000);

    expect(requests.at(-1)).toEqual({ name: 'new', page: 0 });
    expect(requests).toHaveLength(requestCount);
  });

  it('preserves selection when Formly initializes empty search controls', () => {
    vi.useFakeTimers();
    receive(page(0, [1, 2]));
    component.onChange(true, 'media-1');
    component.form.addControl('name', new FormControl(''));
    vi.advanceTimersByTime(1000);

    expect(requests).toEqual([{ page: 0 }]);
    expect(component.selectedIds()).toEqual(['media-1']);
    expect(component.visibleAssets()?.rows).toHaveLength(2);
  });

  it('observes the media scroller and disconnects when the component is destroyed', () => {
    let callback: IntersectionObserverCallback;
    let observedRoot: Element | Document | null | undefined;
    const observe = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(handler: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        callback = handler;
        observedRoot = options?.root;
      }
      observe = observe;
      disconnect = disconnect;
    });
    receive(page(0, [1, 2]));
    expect(observedRoot).toBe(fixture.nativeElement.querySelector('.media-scroll'));
    expect(observe).toHaveBeenCalledOnce();
    callback!([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(requests.at(-1)).toEqual({ page: 1 });
    fixture.destroy();
    expect(disconnect).toHaveBeenCalled();
  });
});
