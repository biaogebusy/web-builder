import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ICoreConfig, INotifyConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { MediaUploadService } from '@core/service/media-upload.service';
import { NotifyService } from '@core/service/notify.service';
import { API_URL, CORE_CONFIG, NOTIFY_CONTENT, USER } from '@core/token/token-providers';
import { NotifyComponent } from '@uiux/widgets/notify/notify.component';
import { config as rxjsConfig, throwError } from 'rxjs';
import { notifyFactory } from './factory';

describe('Notification source integration', () => {
  const apiUrl = 'https://cms.example.test';
  const source = (name: string, reqRoles?: string[]): INotifyConfig => ({
    get: `/api/v2/${name}`, action: `/api/v1/flagging/${name}`,
    icon: `${name}-icon`, color: `${name}-color`, reqRoles,
  });
  const row = (id: string) => ({
    title: id, url: `/messages/${id}`, uuid: id, message: `Message ${id}`, date: '2026-11-06',
  });
  let http: HttpTestingController;
  let previousUnhandledError: typeof rxjsConfig.onUnhandledError;
  let unhandledError: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    previousUnhandledError = rxjsConfig.onUnhandledError;
    unhandledError = vi.fn();
    rxjsConfig.onUnhandledError = unhandledError;
  });

  function setup(api: INotifyConfig[], interval = 0) {
    const config = { notify: { api, params: { interval } } } as ICoreConfig;
    TestBed.configureTestingModule({ providers: [
      provideHttpClient(), provideHttpClientTesting(),
      { provide: API_URL, useValue: apiUrl },
      { provide: CORE_CONFIG, useValue: config },
      { provide: USER, useValue: signal({ current_user: { roles: ['editor'] } } as IUser) },
      { provide: MediaUploadService, useValue: {} },
      { provide: NOTIFY_CONTENT, useFactory: notifyFactory, deps: [CORE_CONFIG] },
    ] });
    http = TestBed.inject(HttpTestingController);
    return TestBed.runInInjectionContext(() => new NotifyComponent());
  }

  function expectRead(name: string) {
    const request = http.expectOne(`${apiUrl}/api/v2/${name}/?noCache=1`);
    expect(request.request.method).toBe('GET');
    return request;
  }

  afterEach(() => {
    try {
      http?.verify();
      expect(unhandledError).not.toHaveBeenCalled();
    } finally {
      TestBed.resetTestingModule();
      rxjsConfig.onUnhandledError = previousUnhandledError;
      vi.restoreAllMocks();
      vi.useRealTimers();
    }
  });

  it('keeps every source and row in configuration order despite reverse completion', () => {
    const component = setup([source('first'), source('second')]);
    const first = expectRead('first');
    expectRead('second').flush({ rows: [row('b')] });
    expect(component.notify()).toBe(false);
    first.flush({ rows: [row('a1'), row('a2')] });
    expect(component.lists()?.map(item => item.uuid)).toEqual(['a1', 'a2', 'b']);
    expect(component.lists()?.[0]).toEqual({
      link: { href: '/messages/a1', label: 'a1' },
      icon: { svg: 'first-icon', inline: true, color: 'first-color' },
      uuid: 'a1', message: 'Message a1', date: '2026-11-06', action: '/api/v1/flagging/first',
    });
  });

  it('keeps earlier messages when the last source is empty', () => {
    const component = setup([source('first'), source('empty')]);
    expectRead('first').flush({ rows: [row('a')] });
    expectRead('empty').flush({ rows: [] });
    expect(component.lists()?.map(item => item.uuid)).toEqual(['a']);
  });

  it.each([0, 1])('retains source settings and the read action after filtering index %s', index => {
    const apis = [source('empty'), source('allowed', ['editor'])];
    apis.splice(index, 0, source('admin', ['administrator']));
    const component = setup(apis);
    http.expectNone(request => request.url.includes('/admin'));
    expectRead('empty').flush({ rows: [] });
    expectRead('allowed').flush({ rows: [row('allowed-id')] });
    const item = component.lists()![0];
    expect(item.icon).toEqual({ svg: 'allowed-icon', color: 'allowed-color', inline: true });
    component.onRead(item);
    const write = http.expectOne(`${apiUrl}/api/v1/flagging/allowed/allowed-id`);
    expect(write.request.method).toBe('DELETE');
    expect(write.request.body).toBeNull();
    write.flush(null);
  });

  it.each([0, 5000])('cancels stale reads on polling and stops on destruction: %s', interval => {
    vi.useFakeTimers();
    const component = setup([source('first'), source('second')], interval);
    const pending = [expectRead('first'), expectRead('second')];
    vi.advanceTimersByTime(interval || 120000);
    expect(pending.every(request => request.cancelled)).toBe(true);
    const current = [expectRead('first'), expectRead('second')];
    TestBed.resetTestingModule();
    expect(current.every(request => request.cancelled)).toBe(true);
    vi.advanceTimersByTime(120000);
    http.expectNone(() => true);
    expect(component.notify()).toBe(false);
  });

  it('forwards a source failure and cancels the other pending reads', () => {
    setup([source('first'), source('second')]);
    expectRead('first').flush({ rows: [] });
    expectRead('second').flush({ rows: [] });
    const error = vi.fn();
    const next = vi.fn();
    TestBed.inject(NotifyService).getWatchList().subscribe({ next, error });
    const first = expectRead('first');
    const second = expectRead('second');
    first.flush({ denied: true }, { status: 403, statusText: 'Forbidden' });
    expect(error).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ status: 403 }));
    expect(next).not.toHaveBeenCalled();
    expect(second.cancelled).toBe(true);
  });

  it.each([0, 500, 503, 599])('recovers from an initial transient failure: %s', status => {
    vi.useFakeTimers();
    const component = setup([source('first'), source('second')], 5000);
    const first = expectRead('first');
    const second = expectRead('second');
    if (status === 0) first.error(new ProgressEvent('error'));
    else first.flush(null, { status, statusText: 'Unavailable' });
    expect(second.cancelled).toBe(true);
    expect(component.notify()).toBe(false);
    vi.advanceTimersByTime(4999);
    http.expectNone(() => true);
    vi.advanceTimersByTime(1);
    expectRead('second').flush({ rows: [row('b')] });
    expectRead('first').flush({ rows: [row('a')] });
    expect(component.lists()?.map(item => item.uuid)).toEqual(['a', 'b']);
  });

  it('retains the last complete list through repeated failures at the configured cadence', () => {
    vi.useFakeTimers();
    const component = setup([source('first'), source('second')], 5000);
    expectRead('first').flush({ rows: [row('a')] });
    expectRead('second').flush({ rows: [row('b')] });
    const previous = component.notify();
    for (let attempt = 0; attempt < 3; attempt++) {
      vi.advanceTimersByTime(4999);
      http.expectNone(() => true);
      vi.advanceTimersByTime(1);
      expectRead('first').flush({ rows: [row(`partial-${attempt}`)] });
      expectRead('second').flush(null, { status: 503, statusText: 'Unavailable' });
      expect(component.notify()).toBe(previous);
    }
    vi.advanceTimersByTime(4999);
    http.expectNone(() => true);
    vi.advanceTimersByTime(1);
    expectRead('first').flush({ rows: [row('new')] });
    expectRead('second').flush({ rows: [] });
    expect(component.lists()?.map(item => item.uuid)).toEqual(['new']);
  });

  it.each([401, 403, 404, 429, 499, 600])('keeps non-transient HTTP errors terminal: %s', status => {
    vi.useFakeTimers();
    const component = setup([source('first'), source('second')], 5000);
    const first = expectRead('first');
    const second = expectRead('second');
    first.flush(null, { status, statusText: 'Rejected' });
    expect(second.cancelled).toBe(true);
    vi.advanceTimersByTime(15000);
    expect(unhandledError).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ status }));
    unhandledError.mockClear();
    http.expectNone(() => true);
    expect(component.notify()).toBe(false);
  });

  it('does not hide a non-HTTP source error', () => {
    vi.useFakeTimers();
    setup([source('first')], 5000);
    expectRead('first').flush({ rows: [] });
    const error = new Error('Source failed');
    const read = vi.spyOn(TestBed.inject(NotifyService), 'getWatchList')
      .mockReturnValue(throwError(() => error));
    vi.advanceTimersByTime(15000);
    expect(unhandledError).toHaveBeenCalledExactlyOnceWith(error);
    unhandledError.mockClear();
    expect(read).toHaveBeenCalledTimes(1);
    http.expectNone(() => true);
  });

  it('does not hide invalid successful response data', () => {
    vi.useFakeTimers();
    setup([source('first')], 5000);
    expectRead('first').flush({ rows: null });
    vi.advanceTimersByTime(15000);
    expect(unhandledError).toHaveBeenCalledExactlyOnceWith(expect.any(TypeError));
    unhandledError.mockClear();
    http.expectNone(() => true);
  });

  it('stops polling when destroyed after a transient failure', () => {
    vi.useFakeTimers();
    setup([source('first')], 5000);
    expectRead('first').error(new ProgressEvent('error'));
    vi.advanceTimersByTime(1);
    TestBed.resetTestingModule();
    vi.advanceTimersByTime(15000);
    http.expectNone(() => true);
  });
});
