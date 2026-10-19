import { createNodeRequestHandler, isMainModule } from '@angular/ssr/node';
import express from 'express';
import type { Server } from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { environment } from 'src/environments/environment';
import compression from 'compression';
import { blockScanners, rateLimiter } from './middlewares/security';
import { installGracefulShutdown } from './server/graceful-shutdown';
import { createBrowserAssetHandler } from './server/browser-assets';
import { requestTimingMiddleware } from './server/request-timing';
import { createSsrRenderHandler } from './server/ssr-render';

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
app.use(requestTimingMiddleware);
app.use(express.json());
app.use(compression());

/**
 * Serve static files from /browser
 */
app.use(createBrowserAssetHandler(browserDistFolder));
// Build hashes can contain scanner keywords, so handle assets before filtering route probes.
app.use(blockScanners);
app.use(rateLimiter);

/**
 * Handle all other requests by rendering the Angular application with timeout control.
 */
app.use(createSsrRenderHandler());

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
let httpServer: Server | undefined;
if (isMainModule(import.meta.url)) {
  const port = environment.port || process.env['PORT'] || 4000;
  httpServer = app.listen(port, error => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}
installGracefulShutdown(httpServer);

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
