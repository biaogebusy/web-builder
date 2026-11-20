import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { ApiService } from '@core/service/api.service';
import { DialogService } from '@core/service/dialog.service';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { createScreenServiceMock } from '@core/testing/mocks';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { Subject } from 'rxjs';

import { ViewListComponent } from './view-list.component';

describe('ViewListComponent', () => {
  let component: ViewListComponent;
  let fixture: ComponentFixture<ViewListComponent>;
  let responses: Subject<ReturnType<typeof result>>[];
  let dialogState$: Subject<boolean>;
  const result = (title: string, page = 0) => ({
    rows: title ? [{ title }] : [],
    pager: { current_page: page, total_pages: 3, total_items: 3, items_per_page: 1 },
  });
  const fetch = vi.fn((_api: string, _params: string, _lang?: string) => {
    const response = new Subject<ReturnType<typeof result>>();
    responses.push(response);
    return response;
  });
  const checkShow = vi.fn(() => true);
  const content = { type: 'view-list', params: { apiType: '/api/v2/items' },
    header: [{ key: 'title', label: 'Title' }] };

  beforeEach(async () => {
    responses = [];
    dialogState$ = new Subject();
    fetch.mockClear();
    checkShow.mockReturnValue(true);
    await TestBed.configureTestingModule({
      imports: [ViewListComponent],
      providers: [
        provideRouter([]), ...provideUiuxMocks(), ApiService,
        { provide: NodeService, useValue: { fetch, resolveLangCode: () => 'en' } },
        { provide: DialogService, useValue: { dialogState$ } },
        { provide: UserService, useValue: { checkShow } },
        { provide: ScreenService, useValue: {
          ...createScreenServiceMock(), isPlatformBrowser: () => true,
        } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ViewListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('content', content);
    fixture.componentRef.setInput('form', new UntypedFormGroup({
      page: new UntypedFormControl(0), keys: new UntypedFormControl(''),
    }));
    await fixture.whenStable();
    vi.useFakeTimers();
  });

  afterEach(() => {
    fixture.destroy();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('keeps language, filter reset and pagination parameters', () => {
    expect(fetch).toHaveBeenLastCalledWith('/api/v2/items', 'page=0&noCache=true', 'en');
    component.form().patchValue({ page: 2, keys: 'filtered' });
    expect(fetch).toHaveBeenLastCalledWith(
      '/api/v2/items', 'page=0&keys=filtered&noCache=true', 'en'
    );
    component.onPageChange({ pageIndex: 2, pageSize: 1, length: 3 });
    expect(fetch).toHaveBeenLastCalledWith(
      '/api/v2/items', 'page=2&keys=filtered&noCache=true', 'en'
    );
  });

  it('lets the latest page win when an earlier response arrives last', () => {
    component.onPageChange({ pageIndex: 2, pageSize: 1, length: 3 });
    responses[1].next(result('Latest', 2));
    responses[0].next(result('Stale'));
    expect(component.table.elements).toEqual(result('Latest').rows);
    expect(component.pager?.currentPage).toBe(2);
    expect(responses[0].observed).toBe(false);
  });

  it('cancels filters and pages when a dialog refresh supersedes them', () => {
    component.form().patchValue({ keys: 'filtered' });
    component.onPageChange({ pageIndex: 1, pageSize: 1, length: 3 });
    dialogState$.next(false);
    expect(responses.slice(0, -1).every(response => !response.observed)).toBe(true);
    expect(fetch).toHaveBeenLastCalledWith('/api/v2/items', 'noCache=true', 'en');
    responses.at(-1)!.next(result('Refreshed'));
    expect(component.table.elements).toEqual(result('Refreshed').rows);
  });

  it('ignores an old denial while the latest request is pending', () => {
    component.getViews({ page: 1 });
    responses[0].error({ status: 403 });
    expect(component.loading).toBe(true);
    expect(component.noAuth).toBeFalsy();
    responses[1].next(result('Current', 1));
    expect(component.noAuth).toBeFalsy();
  });

  it.each([0, 403, 503])('clears failed results and permits a retry after status %s', status => {
    responses[0].next(result('Previous'));
    component.getViews({ page: 1 });
    responses[1].error({ status });
    expect(component.loading).toBe(false);
    expect(component.table).toBeUndefined();
    expect(component.pager).toBeUndefined();
    expect(component.noAuth).toBe(status === 403);
    vi.advanceTimersByTime(0);
    component.getViews({ page: 1 });
    responses[2].next(result('Recovered', 1));
    expect(component.table.elements).toEqual(result('Recovered').rows);
    expect(component.noAuth).toBe(false);
  });

  it('ends loading for hidden empty results and shows a later nonempty result', () => {
    fixture.componentRef.setInput('content', {
      ...content, params: { ...content.params, emptyHidden: true },
    });
    component.getViews();
    responses[1].next(result(''));
    expect(component.canShow).toBe(false);
    expect(component.loading).toBe(false);
    component.getViews();
    responses[2].next(result('Visible'));
    expect(component.canShow).toBe(true);
    expect(component.loading).toBe(false);
  });

  it('cancels an active read when the next role check denies access', () => {
    checkShow.mockReturnValue(false);
    component.getViews();
    expect(responses[0].observed).toBe(false);
    responses[0].next(result('Unauthorized stale result'));
    expect(component.canShow).toBe(false);
    expect(component.loading).toBe(false);
    expect(component.table).toBeUndefined();
  });

  it('cancels active reads and stops form and dialog refreshes on destruction', () => {
    fixture.destroy();
    expect(responses[0].observed).toBe(false);
    component.form().patchValue({ keys: 'late' });
    dialogState$.next(false);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
