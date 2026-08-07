import { HttpErrorResponse } from '@angular/common/http';
import { REQUEST_CONTEXT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TimeoutError } from 'rxjs';

import {
  SsrRenderStateService,
  SsrRequestContext,
  isSsrRenderDegraded,
  isTransientContentError,
} from './ssr-render-state.service';

describe('SsrRenderStateService', () => {
  it('marks the request context as degraded and collects reasons', () => {
    const context: SsrRequestContext = {};
    TestBed.configureTestingModule({
      providers: [{ provide: REQUEST_CONTEXT, useValue: context }],
    });

    const service = TestBed.inject(SsrRenderStateService);
    service.markDegraded('page-content');
    service.markDegraded('branding');

    expect(context.degraded).toBe(true);
    expect(context.degradedReasons).toEqual(['page-content', 'branding']);
  });

  it('is a no-op without a request context (browser)', () => {
    TestBed.configureTestingModule({});

    const service = TestBed.inject(SsrRenderStateService);

    expect(() => service.markDegraded('page-content')).not.toThrow();
  });
});

describe('isSsrRenderDegraded', () => {
  it('detects a degraded context', () => {
    expect(isSsrRenderDegraded({ degraded: true })).toBe(true);
  });

  it('rejects non-degraded or invalid contexts', () => {
    expect(isSsrRenderDegraded({})).toBe(false);
    expect(isSsrRenderDegraded({ degraded: false })).toBe(false);
    expect(isSsrRenderDegraded(undefined)).toBe(false);
    expect(isSsrRenderDegraded(null)).toBe(false);
    expect(isSsrRenderDegraded('degraded')).toBe(false);
  });
});

describe('isTransientContentError', () => {
  it('treats 5xx, network and non-HTTP errors as transient', () => {
    expect(isTransientContentError(new HttpErrorResponse({ status: 500 }))).toBe(true);
    expect(isTransientContentError(new HttpErrorResponse({ status: 503 }))).toBe(true);
    expect(isTransientContentError(new HttpErrorResponse({ status: 0 }))).toBe(true);
    expect(isTransientContentError(new TimeoutError())).toBe(true);
    expect(isTransientContentError(new Error('socket hang up'))).toBe(true);
  });

  it('treats stable 4xx responses as non-transient', () => {
    expect(isTransientContentError(new HttpErrorResponse({ status: 404 }))).toBe(false);
    expect(isTransientContentError(new HttpErrorResponse({ status: 403 }))).toBe(false);
  });
});
