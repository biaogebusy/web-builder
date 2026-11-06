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
    } finally {
      TestBed.resetTestingModule();
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
});
