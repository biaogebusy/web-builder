import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { ApiService } from '@core/service/api.service';
import { FormService } from '@core/service/form.service';
import { createApiServiceMock } from '@core/testing/mocks';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: {} },
        { provide: ApiService, useValue: createApiServiceMock() },
      ],
    });
    service = TestBed.inject(FormService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('builds plain controls with their initial values', () => {
    const form: UntypedFormGroup = service.toFormGroup([
      { type: 'input', key: 'title', value: '你好' },
      { type: 'input', key: 'keys' },
    ]);

    expect(form.get('title')?.value).toBe('你好');
    expect(form.get('keys')?.value).toBe('');
  });

  it('marks required controls invalid until filled', () => {
    const form = service.toFormGroup([{ type: 'input', key: 'mail', params: { required: true } }]);

    expect(form.valid).toBe(false);

    form.get('mail')?.setValue('a@b.co');
    expect(form.valid).toBe(true);
  });

  it('splits multi select values on the plus separator', () => {
    const form = service.toFormGroup([
      { type: 'select', key: 'tags', multiple: true, value: 'news+tech' },
    ]);

    expect(form.get('tags')?.value).toEqual(['news', 'tech']);
  });

  it('creates start and end controls for date ranges', () => {
    const form = service.toFormGroup([{ type: 'datepicker', range: true }]);

    expect(form.get('start')).toBeTruthy();
    expect(form.get('end')).toBeTruthy();
  });

  it('prepends the webform id to submitted values', () => {
    expect(service.getwebFormData({ webform_id: 'contact' }, { name: '信使' })).toEqual({
      webform_id: 'contact',
      name: '信使',
    });
  });

  it('flattens the picked date range into formatted bounds', () => {
    const value = service.handleRangeDate({
      keys: 'x',
      date: { start: new Date(2026, 6, 1), end: new Date(2026, 6, 26) },
    });

    expect(value).toEqual({ keys: 'x', start: '2026-07-01', end: '2026-07-26' });
  });

  it('submits with the session csrf token and picked dates as Y-m-d', () => {
    const post = vi.fn((_url: string, _body: any, _options: any) => of({ sid: 'abc' }));
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: { post } },
        {
          provide: ApiService,
          useValue: {
            ...createApiServiceMock(),
            apiUrl: 'https://cms.test',
            getToken: () => of('csrf-token'),
          },
        },
      ],
    });

    TestBed.inject(FormService)
      .submitWebForm({ webform_id: 'contact', when: new Date(2026, 8, 1) })
      .subscribe();

    const [url, body, options] = post.mock.calls[0];
    expect(url).toBe('https://cms.test/webform_rest/submit');
    // A Date would serialize to a UTC timestamp, which drupal date elements reject
    expect(body).toEqual({ webform_id: 'contact', when: '2026-09-01' });
    expect(options.headers.get('X-CSRF-Token')).toBe('csrf-token');
  });
});
