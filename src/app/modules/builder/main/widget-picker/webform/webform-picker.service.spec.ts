import { TestBed } from '@angular/core/testing';
import { ApiService } from '@core/service/api.service';
import { of, throwError } from 'rxjs';

import { WebformPickerService } from './webform-picker.service';

describe('WebformPickerService', () => {
  let service: WebformPickerService;
  const api = {
    apiUrl: 'https://cms.test',
    pageUrl: '/builder',
    getUrlPath: vi.fn(() => ({ lang: '', path: '/builder' })),
    http: { get: vi.fn() },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    api.http.get.mockReturnValue(of([]));
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(WebformPickerService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('reads the list from the language aware /api/v3 endpoint', () => {
    service.getWebforms().subscribe();

    expect(api.http.get).toHaveBeenCalledWith('https://cms.test/api/v3/webform');
  });

  it('keeps the language prefix returned by the api service', () => {
    api.getUrlPath.mockReturnValueOnce({ lang: '/en', path: '/builder' });

    service.getWebforms().subscribe();

    expect(api.http.get).toHaveBeenCalledWith('https://cms.test/en/api/v3/webform');
  });

  it('drops closed and malformed entries and falls back to the id as title', () => {
    api.http.get.mockReturnValueOnce(
      of([
        { id: 'contact', title: 'Contact' },
        { id: 'archived', title: 'Archived', status: false },
        { title: 'no id' },
        { id: 'untitled', title: '' },
      ])
    );

    let result: unknown;
    service.getWebforms().subscribe(list => (result = list));

    expect(result).toEqual([
      { id: 'contact', title: 'Contact' },
      { id: 'untitled', title: 'untitled' },
    ]);
  });

  it('tolerates a non array payload', () => {
    api.http.get.mockReturnValueOnce(of({ message: 'nope' }));

    let result: unknown;
    service.getWebforms().subscribe(list => (result = list));

    expect(result).toEqual([]);
  });

  it('serves the second call from cache', () => {
    api.http.get.mockReturnValueOnce(of([{ id: 'contact', title: 'Contact' }]));

    service.getWebforms().subscribe();
    service.getWebforms().subscribe();

    expect(api.http.get).toHaveBeenCalledTimes(1);
  });

  it('does not cache a failed list so the retry action can refetch', () => {
    api.http.get.mockReturnValueOnce(throwError(() => new Error('offline')));

    service.getWebforms().subscribe({ error: () => undefined });
    service.getWebforms().subscribe();

    expect(api.http.get).toHaveBeenCalledTimes(2);
  });

  it('reads the fields from webform_rest without a language prefix', () => {
    api.getUrlPath.mockReturnValue({ lang: '/en', path: '/builder' });
    api.http.get.mockReturnValueOnce(of({}));

    service.getFields('contact us').subscribe();

    expect(api.http.get).toHaveBeenCalledWith(
      'https://cms.test/webform_rest/contact%20us/fields',
      { params: { _format: 'json' } }
    );
  });

  it('wraps the mapped fields into an insertable dynamic-form node', () => {
    api.http.get.mockReturnValueOnce(
      of({
        name: { '#type': 'textfield', '#title': 'Name', '#required': true },
        cv: { '#type': 'managed_file', '#title': 'CV' },
        actions: { '#type': 'webform_actions' },
      })
    );

    let result: any;
    service
      .buildDynamicForm({ id: 'contact', title: 'Contact us' }, 'Submit')
      .subscribe(value => (result = value));

    expect(result.content).toEqual({
      type: 'dynamic-form',
      form: {
        type: 'formly',
        id: 'contact',
        fields: [{ key: 'name', type: 'input', props: { label: 'Name', required: true } }],
      },
      action: {
        classes: 'flex justify-center mt-4',
        submit: { type: 'btn', mode: 'flat', color: 'primary', label: 'Submit' },
      },
    });
    expect(result.warnings).toEqual([
      { key: 'cv', type: 'managed_file', reason: 'unsupported' },
    ]);
  });
});
