import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import test from 'node:test';

function install(errors) {
  const root = mkdtempSync(join(tmpdir(), 'xinshi-ci-install-'));
  try {
    writeFileSync(join(root, 'package-lock.json'), 'fixture lock');
    writeFileSync(join(root, 'npm'), `#!/usr/bin/env node
const fs = require('node:fs');
const calls = fs.existsSync('calls.json') ? JSON.parse(fs.readFileSync('calls.json')) : [];
calls.push(process.argv.slice(2));
fs.writeFileSync('calls.json', JSON.stringify(calls));
const error = JSON.parse(process.env.INSTALL_ERRORS)[calls.length - 1];
if (error) { console.error(error); process.exit(42); }
console.log('installed');
`, { mode: 0o700 });
    writeFileSync(join(root, 'sleep'), '#!/bin/sh\nprintf "%s\\n" "$1" >> delays\n',
      { mode: 0o700 });
    const result = spawnSync('bash', [new URL('./ci-install.sh', import.meta.url).pathname], {
      cwd: root,
      env: { ...process.env, PATH: root + delimiter + process.env.PATH,
        INSTALL_ERRORS: JSON.stringify(errors) },
      encoding: 'utf8',
      timeout: 10_000,
    });
    assert.ifError(result.error);
    assert.equal(readFileSync(join(root, 'package-lock.json'), 'utf8'), 'fixture lock');
    return { ...result, calls: JSON.parse(readFileSync(join(root, 'calls.json'), 'utf8')),
      delays: result.stdout.includes('Retrying') ? readFileSync(join(root, 'delays'), 'utf8') : '' };
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test('a successful install uses the lock and cache without another attempt', () => {
  const result = install([]);
  assert.equal(result.status, 0);
  assert.deepEqual(result.calls, [['ci', '--prefer-offline', '--no-audit', '--no-fund',
    '--fetch-retries=3']]);
  assert.equal(result.delays, '');
});

for (const code of ['ECONNRESET', 'ETIMEDOUT', 'EAI_AGAIN', 'ENETUNREACH', 'ECONNREFUSED']) {
  test(`a transient ${code} failure preserves output and retries successfully`, () => {
    const result = install([`npm error code ${code}\nnpm error network response aborted`]);
    assert.equal(result.status, 0);
    assert.equal(result.calls.length, 2);
    assert.equal(result.delays, '10\n');
    assert.match(result.stdout, /response aborted/);
    assert.match(result.stdout, /installed/);
  });
}

test('repeated network failure stops after three attempts and preserves the exit status', () => {
  const result = install(Array(3).fill('npm ERR! code ECONNRESET'));
  assert.equal(result.status, 42);
  assert.equal(result.calls.length, 3);
  assert.equal(result.delays, '10\n20\n');
});

for (const error of ['npm error code EUSAGE', 'npm error code E401',
  'npm error code 1\npostinstall failed with ECONNRESET']) {
  test(`a non-network install failure is not retried: ${error.split('\n')[0]}`, () => {
    const result = install([error]);
    assert.equal(result.status, 42);
    assert.equal(result.calls.length, 1);
    assert.equal(result.delays, '');
  });
}
