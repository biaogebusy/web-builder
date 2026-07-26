import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

export type SsrCacheStatus = 'HIT' | 'MISS' | 'BYPASS';

export interface SsrRequestTiming {
  cacheReason?: string;
  cacheStatus?: SsrCacheStatus;
  requestId: string;
  ssrDurationMs?: number;
  ssrStartedAt?: number;
  startedAt: number;
}

export interface ServerTimingMetric {
  description?: string;
  durationMs?: number;
  name: string;
}

const REQUEST_ID_PATTERN = /^[a-zA-Z0-9._:-]{1,128}$/;
const REQUEST_TIMING_KEY = 'ssrRequestTiming';

export function requestTimingMiddleware(req: Request, res: Response, next: NextFunction): void {
  const timing: SsrRequestTiming = {
    requestId: resolveRequestId(req.headers['x-request-id']),
    startedAt: performance.now(),
  };

  res.locals[REQUEST_TIMING_KEY] = timing;
  res.setHeader('X-Request-ID', timing.requestId);
  res.on('finish', () => {
    if (!timing.cacheStatus) {
      return;
    }

    const totalMs = performance.now() - timing.startedAt;
    const nodeBeforeSsrMs = (timing.ssrStartedAt ?? performance.now()) - timing.startedAt;
    console.info(
      '[HTTP SSR]',
      JSON.stringify({
        cache: timing.cacheStatus,
        cacheReason: timing.cacheReason,
        method: req.method,
        nodeBeforeSsrMs: Math.round(nodeBeforeSsrMs),
        path: req.path,
        requestId: timing.requestId,
        ssrRenderMs: Math.round(timing.ssrDurationMs ?? 0),
        status: res.statusCode,
        totalMs: Math.round(totalMs),
      })
    );
  });
  next();
}

export function getRequestTiming(res: Response): SsrRequestTiming {
  return res.locals[REQUEST_TIMING_KEY] as SsrRequestTiming;
}

export function setSsrTimingHeaders(res: Response, timing: SsrRequestTiming): void {
  const nodeBeforeSsrMs = (timing.ssrStartedAt ?? performance.now()) - timing.startedAt;
  const metrics: ServerTimingMetric[] = [
    {
      name: 'node-before-ssr',
      durationMs: nodeBeforeSsrMs,
      description: 'Node middleware before Angular SSR',
    },
  ];

  if (timing.ssrDurationMs !== undefined) {
    metrics.push({
      name: 'angular-ssr',
      durationMs: timing.ssrDurationMs,
      description: 'Angular server rendering',
    });
  }

  if (timing.cacheStatus) {
    metrics.push({
      name: 'ssr-cache',
      description: timing.cacheStatus,
    });
  }

  res.setHeader('Server-Timing', formatServerTiming(metrics));
  res.setHeader('X-Node-Before-SSR', Math.round(nodeBeforeSsrMs).toString());
}

export function resolveRequestId(
  header: string | string[] | undefined,
  createId: () => string = randomUUID
): string {
  const value = Array.isArray(header) ? header[0] : header;
  return value && REQUEST_ID_PATTERN.test(value) ? value : createId();
}

export function formatServerTiming(metrics: ServerTimingMetric[]): string {
  return metrics
    .map(metric => {
      const values = [metric.name];
      if (metric.durationMs !== undefined) {
        values.push(`dur=${Math.max(0, metric.durationMs).toFixed(2)}`);
      }
      if (metric.description) {
        const description = metric.description.replaceAll('\\', '\\\\').replaceAll('"', '\\"');
        values.push(`desc="${description}"`);
      }
      return values.join(';');
    })
    .join(', ');
}
