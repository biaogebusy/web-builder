import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, REQUEST_CONTEXT, inject } from '@angular/core';

/**
 * Mutable per-request context created in `server.ts` and passed to
 * `AngularNodeAppEngine.handle(req, context)`; the app receives the same
 * object through the REQUEST_CONTEXT injection token. After the render,
 * `server.ts` reads it back to decide whether the produced HTML is safe to
 * cache — a page rendered while the CMS was failing must not be reused.
 */
export interface SsrRequestContext {
  degraded?: boolean;
  degradedReasons?: string[];
}

export function isSsrRenderDegraded(context: unknown): boolean {
  return (
    typeof context === 'object' &&
    context !== null &&
    (context as SsrRequestContext).degraded === true
  );
}

/**
 * 5xx, network failures (status 0) and non-HTTP errors (e.g. rxjs timeouts)
 * are transient: the next render may succeed, so its HTML must not be cached.
 * Stable 4xx answers (404/403) are the backend's real response for the URL
 * and keep the normal caching behavior.
 */
export function isTransientContentError(error: unknown): boolean {
  if (error instanceof HttpErrorResponse) {
    return error.status === 0 || error.status >= 500;
  }
  return true;
}

@Injectable({ providedIn: 'root' })
export class SsrRenderStateService {
  private context = inject(REQUEST_CONTEXT, { optional: true });

  /** Flag the current server render as degraded; no-op in the browser. */
  markDegraded(reason: string): void {
    if (typeof this.context !== 'object' || this.context === null) {
      return;
    }
    const context = this.context as SsrRequestContext;
    context.degraded = true;
    (context.degradedReasons ??= []).push(reason);
  }
}
