import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

test('API proxy caches only anonymous public responses', t => {
  const image = process.env.API_CACHE_TEST_IMAGE;
  assert.ok(image, 'Set API_CACHE_TEST_IMAGE to a local Nginx/PHP 8.3 image');
  const directory = mkdtempSync(join(tmpdir(), 'api-cache-'));
  const container = `api-cache-${process.pid}`;
  const docker = (...args) => execFileSync('docker', args, {
    encoding: 'utf8', timeout: 30000, stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
  t.after(() => {
    try { docker('rm', '-f', container); }
    finally { rmSync(directory, { recursive: true, force: true }); }
  });
  writeFileSync(join(directory, 'prod.conf'),
    readFileSync(new URL('../deploy/prod.conf', import.meta.url), 'utf8')
      .replace(/proxy_pass http:\/\/127\.0\.0\.1:\d+;/g, 'proxy_pass http://127.0.0.1:8080;'));
  writeFileSync(join(directory, 'nginx.conf'), `
user root;
pid /tmp/cache-test.pid;
error_log /tmp/cache-test.log;
events { worker_connections 128; }
http {
  access_log off;
  proxy_cache_path /tmp/cache-test keys_zone=proxy_cache_panel:1m;
  limit_conn_zone $binary_remote_addr zone=perip:1m;
  limit_conn_zone $server_name zone=perserver:1m;
  limit_req_zone $binary_remote_addr zone=auth_login:1m rate=5r/m;
  map $http_upgrade $connection_upgrade { default upgrade; '' close; }
  server {
    listen 127.0.0.1:8080;
    add_header X-Origin-Request $request_id always;
    add_header X-Origin-Cookie $http_cookie always;
    add_header X-Origin-Authorization $http_authorization always;
    location /api/private {
      add_header Cache-Control 'private, no-store' always;
      return 200 'private';
    }
    location /api/session {
      add_header Set-Cookie 'session=fixture; HttpOnly' always;
      return 200 'session';
    }
    location / { return 200 'public'; }
  }
  server {
    listen 127.0.0.1:8088;
    include /checks/prod.conf;
  }
}
`);
  writeFileSync(join(directory, 'request.php'), `<?php
$options = ['http' => ['timeout' => 5, 'ignore_errors' => TRUE,
  'header' => json_decode($argv[2], TRUE)]];
file_get_contents('http://127.0.0.1:8088' . $argv[1], FALSE, stream_context_create($options));
echo json_encode($http_response_header);
`);
  docker('run', '--detach', '--rm', '--network', 'none', '--user', '0',
    '--name', container, '--entrypoint', 'sleep', image, '180');
  docker('cp', `${directory}/.`, `${container}:/checks`);
  docker('exec', container, 'nginx', '-t', '-c', '/checks/nginx.conf');
  docker('exec', container, 'nginx', '-c', '/checks/nginx.conf');
  const request = (path, headers = []) => {
    const lines = JSON.parse(docker('exec', container, 'php83', '/checks/request.php',
      path, JSON.stringify(headers)));
    assert.match(lines[0], / 200 /);
    return Object.fromEntries(lines.slice(1).map(line => {
      const colon = line.indexOf(':');
      return [line.slice(0, colon).toLowerCase(), line.slice(colon + 1).trim()];
    }));
  };
  for (const path of ['/api/public', '/en/api/public', '/zh-hans/api/public']) {
    const anonymous = request(path);
    assert.equal(request(path)['x-proxy-cache'], 'HIT');
    for (const headers of [['Authorization: Bearer first'], ['Authorization: Bearer second'],
      ['Cookie: SSESSfixture=logged-in'], ['Cache-Control: no-cache, no-store']]) {
      const first = request(path, headers);
      const second = request(path, headers);
      assert.equal(first['x-proxy-cache'], 'BYPASS');
      assert.notEqual(first['x-origin-request'], anonymous['x-origin-request']);
      assert.notEqual(first['x-origin-request'], second['x-origin-request']);
      if (headers[0].startsWith('Authorization:')) {
        assert.equal(first['x-origin-authorization'], headers[0].slice(15));
        assert.match(first['cache-control'], /no-store/);
      }
      if (headers[0].startsWith('Cookie:')) {
        assert.equal(first['x-origin-cookie'], 'SSESSfixture=logged-in');
        assert.match(first['cache-control'], /no-store/);
      }
    }
    assert.equal(request(path)['x-origin-request'], anonymous['x-origin-request']);
  }
  for (const path of ['/api/private', '/api/session']) {
    request(path);
    const second = request(path);
    assert.equal(second['x-proxy-cache'], 'MISS');
    if (path.endsWith('session')) assert.equal(second['set-cookie'], 'session=fixture; HttpOnly');
  }
});
