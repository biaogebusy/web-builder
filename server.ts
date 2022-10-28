import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import { join } from 'path';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { environment } from 'src/environments/environment';
import compression from 'compression';
import { readFileSync, existsSync } from 'fs';

const dominoModule = require('domino');
const indexTemplate = readFileSync(
  `${environment.site}/browser/index.html`
).toString();
const win = dominoModule.createWindow(indexTemplate);

(global as any).window = win;
(global as any).document = win.document;
(global as any).Event = win.Event;
(global as any).HTMLElement = win.HTMLElement;
(global as any).KeyboardEvent = win.KeyboardEvent;
(global as any).MouseEvent = win.MouseEvent;
(global as any).FocusEvent = win.FocusEvent;
(global as any).object = win.object;
(global as any).navigator = win.navigator;
(global as any).localStorage = win.localStorage;
(global as any).sessionStorage = win.sessionStorage;
(global as any).DOMTokenList = win.DOMTokenList;
(global as any).HTMLAnchorElement = win.HTMLAnchorElement;
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xhr2');

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';

const distFolder = join(process.cwd(), `${environment.site}/browser`);

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  server.use(compression());
  server.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
  );
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(
    helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false })
  );
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.use((req, res, next) => {
    let err = null;
    console.log(req);
    try {
      decodeURIComponent(req.originalUrl);
    } catch (e) {
      err = e;
    }

    if (err) {
      console.log(`\n======\n`, `${err}\n${req.originalUrl}\n=====\n`);
      return res.status(400).send('400: Bad Request!');
    }
    next();
  });

  // server static files
  server.use(express.static(__dirname + distFolder, { index: false }));

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // Set headers for all requests
  server.get('*', (req, res, next) => {
    // 表示客户端可以缓存资源，每次使用缓存资源前都必须重新验证其有效性。这意味着每次都会发起 HTTP 请求，但当缓存内容仍有效时可以跳过 HTTP 响应体的下载。
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    if (!environment.ssr) {
      res.sendFile(join(distFolder, 'index.html'));
      return;
    }
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = environment.port || process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(
      `Node Express server ${environment.site} listening on http://localhost:${port}`
    );
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
