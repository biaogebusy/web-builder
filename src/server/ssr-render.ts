import { AngularNodeAppEngine, writeResponseToNodeResponse } from '@angular/ssr/node';
import type { RequestHandler, Response } from 'express';
import { environment } from 'src/environments/environment';
import {
  isSsrRenderDegraded,
  type SsrRequestContext,
} from 'src/app/core/service/ssr-render-state.service';
import {
  SSR_CACHE_MAX_BYTES,
  SSR_CACHE_MAX_ENTRIES,
  SSR_CACHE_TTL_MS,
  SSR_METRICS_INTERVAL_MS,
  SSR_RENDER_TIMEOUT_MS,
} from '../ssr.config';
import { readPositiveInteger } from './env';
import { getRequestTiming, setSsrTimingHeaders } from './request-timing';
import { getAuthCookieName, getSsrCacheDecision } from './ssr-cache-policy';
import { SsrHtmlCache } from './ssr-html-cache';

/**
 * Render the Angular application for every request that reaches it, with a render timeout,
 * a process-local HTML cache for anonymous pages and periodic metrics logging.
 */
export function createSsrRenderHandler(): RequestHandler {
  const angularApp = new AngularNodeAppEngine();
  const ssrRenderTimeoutMs = readPositiveInteger('SSR_RENDER_TIMEOUT_MS', SSR_RENDER_TIMEOUT_MS);
  const ssrCacheTtlMs = readPositiveInteger('SSR_CACHE_TTL_MS', SSR_CACHE_TTL_MS);
  const ssrCache = new SsrHtmlCache({
    maxBytes: readPositiveInteger('SSR_CACHE_MAX_BYTES', SSR_CACHE_MAX_BYTES),
    maxEntries: readPositiveInteger('SSR_CACHE_MAX_ENTRIES', SSR_CACHE_MAX_ENTRIES),
    ttlMs: ssrCacheTtlMs,
  });
  const authCookieName = getAuthCookieName(environment.apiUrl);
  const ssrMetrics = {
    degraded: 0,
    errors: 0,
    maxRenderMs: 0,
    renders: 0,
    timeouts: 0,
    totalRenderMs: 0,
  };

  const metricsTimer = setInterval(
    () => {
      ssrCache.pruneExpired();
      const cache = ssrCache.stats();
      const memory = process.memoryUsage();
      const avgRenderMs = ssrMetrics.renders ? ssrMetrics.totalRenderMs / ssrMetrics.renders : 0;
      console.info(
        '[SSR Metrics]',
        JSON.stringify({
          avgRenderMs: Math.round(avgRenderMs),
          cacheBytes: cache.bytes,
          cacheEntries: cache.entries,
          cacheEvictions: cache.evictions,
          cacheExpired: cache.expired,
          cacheHitRatio: Number(cache.hitRatio.toFixed(4)),
          cacheHits: cache.hits,
          cacheMisses: cache.misses,
          degraded: ssrMetrics.degraded,
          errors: ssrMetrics.errors,
          heapUsedMb: Number((memory.heapUsed / 1024 / 1024).toFixed(2)),
          maxRenderMs: Math.round(ssrMetrics.maxRenderMs),
          renders: ssrMetrics.renders,
          rssMb: Number((memory.rss / 1024 / 1024).toFixed(2)),
          timeouts: ssrMetrics.timeouts,
        })
      );
    },
    readPositiveInteger('SSR_METRICS_INTERVAL_MS', SSR_METRICS_INTERVAL_MS)
  );
  metricsTimer.unref();

  function recordRenderDuration(renderMs: number): void {
    ssrMetrics.renders += 1;
    ssrMetrics.totalRenderMs += renderMs;
    ssrMetrics.maxRenderMs = Math.max(ssrMetrics.maxRenderMs, renderMs);
  }

  function setPublicCacheHeaders(res: Response): void {
    const maxAgeSeconds = Math.max(1, Math.floor(ssrCacheTtlMs / 1000));
    res.setHeader(
      'Cache-Control',
      `public, max-age=0, s-maxage=${maxAgeSeconds}, stale-while-revalidate=60`
    );
    res.setHeader('X-Accel-Expires', maxAgeSeconds.toString());
  }

  return (req, res, next) => {
    const requestTiming = getRequestTiming(res);
    const cacheDecision = getSsrCacheDecision(req, {
      authCookieNames: authCookieName ? [authCookieName] : [],
    });
    requestTiming.cacheReason = cacheDecision.reason;

    if (cacheDecision.cacheable) {
      const cached = ssrCache.get(cacheDecision.key);
      if (cached) {
        requestTiming.cacheStatus = 'HIT';
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        setPublicCacheHeaders(res);
        res.setHeader('X-Cache', 'HIT');
        setSsrTimingHeaders(res, requestTiming);
        res.send(cached);
        return;
      }
      requestTiming.cacheStatus = 'MISS';
      res.setHeader('X-Cache', 'MISS');
    } else {
      requestTiming.cacheStatus = 'BYPASS';
      // 'no-store' on the document makes the page ineligible for the browser's
      // back/forward cache; 'private, no-cache' still forces revalidation on every
      // HTTP reuse and keeps shared caches out, without blocking bfcache.
      res.setHeader('Cache-Control', 'private, no-cache');
      res.setHeader('X-Accel-Expires', '0');
      res.setHeader('X-Cache', 'BYPASS');
    }

    requestTiming.ssrStartedAt = performance.now();
    const renderStart = requestTiming.ssrStartedAt;
    // Shared with the app via the REQUEST_CONTEXT token; the render marks it
    // degraded when critical CMS content failed with a transient error.
    const ssrContext: SsrRequestContext = {};
    let settled = false;

    const timeoutId = setTimeout(() => {
      if (settled || res.headersSent) {
        return;
      }
      settled = true;
      ssrMetrics.timeouts += 1;
      requestTiming.ssrDurationMs = performance.now() - renderStart;
      setSsrTimingHeaders(res, requestTiming);
      console.warn(`[SSR Timeout] Request exceeded ${ssrRenderTimeoutMs}ms for ${req.originalUrl}`);
      res.status(504).send('Server Timeout: Page rendering took too long');
    }, ssrRenderTimeoutMs);

    angularApp
      .handle(req, ssrContext)
      .then(async response => {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timeoutId);
        const renderMs = performance.now() - renderStart;
        requestTiming.ssrDurationMs = renderMs;
        recordRenderDuration(renderMs);
        res.setHeader('X-SSR-Duration', Math.round(renderMs).toString());
        setSsrTimingHeaders(res, requestTiming);
        if (response) {
          const degraded = isSsrRenderDegraded(ssrContext);
          if (degraded) {
            ssrMetrics.degraded += 1;
            requestTiming.cacheReason = `degraded:${(ssrContext.degradedReasons ?? []).join(',')}`;
            // A page rendered while the CMS was failing serves this request
            // (the client recovers on its own), but must not be reused: keep it
            // out of the local SSR cache and out of shared caches until a
            // healthy render replaces it.
            res.setHeader('Cache-Control', 'private, no-cache');
            res.setHeader('X-Accel-Expires', '0');
          }
          if (cacheDecision.cacheable && response.status === 200 && !degraded) {
            const html = await response.clone().text();
            ssrCache.set(cacheDecision.key, html);
            setPublicCacheHeaders(res);
          }
          writeResponseToNodeResponse(response, res);
        } else {
          next();
        }
      })
      .catch(error => {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timeoutId);
        ssrMetrics.errors += 1;
        requestTiming.ssrDurationMs = performance.now() - renderStart;
        recordRenderDuration(requestTiming.ssrDurationMs);
        setSsrTimingHeaders(res, requestTiming);
        console.error(`[SSR Error] ${req.path}:`, error.message);
        if (!res.headersSent) {
          res.status(500).send('Server Error: Failed to render page');
        }
      });
  };
}
