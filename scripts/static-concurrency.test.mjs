import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { once } from 'node:events';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { connect } from 'node:http2';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

test('HTTP/2 static bursts have a bounded budget separate from business requests',
  { timeout: 120_000 }, async t => {
    const image = process.env.NGINX_TEST_IMAGE;
    assert.ok(image, 'Set NGINX_TEST_IMAGE to a local Nginx image with OpenSSL');
    const directory = mkdtempSync(join(tmpdir(), 'static-concurrency-'));
    const container = `static-concurrency-${process.pid}`;
    const pending = new Set();
    const sessions = [];
    const docker = (...args) => execFileSync('docker', args, {
      encoding: 'utf8', timeout: 30_000, stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
    const origin = createServer((_request, response) => {
      response.writeHead(200, { 'Content-Type': 'application/javascript',
        'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' });
      response.write('// held response\n');
      pending.add(response);
      response.on('close', () => pending.delete(response));
    });
    t.after(async () => {
      for (const response of pending) response.end();
      for (const session of sessions) session.destroy();
      origin.closeAllConnections();
      await new Promise(resolve => origin.close(resolve));
      try {
        const failures = docker('exec', container, 'cat', '/tmp/static-test.log').split('\n')
          .filter(line => line.includes('[error]') && line.includes('upstream'));
        if (failures.length) t.diagnostic(failures.join('\n'));
      } finally {
        try { docker('rm', '-f', container); }
        finally { rmSync(directory, { recursive: true, force: true }); }
      }
    });
    origin.listen(0, '0.0.0.0');
    await once(origin, 'listening');
    const port = origin.address().port;
    writeFileSync(join(directory, 'prod.conf'),
      readFileSync(new URL('../deploy/prod.conf', import.meta.url), 'utf8')
        .replace(/proxy_pass http:\/\/127\.0\.0\.1:\d+;/g,
          `proxy_pass http://host.docker.internal:${port};`));
    writeFileSync(join(directory, 'maps.conf'),
      readFileSync(new URL('../deploy/nginx-api-cache-maps.conf', import.meta.url), 'utf8'));
    const zones = readFileSync(new URL('../deploy/nginx-global-1panel.conf', import.meta.url),
      'utf8').match(/^\s*limit_conn_zone .+$/gm).join('\n');
    writeFileSync(join(directory, 'nginx.conf'), `
user root;
pid /tmp/static-test.pid;
error_log /tmp/static-test.log;
events { worker_connections 4096; }
http {
  access_log off;
  proxy_cache_path /tmp/static-cache keys_zone=proxy_cache_panel:1m;
  ${zones}
  limit_req_zone $binary_remote_addr zone=auth_login:1m rate=5r/m;
  map $http_upgrade $connection_upgrade { default upgrade; '' close; }
  include /checks/maps.conf;
  ssl_certificate /checks/cert.pem;
  ssl_certificate_key /checks/key.pem;
  # Exercise the request cap on one TCP connection instead of the stream setting.
  http2_max_concurrent_streams 512;
  ${['first.test', 'second.test'].map(name => `server {
    listen 8443 ssl http2;
    server_name ${name};
    include /checks/prod.conf;
  }`).join('\n')}
}
`);
    docker('run', '--detach', '--rm', '--user', '0', '--name', container,
      '--add-host', 'host.docker.internal:host-gateway', '-p', '127.0.0.1::8443',
      '--entrypoint', 'sleep', image, '180');
    docker('cp', `${directory}/.`, `${container}:/checks`);
    docker('exec', container, 'openssl', 'req', '-x509', '-newkey', 'rsa:2048', '-nodes',
      '-keyout', '/checks/key.pem', '-out', '/checks/cert.pem', '-days', '1', '-subj', '/CN=first.test');
    docker('exec', container, 'nginx', '-t', '-c', '/checks/nginx.conf');
    docker('exec', container, 'nginx', '-c', '/checks/nginx.conf');
    const address = docker('port', container, '8443/tcp');
    const connection = connect(`https://${address}`, { rejectUnauthorized: false });
    sessions.push(connection);
    await once(connection, 'remoteSettings');
    let sequence = 0;
    const request = (prefix, host = 'first.test') => {
      const stream = connection.request({ ':path': `${prefix}${sequence++}.js`, ':authority': host });
      const done = once(stream, 'end');
      stream.resume();
      stream.end();
      return { status: once(stream, 'response').then(([headers]) => headers[':status']), done };
    };
    const burst = (count, prefix = '/assets/burst-', host) =>
      Array.from({ length: count }, () => request(prefix, host));
    const expectStatus = async (requests, status) =>
      assert.deepEqual(await Promise.all(requests.map(item => item.status)),
        requests.map(() => status));
    const release = async requests => {
      for (const response of pending) response.end('// complete\n');
      await Promise.all(requests.map(item => item.done));
    };

    await t.test('serves 128 simultaneous asset streams without a 503', async () => {
      const requests = burst(128);
      try { await expectStatus(requests, 200); }
      finally { await release(requests); }
    });
    await t.test('rejects only excess static requests and isolates virtual hosts', async () => {
      const requests = burst(256);
      try {
        await expectStatus(requests, 200);
        const excess = burst(4);
        requests.push(...excess);
        await expectStatus(excess, 429);
        const otherSite = burst(64, '/assets/other-', 'second.test');
        requests.push(...otherSite);
        await expectStatus(otherSite, 200);
      } finally { await release(requests); }
    });
    await t.test('preserves the business request cap during a static burst', async () => {
      const requests = burst(64);
      try {
        await expectStatus(requests, 200);
        const business = burst(50, '/api/fixture/');
        requests.push(...business);
        await expectStatus(business, 200);
        const excess = burst(1, '/api/fixture/');
        requests.push(...excess);
        await expectStatus(excess, 503);
      } finally { await release(requests); }
    });
  });
