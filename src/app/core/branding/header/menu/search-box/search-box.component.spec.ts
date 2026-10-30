import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from '@core/service/api.service';
import { NodeService } from '@core/service/node.service';
import { provideCoreMocks } from '@core/testing/mocks';

import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let responses: Subject<{ rows: { title: string; url: string }[] }>[];
  const fetch = vi.fn((_api: string, _params: string) => {
    const response = new Subject<{ rows: { title: string; url: string }[] }>();
    responses.push(response);
    return response;
  });

  beforeEach(async () => {
    responses = [];
    fetch.mockClear();
    await TestBed.configureTestingModule({
      imports: [SearchBoxComponent],
      providers: [
        provideRouter([]), ...provideCoreMocks(), ApiService,
        { provide: NodeService, useValue: { fetch } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBoxComponent);
    fixture.componentRef.setInput('content', { key: 'keys', link: '', placeholder: '', tooltip: '' });
    component = fixture.componentInstance;
    await fixture.whenStable();
    vi.useFakeTimers();
  });

  afterEach(() => {
    fixture.destroy();
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps the one-second debounce, normalized parameters and duplicate filtering', () => {
    component.form.setValue({ keys: 'first' });
    vi.advanceTimersByTime(999);
    expect(fetch).not.toHaveBeenCalled();
    component.form.setValue({ keys: 'latest' });
    vi.advanceTimersByTime(999);
    expect(fetch).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(fetch).toHaveBeenCalledWith('content', 'page=0&keys=latest');
    component.form.setValue({ keys: 'latest' });
    vi.advanceTimersByTime(1000);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it.each([false, true])('recovers after repeated failures with prior results: %s', prior => {
    if (prior) {
      component.form.setValue({ keys: 'earlier' });
      vi.advanceTimersByTime(1000);
      responses[0].next({ rows: [{ title: 'Earlier', url: '/earlier' }] });
      expect(component.options()).toEqual([{ label: 'Earlier', href: '/earlier' }]);
    }
    for (const keys of ['unavailable', 'still-unavailable']) {
      component.form.setValue({ keys });
      vi.advanceTimersByTime(1000);
      responses.at(-1)!.error(new Error('Synthetic search failure'));
      expect(component.options()).toEqual([]);
      vi.advanceTimersByTime(0);
    }
    component.form.setValue({ keys: 'recovered' });
    vi.advanceTimersByTime(1000);
    expect(fetch).toHaveBeenCalledTimes(prior ? 4 : 3);
    responses.at(-1)!.next({ rows: [{ title: 'Recovered', url: '/recovered' }] });
    expect(component.options()).toEqual([{ label: 'Recovered', href: '/recovered' }]);
  });

  it('cancels the previous request when the next debounced query starts', () => {
    component.form.setValue({ keys: 'slow' });
    vi.advanceTimersByTime(1000);
    component.form.setValue({ keys: 'latest' });
    vi.advanceTimersByTime(1000);
    expect(responses[0].observed).toBe(false);
    responses[1].next({ rows: [{ title: 'Latest', url: '/latest' }] });
    responses[0].next({ rows: [{ title: 'Stale', url: '/stale' }] });
    expect(component.options()).toEqual([{ label: 'Latest', href: '/latest' }]);
  });

  it('cancels pending input when destroyed before the debounce ends', () => {
    component.form.setValue({ keys: 'pending' });
    fixture.destroy();
    vi.advanceTimersByTime(1000);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('cancels an in-flight request when destroyed', () => {
    component.form.setValue({ keys: 'pending' });
    vi.advanceTimersByTime(1000);
    fixture.destroy();
    expect(responses[0].observed).toBe(false);
    responses[0].next({ rows: [{ title: 'Late', url: '/late' }] });
    expect(component.options()).toEqual([]);
  });

  it('preserves suggestion selection and search submission navigation', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.form.setValue({ keys: 'article' });
    component.onSelected({ option: { value: '/article' } });
    expect(navigate).toHaveBeenCalledWith(['/article']);
    expect(component.form.value).toEqual({ keys: null });
    component.search({ keys: 'article' });
    expect(navigate).toHaveBeenLastCalledWith(['search'], { queryParams: { keys: 'article' } });
  });
});
