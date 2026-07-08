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

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

process.on('uncaughtException', err => {
  console.error('[uncaughtException]', err.message, err.stack);
});
process.on('unhandledRejection', (reason: unknown) => {
  console.error('[unhandledRejection]', reason);
});

const app = express();
app.use(express.json());
app.use(compression());
app.use(blockScanners);
app.use(rateLimiter);

// 设置全局 SSR 渲染超时控制，防止单个请求无限占用资源
const SSR_TIMEOUT = 10000; // 10秒

const angularApp = new AngularNodeAppEngine();

const SSR_CACHE_TTL = 5 * 60 * 1000;
const ssrCache = new Map<string, { html: string; expires: number }>();

function getCacheKey(req: express.Request): string {
  return req.path;
}

function isCacheable(req: express.Request): boolean {
  return (
    req.method === 'GET' &&
    !req.headers['authorization'] &&
    !req.query['nocache'] &&
    !req.query['preview']
  );
}

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

/**
 * Handle all other requests by rendering the Angular application with timeout control.
 */
app.use('/**', (req, res, next) => {
  const cacheable = isCacheable(req);
  const cacheKey = getCacheKey(req);

  if (cacheable) {
    const cached = ssrCache.get(cacheKey);
    if (cached && cached.expires > Date.now()) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Cache', 'HIT');
      res.send(cached.html);
      return;
    }
  }

  let settled = false;

  const timeoutId = setTimeout(() => {
    if (settled || res.headersSent) {
      return;
    }
    settled = true;
    console.warn(`[SSR Timeout] Request exceeded ${SSR_TIMEOUT}ms for ${req.path}`);
    res.status(504).send('Server Timeout: Page rendering took too long');
  }, SSR_TIMEOUT);

  angularApp
    .handle(req)
    .then(async response => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timeoutId);
      if (response) {
        if (cacheable && response.status === 200) {
          const html = await response.clone().text();
          ssrCache.set(cacheKey, { html, expires: Date.now() + SSR_CACHE_TTL });
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
