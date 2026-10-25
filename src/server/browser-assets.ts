import express, { type RequestHandler } from 'express';
import expressStaticGzip from 'express-static-gzip';
import { relative, sep } from 'node:path';

// Keep this boundary aligned with the Angular static location in deploy/prod.conf.
const STATIC_DIRECTORY = /^\/(?:assets|media)\//i;
const STATIC_FILE =
  /\.(?:m?js|css|woff2?|ttf|eot|otf|svg|png|jpe?g|gif|webp|avif|ico|map)(?:\.(?:br|gz))?$/i;
const HASHED_OUTPUT = /^(?:media\/)?[^/]+-[A-Z0-9]{8}\.[^/]+$/;

/** Serve build assets and keep missing modules out of the SSR HTML fallback and caches. */
export function createBrowserAssetHandler(browserDirectory: string): RequestHandler {
  const router = express.Router();
  router.use(
    expressStaticGzip(browserDirectory, {
      enableBrotli: true,
      orderPreference: ['br', 'gz'],
      index: false,
      serveStatic: {
        index: false,
        redirect: false,
        setHeaders(res, file) {
          const path = relative(browserDirectory, file).split(sep).join('/');
          res.setHeader(
            'Cache-Control',
            HASHED_OUTPUT.test(path) ? 'public, max-age=31536000, immutable' : 'no-cache'
          );
        },
      },
    })
  );
  router.use((req, res, next) => {
    const isAsset = STATIC_DIRECTORY.test(req.path) || STATIC_FILE.test(req.path);
    if ((req.method === 'GET' || req.method === 'HEAD') && isAsset) {
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('X-Accel-Expires', '0');
      res.status(404).type('text/plain').send('Not found');
      return;
    }
    next();
  });
  return router;
}
