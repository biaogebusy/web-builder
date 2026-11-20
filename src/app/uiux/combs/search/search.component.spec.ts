import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { ApiService } from '@core/service/api.service';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { ScreenService } from '@core/service/screen.service';
import { createScreenServiceMock } from '@core/testing/mocks';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { Subject } from 'rxjs';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let query: Subject<Record<string, unknown>>;
  let responses: Subject<ReturnType<typeof result>>[];
  const result = (title: string, page = 0) => ({
    rows: [{ id: title, title }],
    pager: { current_page: page, total_pages: 3, total_items: 3, items_per_page: 1 },
  });
  const fetch = vi.fn((_api: string, _params: string, _lang?: string) => {
    const response = new Subject<ReturnType<typeof result>>();
    responses.push(response);
    return response;
  });
  const resolveLangCode = vi.fn<() => string | undefined>();
  const updateQueryParams = vi.fn();

  beforeEach(async () => {
    responses = [];
    query = new Subject();
    fetch.mockClear();
    resolveLangCode.mockReset();
    updateQueryParams.mockClear();
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        provideRouter([]), ...provideUiuxMocks(), ApiService,
        { provide: NodeService, useValue: { fetch, resolveLangCode } },
        { provide: ActivatedRoute, useValue: { queryParams: query } },
        { provide: RouteService, useValue: { updateQueryParams } },
        { provide: ScreenService, useValue: {
          ...createScreenServiceMock(), isPlatformBrowser: () => true,
        } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('content', {
      type: 'search', api: '/api/v2/search', header: { input: { placeholder: 'Search' } },
      label: {}, sidebar: [{ key: 'keys', type: 'input' }], template: '',
      wrapperClasses: '', colClasses: '', showSidebar: false,
    });
    await fixture.whenStable();
    component.form = new UntypedFormGroup({ keys: new UntypedFormControl('') });
    vi.useFakeTimers();
  });

  afterEach(() => {
    fixture.destroy();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should create', () => expect(component).toBeTruthy());

  it.each(['en', undefined])('preserves the resolved request language: %s', lang => {
    resolveLangCode.mockReturnValue(lang);
    component.nodeSearch({ page: 0 });
    expect(fetch).toHaveBeenCalledWith('/api/v2/search', 'page=0', lang);
  });

  it.each([false, true])('recovers from repeated failures with prior results: %s', prior => {
    if (prior) {
      component.nodeSearch({ page: 0 });
      responses[0].next(result('Previous'));
    }
    const previousNodes = component.nodes;
    const previousPager = component.pager;
    updateQueryParams.mockClear();
    for (const page of [1, 2]) {
      component.onPageChange(page);
      responses.at(-1)!.error({ status: 503 });
      expect(component.loading).toBe(false);
      expect(component.nodes).toBe(previousNodes);
      expect(component.pager).toBe(previousPager);
      expect(updateQueryParams).not.toHaveBeenCalled();
      vi.advanceTimersByTime(0);
    }
    component.onPageChange(2);
    expect(fetch).toHaveBeenCalledTimes(prior ? 4 : 3);
    responses.at(-1)!.next(result('Recovered', 2));
    expect(component.nodes).toEqual(result('Recovered').rows);
    expect(component.pager.currentPage).toBe(2);
    expect(component.loading).toBe(false);
    expect(updateQueryParams).toHaveBeenLastCalledWith({ page: 2 });
  });

  it('continues debounced filtering after the initial route request fails', () => {
    query.next({ keys: 'initial', page: '1' });
    expect(fetch).toHaveBeenLastCalledWith('/api/v2/search', 'keys=initial&page=1', undefined);
    responses[0].error({ status: 503 });
    expect(component.loading).toBe(false);
    component.onSearch({ keys: 'latest', page: 0 });
    vi.advanceTimersByTime(999);
    expect(fetch).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(1);
    expect(fetch).toHaveBeenLastCalledWith('/api/v2/search', 'keys=latest&page=0', undefined);
    responses[1].next(result('Latest'));
    expect(updateQueryParams).toHaveBeenLastCalledWith({ keys: 'latest', page: 0 });
    component.onSearch({ keys: 'latest', page: 0 });
    vi.advanceTimersByTime(1000);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('ignores superseded results and errors while the current request is pending', () => {
    component.onPageChange(1);
    component.onPageChange(2);
    expect(responses[0].observed).toBe(false);
    responses[0].next(result('Stale', 1));
    responses[0].error({ status: 503 });
    expect(component.loading).toBe(true);
    expect(updateQueryParams).not.toHaveBeenCalled();
    responses[1].next(result('Current', 2));
    expect(component.nodes).toEqual(result('Current').rows);
    expect(component.pager.currentPage).toBe(2);
  });

  it('restores the visible page after a failed page request and allows the same page retry', async () => {
    vi.useRealTimers();
    component.onPageChange(0);
    responses[0].next(result('Previous'));
    await fixture.whenStable();
    const paginator = fixture.debugElement.query(By.directive(MatPaginator))
      .componentInstance as MatPaginator;
    paginator.nextPage();
    await fixture.whenStable();
    responses[1].error({ status: 503 });
    await fixture.whenStable();
    expect(paginator.pageIndex).toBe(0);
    expect(component.nodes).toEqual(result('Previous').rows);
    paginator.nextPage();
    expect(fetch).toHaveBeenLastCalledWith('/api/v2/search', 'page=1', undefined);
    responses[2].next(result('Recovered', 1));
    await fixture.whenStable();
    expect(paginator.pageIndex).toBe(1);
  });

  it('cancels active reads, route updates and pending filters on destruction', () => {
    component.onPageChange(1);
    component.onSearch({ keys: 'pending' });
    fixture.destroy();
    expect(responses[0].observed).toBe(false);
    query.next({ keys: 'after destruction' });
    vi.advanceTimersByTime(1000);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(updateQueryParams).not.toHaveBeenCalled();
  });
});
