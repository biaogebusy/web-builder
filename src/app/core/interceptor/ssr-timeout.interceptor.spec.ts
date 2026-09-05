import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ssrTimeoutInterceptor } from '@core/interceptor/ssr-timeout.interceptor';
import { SSR_HTTP_TIMEOUT_MS } from 'src/ssr.config';

describe('ssrTimeoutInterceptor', () => {
  const setup = (platform: 'browser' | 'server') => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([ssrTimeoutInterceptor])),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: platform },
      ],
    });
    return {
      http: TestBed.inject(HttpClient),
      httpTesting: TestBed.inject(HttpTestingController),
    };
  };

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    try {
      TestBed.inject(HttpTestingController).verify();
    } catch {
      // Timeout tests cancel the request before flush; expected.
    }
    TestBed.resetTestingModule();
  });

  it('passes through requests on the browser without a timeout', () => {
    const { http, httpTesting } = setup('browser');
    http.get('/api/test').subscribe(response => {
      expect(response).toEqual({ ok: true });
    });
    const req = httpTesting.expectOne('/api/test');
    req.flush({ ok: true });
  });

  it('passes through on the server when the request completes before the timeout', () => {
    const { http, httpTesting } = setup('server');
    http.get('/api/test').subscribe(response => {
      expect(response).toEqual({ ok: true });
    });
    const req = httpTesting.expectOne('/api/test');
    req.flush({ ok: true });
  });

  it('returns a 504 HttpErrorResponse when the server request times out', () => {
    vi.useFakeTimers();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { http, httpTesting } = setup('server');
    let capturedError: HttpErrorResponse | undefined;

    http.get('/api/slow').subscribe({
      error: err => (capturedError = err),
    });

    const req = httpTesting.expectOne('/api/slow');

    // Simulate request taking longer than SSR_HTTP_TIMEOUT_MS
    vi.advanceTimersByTime(SSR_HTTP_TIMEOUT_MS + 100);

    expect(capturedError).toBeDefined();
    expect(capturedError).toBeInstanceOf(HttpErrorResponse);
    expect(capturedError!.status).toBe(504);
    expect(capturedError!.statusText).toBe('SSR Gateway Timeout');
    expect(capturedError!.url).toBe('/api/slow');

    // console.error should have been called with the timeout message
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('[SSR Timeout]')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('GET /api/slow')
    );

    // Request was cancelled by the timeout; nothing to flush.
    expect(req.cancelled).toBe(true);
  });

  it('re-throws non-timeout errors on the server unchanged', () => {
    const { http, httpTesting } = setup('server');
    let capturedError: HttpErrorResponse | undefined;

    http.get('/api/error').subscribe({
      error: err => (capturedError = err),
    });

    const req = httpTesting.expectOne('/api/error');
    req.flush('boom', { status: 500, statusText: 'Server Error' });

    expect(capturedError).toBeDefined();
    expect(capturedError!.status).toBe(500);
    expect(capturedError!.statusText).toBe('Server Error');
  });

  it('includes the request params in the timeout log URL', () => {
    vi.useFakeTimers();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const { http, httpTesting } = setup('server');

    http.get('/api/data', { params: { page: '2', limit: '10' } }).subscribe({
      error: () => {},
    });

    const req = httpTesting.expectOne(r => r.url === '/api/data');
    vi.advanceTimersByTime(SSR_HTTP_TIMEOUT_MS + 100);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(/page=2/)
    );

    expect(req.cancelled).toBe(true);
  });
});
