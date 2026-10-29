import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { setTimeout } from 'node:timers/promises';

test('API proxy requires explicit public caching and preserves refresh and privacy', async t => {
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
  writeFileSync(join(directory, 'api-cache-maps.conf'),
    readFileSync(new URL('../deploy/nginx-api-cache-maps.conf', import.meta.url), 'utf8'));
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
  include /checks/api-cache-maps.conf;
  map $arg_policy $fixture_cache_control {
    default '';
    allowed 'public, max-age=0, s-maxage=60';
    reordered 's-maxage=60, max-age=0, PUBLIC';
    private 'private, no-store';
    browser_only 'public, max-age=600';
    missing_public 's-maxage=60';
    zero 'public, max-age=600, s-maxage=0';
    invalid 'public, s-maxage=invalid';
    negative 'public, s-maxage=-1';
    lookalike 'not-public, s-maxage=60';
    private_field 'public, s-maxage=60, private="field"';
    no_store 'public, s-maxage=60, no-store';
    no_cache 'public, s-maxage=60, no-cache';
    session 'public, max-age=0, s-maxage=60';
    vary 'public, max-age=0, s-maxage=60';
    accel_zero 'public, max-age=0, s-maxage=60';
    expiring 'public, max-age=0, s-maxage=1';
  }
  map $arg_policy $fixture_cookie { default ''; session 'session=fixture; HttpOnly'; }
  map $arg_policy $fixture_accel { default ''; accel_zero 0; accel_only 60; }
  map $arg_policy $fixture_vary { default ''; vary 'Accept-Language'; }
  server {
    listen 127.0.0.1:8080;
    add_header X-Origin-Request $request_id always;
    add_header X-Origin-Cookie $http_cookie always;
    add_header X-Origin-Authorization $http_authorization always;
    add_header X-Origin-Language $http_accept_language always;
    add_header X-Origin-Method $request_method always;
    add_header Cache-Control $fixture_cache_control always;
    add_header Set-Cookie $fixture_cookie always;
    add_header X-Accel-Expires $fixture_accel always;
    add_header Vary $fixture_vary always;
    add_header Referrer-Policy no-referrer always;
    location = /api/expiring {
      if (-f /tmp/origin-unavailable) { return 500 'unavailable'; }
      return 200 'public';
    }
    ${[301, 302, 401, 403, 404, 500].map(status =>
      `location = /api/status/${status} { return ${status} 'status'; }`).join('\n')}
    location / { return 200 'response'; }
  }
  server {
    listen 127.0.0.1:8088;
    include /checks/prod.conf;
  }
  # Seed entries using the retired policy to verify the new namespace cannot reuse them.
  server {
    listen 127.0.0.1:8089;
    location / {
      proxy_pass http://127.0.0.1:8080;
      proxy_cache proxy_cache_panel;
      proxy_cache_key "drupal-api-v2:$host$uri$is_args$args";
      proxy_cache_valid 200 10m;
      add_header X-Proxy-Cache $upstream_cache_status always;
    }
  }
}
`);
  writeFileSync(join(directory, 'request.php'), `<?php
$options = ['http' => ['timeout' => 5, 'ignore_errors' => TRUE, 'follow_location' => 0,
  'method' => $argv[3], 'header' => json_decode($argv[2], TRUE)]];
file_get_contents($argv[1], FALSE, stream_context_create($options));
echo json_encode($http_response_header);
`);
  docker('run', '--detach', '--rm', '--network', 'none', '--user', '0',
    '--name', container, '--entrypoint', 'sleep', image, '300');
  docker('cp', `${directory}/.`, `${container}:/checks`);
  docker('exec', container, 'nginx', '-t', '-c', '/checks/nginx.conf');
  docker('exec', container, 'nginx', '-c', '/checks/nginx.conf');
  const request = (path, { headers = [], method = 'GET', port = 8088 } = {}) => {
    const lines = JSON.parse(docker('exec', container, 'php83', '/checks/request.php',
      `http://127.0.0.1:${port}${path}`, JSON.stringify(headers), method));
    const result = { status: Number(lines[0].split(' ')[1]) };
    for (const line of lines.slice(1)) {
      const colon = line.indexOf(':');
      const key = line.slice(0, colon).toLowerCase();
      const value = line.slice(colon + 1).trim();
      result[key] = result[key] ? `${result[key]}, ${value}` : value;
    }
    return result;
  };
  const privateResponse = response => {
    assert.equal(response['cache-control'], 'private, no-store');
    assert.ok(!response.expires, 'do not retain an inherited or origin browser expiry');
  };

  await t.test('undeclared responses cannot enter a shared or browser cache', () => {
    const path = '/api/new-endpoint';
    const first = request(path);
    const second = request(path);
    assert.equal(first.status, 200);
    assert.equal(second['x-proxy-cache'], 'MISS');
    assert.notEqual(first['x-origin-request'], second['x-origin-request']);
    privateResponse(second);
  });
  await t.test('public documents always reach the Node publication check', () => {
    const first = request('/public-page?policy=allowed');
    const second = request('/public-page?policy=allowed');
    assert.notEqual(first['x-origin-request'], second['x-origin-request']);
    assert.notEqual(second['x-proxy-cache'], 'HIT');
    const plainFirst = request('/public-page');
    const plainSecond = request('/public-page');
    assert.notEqual(plainFirst['x-origin-request'], plainSecond['x-origin-request']);
  });
  await t.test('only explicit public shared lifetimes are cached across language prefixes', () => {
    for (const prefix of ['', '/en', '/zh-hans', '/ja', '/pt-br']) {
      for (const policy of ['allowed', 'reordered']) {
        const path = `${prefix}/api/new-endpoint?policy=${policy}`;
        const first = request(path);
        const hit = request(path);
        assert.equal(hit['x-proxy-cache'], 'HIT', path);
        assert.equal(hit['x-origin-request'], first['x-origin-request']);
        assert.match(hit['cache-control'], /s-maxage=60/);
        assert.doesNotMatch(hit['cache-control'], /no-store/);
      }
    }
  });
  await t.test('identity and refresh requests bypass both cache reads and writes', () => {
    const path = '/api/refresh?policy=allowed';
    const original = request(path);
    assert.equal(request(path)['x-proxy-cache'], 'HIT');
    for (const headers of [
      ['Authorization: Bearer first'], ['Authorization: Bearer second'],
      ['Cookie: SSESSfixture=logged-in'], ['Cache-Control: no-cache'],
      ['Cache-Control: no-store'], ['Pragma: no-cache'], ['X-Boost-Fetch: 1'],
    ]) {
      const first = request(path, { headers });
      const second = request(path, { headers });
      assert.equal(first['x-proxy-cache'], 'BYPASS');
      assert.notEqual(first['x-origin-request'], original['x-origin-request']);
      assert.notEqual(first['x-origin-request'], second['x-origin-request']);
      privateResponse(second);
      if (headers[0].startsWith('Authorization:')) {
        assert.equal(first['x-origin-authorization'], headers[0].slice(15));
      }
      if (headers[0].startsWith('Cookie:')) {
        assert.equal(first['x-origin-cookie'], headers[0].slice(8));
      }
    }
    for (const flag of ['nocache=1', 'noCache=true', 'no_cache=1', 'preview=1', 'public=true']) {
      const url = `${path}&${flag}`;
      const first = request(url);
      const second = request(url);
      assert.equal(second['x-proxy-cache'], 'BYPASS');
      assert.notEqual(first['x-origin-request'], second['x-origin-request']);
      privateResponse(second);
    }
    assert.equal(request(path)['x-origin-request'], original['x-origin-request']);
  });
  await t.test('private, incomplete and forbidden origin policies never become public', () => {
    for (const policy of ['private', 'browser_only', 'missing_public', 'zero', 'invalid',
      'negative', 'lookalike', 'private_field', 'no_store', 'no_cache', 'session',
      'accel_zero', 'accel_only']) {
      const path = `/api/policy?policy=${policy}`;
      const first = request(path);
      const second = request(path);
      assert.equal(second['x-proxy-cache'], 'MISS', policy);
      assert.notEqual(first['x-origin-request'], second['x-origin-request'], policy);
      privateResponse(second);
      if (policy === 'session') assert.match(second['set-cookie'], /session=fixture/);
    }
  });
  await t.test('new private endpoint families do not require location exceptions', () => {
    for (const path of ['/api/new-private-family', '/ja/api/new-private-family',
      '/api/private-documents/shared/token/image.png', '/api/private-conversations']) {
      const url = `${path}?policy=private`;
      const first = request(url);
      const second = request(url);
      assert.notEqual(first['x-origin-request'], second['x-origin-request']);
      privateResponse(second);
      assert.equal(second['referrer-policy'], 'no-referrer');
    }
  });
  await t.test('errors and redirects are not cached even with public origin headers', () => {
    for (const status of [301, 302, 401, 403, 404, 500]) {
      const path = `/api/status/${status}?policy=allowed`;
      const first = request(path);
      const second = request(path);
      assert.equal(second.status, status);
      assert.notEqual(first['x-origin-request'], second['x-origin-request']);
      privateResponse(second);
    }
  });
  await t.test('HEAD can reuse public GETs while writes cannot reuse or replace them', () => {
    const path = '/api/methods?policy=allowed';
    const original = request(path);
    assert.equal(request(path, { method: 'HEAD' })['x-origin-request'], original['x-origin-request']);
    for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) {
      const first = request(path, { method });
      const second = request(path, { method });
      assert.equal(second['x-origin-method'], method);
      assert.notEqual(first['x-origin-request'], second['x-origin-request']);
      privateResponse(second);
    }
    assert.equal(request(path)['x-origin-request'], original['x-origin-request']);
  });
  await t.test('Vary and query values distinguish public representations', () => {
    const path = '/api/variants?policy=vary';
    const english = request(path, { headers: ['Accept-Language: en'] });
    const chinese = request(path, { headers: ['Accept-Language: zh-hans'] });
    assert.notEqual(english['x-origin-request'], chinese['x-origin-request']);
    assert.equal(request(path, { headers: ['Accept-Language: en'] })['x-origin-request'],
      english['x-origin-request']);
    const otherQuery = request(`${path}&page=2`, { headers: ['Accept-Language: en'] });
    assert.notEqual(english['x-origin-request'], otherQuery['x-origin-request']);
  });
  await t.test('the retired API namespace cannot supply a previously cached response', () => {
    const path = '/api/old-entry';
    const old = request(path, { port: 8089 });
    assert.equal(request(path, { port: 8089 })['x-proxy-cache'], 'HIT');
    const current = request(path);
    assert.notEqual(current['x-origin-request'], old['x-origin-request']);
    privateResponse(current);
  });
  await t.test('origin errors cannot extend an expired public API lifetime', async () => {
    const path = '/api/expiring?policy=expiring';
    request(path);
    assert.equal(request(path)['x-proxy-cache'], 'HIT');
    docker('exec', container, 'touch', '/tmp/origin-unavailable');
    await setTimeout(2100);
    const response = request(path);
    assert.equal(response.status, 500);
    privateResponse(response);
  });
});
