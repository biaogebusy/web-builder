import express from 'express';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { createSsrRenderHandler } from './ssr-render';
import { requestTimingMiddleware } from './request-timing';

const fixture = vi.hoisted(() => ({ published: true, offline: false, key: 'node:1:en:1', url: '', renders: 0, probes: 0 }));
vi.mock('src/app/core/service/ssr-render-state.service', () => ({
  isSsrRenderDegraded: (context: { degraded?: boolean }) => context.degraded === true,
}));
vi.mock('@angular/ssr/node', () => ({
  AngularNodeAppEngine: class {
    async handle(_request: unknown, context: { publicPageStatus?: number; publicPage?: { url: string; key: string }; degraded?: boolean }) {
      fixture.renders++;
      context.publicPageStatus = fixture.offline ? 503 : fixture.published ? 200 : 404;
      if (context.publicPageStatus === 200) context.publicPage = { url: fixture.url, key: fixture.key };
      context.degraded = fixture.offline;
      return new Response(context.publicPageStatus === 200 ? 'Published body ' + fixture.key : 'Unavailable');
    }
  },
  writeResponseToNodeResponse: async (response: Response, target: express.Response) => {
    target.status(response.status).send(await response.text());
  },
}));

describe('SSR public publication enforcement', () => {
  let cms: Server;
  let server: Server;
  let url: string;

  beforeEach(async () => {
    Object.assign(fixture, { published: true, offline: false, key: 'node:1:en:1', renders: 0, probes: 0 });
    cms = createServer((req, res) => {
      fixture.probes++;
      expect(req.headers.authorization).toBeUndefined();
      expect(req.headers.cookie).toBeUndefined();
      res.writeHead(fixture.offline ? 503 : fixture.published ? 200 : 404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(fixture.published ? { publicPageKey: fixture.key } : {}));
    });
    await new Promise<void>(resolve => cms.listen(0, '127.0.0.1', resolve));
    fixture.url = `http://127.0.0.1:${(cms.address() as AddressInfo).port}/api/v3/landingPage?public=true&content=/page`;
    const app = express();
    app.use(requestTimingMiddleware);
    app.use(createSsrRenderHandler());
    server = app.listen(0, '127.0.0.1');
    await new Promise<void>(resolve => server.once('listening', resolve));
    url = `http://127.0.0.1:${(server.address() as AddressInfo).port}/page`;
  });

  afterEach(async () => {
    await Promise.all([cms, server].map(item => new Promise<void>((resolve, reject) => item.close(error => error ? reject(error) : resolve()))));
  });

  it('reuses published HTML only after checking CMS and revokes a warm page', async () => {
    expect(await (await fetch(url)).text()).toContain('Published body');
    const hit = await fetch(url);
    expect(hit.headers.get('x-cache')).toBe('HIT');
    expect(hit.headers.get('cache-control')).toContain('no-store');
    expect(fixture.renders).toBe(1);
    expect(fixture.probes).toBe(1);
    fixture.published = false;
    const withdrawn = await fetch(url);
    expect(withdrawn.status).toBe(404);
    expect(await withdrawn.text()).not.toContain('Published body');
    expect(withdrawn.headers.get('x-accel-expires')).toBe('0');
    const admin = await fetch(url, { headers: { Authorization: 'Bearer synthetic-admin' } });
    expect(admin.status).toBe(404);
    expect(await admin.text()).not.toContain('Published body');
  });

  it('does not return stale HTML when CMS is unavailable or the identity changes', async () => {
    await fetch(url);
    fixture.offline = true;
    const failed = await fetch(url);
    expect(failed.status).toBe(503);
    expect(await failed.text()).not.toContain('Published body');
    fixture.offline = false;
    fixture.key = 'node:2:en:3';
    expect(await (await fetch(url)).text()).toContain('node:2:en:3');
    expect(fixture.renders).toBe(3);
  });
});
