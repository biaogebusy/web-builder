import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiTestResult, ConfigCheckService } from '@core/service/config-check.service';
import { API_CHECK_LIST } from '@modules/builder/main/config-check/api-check-list';

// The service awaits each request before issuing the next one; give the
// promise chain a macrotask to settle between flushes.
const settle = () => new Promise(resolve => setTimeout(resolve, 0));

describe('ConfigCheckService', () => {
  let service: ConfigCheckService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ConfigCheckService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('checks every configured endpoint in order and reports each result', async () => {
    const results: ApiTestResult[] = [];
    service.results$.subscribe(result => results.push(result));

    service.startCheck();

    // concatMap keeps one request in flight at a time, in list order
    for (const api of API_CHECK_LIST) {
      const req = http.expectOne(api.endpoint);
      expect(req.request.method).toBe(api.method);
      req.flush({ status: 200 });
      await settle();
    }

    expect(results.map(r => r.name)).toEqual(API_CHECK_LIST.map(api => api.name));
    expect(results.every(r => r.success)).toBe(true);
    http.verify();
  });

  it('marks a failing endpoint without stopping the run', async () => {
    const pending = service.checkAllEndpoints();

    for (const [index, api] of API_CHECK_LIST.entries()) {
      const req = http.expectOne(api.endpoint);
      if (index === 0) {
        req.flush('boom', { status: 500, statusText: 'Server Error' });
      } else {
        req.flush({ status: 200 });
      }
      await settle();
    }

    const results = await pending;

    expect(results.length).toBe(API_CHECK_LIST.length);
    expect(results[0].success).toBe(false);
    expect(results[0].status).toBe(500);
    expect(results[0].error).toBeTruthy();
    expect(results.slice(1).every(r => r.success)).toBe(true);
    http.verify();
  });

  it('reports a network failure as status 0', async () => {
    const pending = service.checkAllEndpoints();

    http.expectOne(API_CHECK_LIST[0].endpoint).error(new ProgressEvent('error'));
    await settle();
    for (const api of API_CHECK_LIST.slice(1)) {
      http.expectOne(api.endpoint).flush({ status: 200 });
      await settle();
    }

    const results = await pending;

    expect(results[0].success).toBe(false);
    expect(results[0].status).toBe(0);
    http.verify();
  });
});
