// @vitest-environment node
import express from 'express';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import type { Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { createBrowserAssetHandler } from './browser-assets';

describe('browser assets', () => {
  let directory: string;
  let server: Server;
  let origin: string;
  const source = 'export const loaded = true;';

  beforeAll(async () => {
    directory = await mkdtemp(join(tmpdir(), 'xinshi-browser-assets-'));
    await mkdir(join(directory, 'assets'));
    await mkdir(join(directory, 'media'));
    await writeFile(join(directory, 'chunk-ABCDEFGH.js'), source);
    await writeFile(join(directory, 'chunk-ABCDEFGH.js.br'), brotliCompressSync(source));
    await writeFile(join(directory, 'chunk-ABCDEFGH.js.gz'), gzipSync(source));
    await writeFile(join(directory, 'media/font-ABCDEFGH.woff2'), 'font');
    await writeFile(join(directory, 'assets/config.json'), '{}');
    await writeFile(join(directory, 'index.html'), '<html>Entry</html>');
    const app = express();
    app.use(createBrowserAssetHandler(directory));
    app.use((_req, res) => res.type('html').send('<html>SSR fallback</html>'));
    await new Promise<void>((resolve, reject) => {
      server = app.listen(0, '127.0.0.1', error => (error ? reject(error) : resolve()));
    });
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Expected TCP listener');
    origin = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close(error => (error ? reject(error) : resolve()));
      server.closeAllConnections();
    });
    await rm(directory, { recursive: true, force: true });
  });

  it.each(['identity', 'br', 'gzip'])(
    'serves immutable modules with %s encoding',
    async encoding => {
      const response = await fetch(`${origin}/chunk-ABCDEFGH.js`, {
        headers: { 'Accept-Encoding': encoding },
      });
      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toMatch(/javascript/);
      expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable');
      expect(response.headers.get('Content-Encoding')).toBe(
        encoding === 'identity' ? null : encoding
      );
      expect(await response.text()).toBe(source);
    }
  );

  it.each([
    '/chunk-MISSING1.js',
    '/chunk-MISSING1.js?retry=1',
    '/styles-MISSING1.css',
    '/assets/config-missing.json',
    '/media/missing.woff2',
  ])('returns an uncached 404 for %s', async path => {
    const response = await fetch(`${origin}${path}`);
    expect(response.status).toBe(404);
    expect(response.headers.get('Content-Type')).toMatch(/text\/plain/);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(response.headers.get('X-Accel-Expires')).toBe('0');
    expect(await response.text()).toBe('Not found');
  });

  it('returns an uncached empty HEAD response for missing modules', async () => {
    const response = await fetch(`${origin}/chunk-MISSING1.js`, { method: 'HEAD' });
    expect(response.status).toBe(404);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(await response.text()).toBe('');
  });

  it.each(['/assets/config.json', '/index.html'])(
    'revalidates mutable assets at %s',
    async path => {
      const response = await fetch(`${origin}${path}`);
      expect(response.status).toBe(200);
      expect(response.headers.get('Cache-Control')).toBe('no-cache');
    }
  );

  it('caches hashed media', async () => {
    const response = await fetch(`${origin}/media/font-ABCDEFGH.woff2`);
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable');
  });

  it.each(['/', '/home', '/builder'])('preserves SSR routing for %s', async path => {
    const response = await fetch(`${origin}${path}`);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('<html>SSR fallback</html>');
  });
});
