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

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
app.use(express.json());
app.use(compression());

// 设置全局超时控制
const SSR_TIMEOUT = 30000; // 30秒 SSR渲染超时
const HTTP_TIMEOUT = 10000; // 10秒 HTTP请求超时

const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

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
  const timeoutId = setTimeout(() => {
    if (!res.headersSent) {
      console.warn(`[SSR Timeout] Request exceeded ${SSR_TIMEOUT}ms for ${req.path}`);
      res.status(504).send('Server Timeout: Page rendering took too long');
    }
  }, SSR_TIMEOUT);

  const originalSend = res.send;
  res.send = function(data: any) {
    clearTimeout(timeoutId);
    return originalSend.call(this, data);
  };

  angularApp
    .handle(req)
    .then(response => {
      clearTimeout(timeoutId);
      if (response) {
        writeResponseToNodeResponse(response, res);
      } else {
        next();
      }
    })
    .catch((error) => {
      clearTimeout(timeoutId);
      console.error(`[SSR Error] ${req.path}:`, error.message);
      if (!res.headersSent) {
        res.status(500).send('Server Error: Failed to render page');
      }
      next(error);
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
