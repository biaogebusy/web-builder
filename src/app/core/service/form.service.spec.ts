import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { ApiService } from '@core/service/api.service';
import { FormService } from '@core/service/form.service';
import { createApiServiceMock } from '@core/testing/mocks';

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
});
