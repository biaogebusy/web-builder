import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter, Router, ActivatedRoute } from '@angular/router';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import {
  createHttpResourceRefMock,
  createBuilderServiceMock,
  createBuilderStateMock,
  createNodeServiceMock,
  createUtilitiesServiceMock,
} from '@core/testing/mocks';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { PageListComponent } from './page-list.component';

describe('PageListComponent', () => {
  let component: PageListComponent;
  let fixture: ComponentFixture<PageListComponent>;
  const builderState = createBuilderStateMock();
  const builderService = createBuilderServiceMock();
  const util = createUtilitiesServiceMock();
  const response = signal<unknown>(undefined);
  const error = signal<Error | undefined>(undefined);
  const resource = { ...createHttpResourceRefMock(),
    value: vi.fn(() => response()), error: vi.fn(() => error()),
  };
  const nodeService = { ...createNodeServiceMock(), fetchResource: vi.fn(() => resource) };

  beforeEach(async () => {
    vi.clearAllMocks();
    response.set(undefined);
    error.set(undefined);
    resource.value.mockImplementation(() => response());
    resource.error.mockImplementation(() => error());
    nodeService.fetchResource.mockReturnValue(resource);
    await TestBed.configureTestingModule({
      imports: [PageListComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderState },
        { provide: BuilderService, useValue: builderService },
        { provide: NodeService, useValue: nodeService },
        { provide: UtilitiesService, useValue: util },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the pending page queued by the builder on init', () => {
    builderState.consumePageLoad.mockReturnValueOnce({ nid: '9', langcode: 'en' });

    component.ngOnInit();

    expect(builderService.loadPage).toHaveBeenCalledWith({ nid: '9', langcode: 'en' });
  });

  it('warns instead of loading when the page misses its nid', () => {
    component.loadPage({ langcode: 'en' });

    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.PAGE_LIST.CHECK_LANDING_VIEW', 'ok');
    expect(builderService.loadPage).not.toHaveBeenCalled();
  });

  it('loads the selected page into the builder', () => {
    component.loadPage({ nid: '12', langcode: 'zh-hans' });

    expect(builderService.loadPage).toHaveBeenCalledWith({ nid: '12', langcode: 'zh-hans' });
  });
  it('refreshes after save without clearing filters, pagination or navigating', () => {
    component.ngOnInit();
    component.form.patchValue({ title: 'Services', group: '2', langcode: 'en', page: 2 });
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate');
    builderState.updateSuccess$.next(true);
    expect(resource.reload).toHaveBeenCalledOnce();
    expect(component.form.getRawValue()).toEqual({
      title: 'Services', group: '2', langcode: 'en', page: 2,
    });
    expect(navigate).not.toHaveBeenCalled();
  });

  it('clears all filters only through the explicit reset action', () => {
    component.form.patchValue({ title: 'Services', group: '2', langcode: 'en', page: 2 });
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onReset();
    expect(navigate).toHaveBeenCalledWith([], {
      relativeTo: TestBed.inject(ActivatedRoute),
      queryParams: { title: '', group: '', langcode: '', page: 0 },
    });
  });

  it('changes the page while retaining the active filters', () => {
    component.form.patchValue({ title: 'Services', group: '2', langcode: 'en' });
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onPageChange({ pageIndex: 2, pageSize: 10, length: 30 });
    expect(navigate).toHaveBeenCalledWith([], {
      relativeTo: TestBed.inject(ActivatedRoute),
      queryParams: { title: 'Services', group: '2', langcode: 'en', page: 2 },
    });
  });

  it('distinguishes a failed read from a successful empty result and allows retry', () => {
    response.set({ rows: [], pager: { current_page: 0, total_pages: 0, total_items: 0 } });
    expect(component.loadError()).toBe(false);
    expect(component.lists()).toEqual([]);
    error.set(new Error('Unavailable'));
    expect(component.loadError()).toBe(true);
    expect(component.lists()).toBeUndefined();
    expect(component.pager()).toBeUndefined();
    component.onReload();
    expect(resource.reload).toHaveBeenCalledOnce();
  });

});
