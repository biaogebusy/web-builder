import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { checkTestAssets, testAssetPath } from './test-assets.cjs';

function fixture(t) {
  const root = realpathSync(mkdtempSync(join(tmpdir(), 'xinshi-assets-')));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, 'data'));
  writeFileSync(join(root, 'data/sample.json'), '{"synthetic":true}');
  const asset = {
    id: 'sample',
    path: 'data/sample.json',
    sha256: createHash('sha256').update('{"synthetic":true}').digest('hex'),
  };
  const put = value => writeFileSync(join(root, 'registry.json'), JSON.stringify(value));
  put({ version: 1, assets: [asset] });
  return { root, asset, put };
}

test('shares verified fixed inputs and pins an immutable corpus', t => {
  const f = fixture(t);
  assert.equal(
    testAssetPath('sample', { root: f.root, sha256: f.asset.sha256 }),
    join(f.root, f.asset.path)
  );
  assert.deepEqual(checkTestAssets({ root: f.root }), [
    { ...f.asset, path: join(f.root, f.asset.path) },
  ]);
  assert.throws(
    () => testAssetPath('sample', { root: f.root, sha256: 'a'.repeat(64) }),
    /version changed/
  );
  assert.throws(() => testAssetPath('unknown', { root: f.root }), /Unknown/);
});

test('rejects changed, missing and non-file inputs', t => {
  const f = fixture(t);
  writeFileSync(join(f.root, f.asset.path), 'changed');
  assert.throws(() => checkTestAssets({ root: f.root }), /SHA256 mismatch/);
  rmSync(join(f.root, f.asset.path));
  assert.throws(() => checkTestAssets({ root: f.root }), /ENOENT/);
  mkdirSync(join(f.root, f.asset.path));
  assert.throws(() => checkTestAssets({ root: f.root }), /regular file/);
});

test('rejects invalid registries, duplicates and escaping paths', t => {
  const f = fixture(t);
  for (const value of [
    { version: 2, assets: [f.asset] },
    { version: 1, assets: [] },
    { version: 1, assets: [f.asset, f.asset] },
    ...['../outside', '/tmp/data', 'data/../sample', 'data\\sample'].map(path => ({
      version: 1,
      assets: [{ ...f.asset, path }],
    })),
    { version: 1, assets: [{ ...f.asset, sha256: 'invalid' }] },
  ]) {
    f.put(value);
    assert.throws(() => checkTestAssets({ root: f.root }), /Invalid/);
  }
});

test('rejects a symlink to an outside file even with a matching digest', t => {
  const f = fixture(t);
  const outside = mkdtempSync(join(tmpdir(), 'xinshi-assets-outside-'));
  t.after(() => rmSync(outside, { recursive: true, force: true }));
  writeFileSync(join(outside, 'sample.json'), '{"synthetic":true}');
  rmSync(join(f.root, f.asset.path));
  symlinkSync(join(outside, 'sample.json'), join(f.root, f.asset.path));
  assert.throws(() => checkTestAssets({ root: f.root }), /regular file/);
});
