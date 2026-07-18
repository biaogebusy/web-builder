import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { environment } from 'src/environments/environment';
import compression from 'compression';
import { blockScanners, rateLimiter } from './middlewares/security';
import { SsrHtmlCache } from './server/ssr-html-cache';
import { getAuthCookieName, getSsrCacheDecision } from './server/ssr-cache-policy';
import {
  SSR_CACHE_MAX_BYTES,
  SSR_CACHE_MAX_ENTRIES,
  SSR_CACHE_TTL_MS,
  SSR_METRICS_INTERVAL_MS,
  SSR_RENDER_TIMEOUT_MS,
} from './ssr.config';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

process.on('uncaughtException', err => {
  console.error('[uncaughtException]', err.message, err.stack);
});
process.on('unhandledRejection', (reason: unknown) => {
  console.error('[unhandledRejection]', reason);
});

const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(compression());
app.use(blockScanners);

const angularApp = new AngularNodeAppEngine();
const ssrRenderTimeoutMs = readPositiveInteger(
  'SSR_RENDER_TIMEOUT_MS',
  SSR_RENDER_TIMEOUT_MS
);
const ssrCache = new SsrHtmlCache({
  maxBytes: readPositiveInteger('SSR_CACHE_MAX_BYTES', SSR_CACHE_MAX_BYTES),
  maxEntries: readPositiveInteger('SSR_CACHE_MAX_ENTRIES', SSR_CACHE_MAX_ENTRIES),
  ttlMs: readPositiveInteger('SSR_CACHE_TTL_MS', SSR_CACHE_TTL_MS),
});
const authCookieName = getAuthCookieName(environment.apiUrl);
const ssrMetrics = {
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

/**
 * Serve static files from /browser
 */
app.use(
  expressStaticGzip(browserDistFolder, {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    index: false,
    serveStatic: {
      maxAge: '1y',
      index: false,
      redirect: false,
    },
  })
);
app.use(rateLimiter);

/**
 * Handle all other requests by rendering the Angular application with timeout control.
 */
app.use('/**', (req, res, next) => {
  const cacheDecision = getSsrCacheDecision(req, {
    authCookieNames: authCookieName ? [authCookieName] : [],
  });

  if (cacheDecision.cacheable) {
    const cached = ssrCache.get(cacheDecision.key);
    if (cached) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=60');
      res.setHeader('X-Cache', 'HIT');
      res.send(cached);
      return;
    }
    res.setHeader('X-Cache', 'MISS');
  } else {
    res.setHeader('Cache-Control', 'private, no-store');
    res.setHeader('X-Cache', 'BYPASS');
  }

  const renderStart = performance.now();
  let settled = false;

  const timeoutId = setTimeout(() => {
    if (settled || res.headersSent) {
      return;
    }
    settled = true;
    ssrMetrics.timeouts += 1;
    console.warn(`[SSR Timeout] Request exceeded ${ssrRenderTimeoutMs}ms for ${req.originalUrl}`);
    res.status(504).send('Server Timeout: Page rendering took too long');
  }, ssrRenderTimeoutMs);

  angularApp
    .handle(req)
    .then(async response => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timeoutId);
      const renderMs = performance.now() - renderStart;
      recordRenderDuration(renderMs);
      res.setHeader('X-SSR-Duration', Math.round(renderMs).toString());
      if (response) {
        if (cacheDecision.cacheable && response.status === 200) {
          const html = await response.clone().text();
          ssrCache.set(cacheDecision.key, html);
          res.setHeader(
            'Cache-Control',
            'public, max-age=0, s-maxage=300, stale-while-revalidate=60'
          );
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
      recordRenderDuration(performance.now() - renderStart);
      console.error(`[SSR Error] ${req.path}:`, error.message);
      if (!res.headersSent) {
        res.status(500).send('Server Error: Failed to render page');
      }
    });
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = environment.port || process.env['PORT'] || 4000;
  app.listen(port, error => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

function recordRenderDuration(renderMs: number): void {
  ssrMetrics.renders += 1;
  ssrMetrics.totalRenderMs += renderMs;
  ssrMetrics.maxRenderMs = Math.max(ssrMetrics.maxRenderMs, renderMs);
}

function readPositiveInteger(name: string, fallback: number): number {
  const parsed = Number.parseInt(process.env[name] ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
