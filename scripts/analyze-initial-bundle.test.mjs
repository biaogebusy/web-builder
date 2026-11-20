import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const script = fileURLToPath(new URL('./analyze-initial-bundle.mjs', import.meta.url));
const builder = 'src/app/modules/builder/preview/page-preview.component.ts';
const html = '<script src="main.js"></script>';
const fixture = () => ({
  inputs: { 'src/main.ts': { imports: [] } },
  outputs: {
    'main.js': { bytes: 100, inputs: { 'src/main.ts': { bytesInOutput: 100 } }, imports: [
      { path: 'feature.js', kind: 'dynamic-import' },
    ] },
    'feature.js': { bytes: 50, inputs: { [builder]: { bytesInOutput: 50 } }, imports: [] },
  },
});

function run(meta, entry = html, check = true, targets = []) {
  const root = mkdtempSync(join(tmpdir(), 'initial-bundle-test-'));
  const dist = join(root, 'dist/performance');
  try {
    mkdirSync(join(dist, 'browser'), { recursive: true });
    writeFileSync(join(dist, 'stats.json'), JSON.stringify(meta));
    writeFileSync(join(dist, 'browser/index.csr.html'), entry);
    const args = [script, ...(check ? ['--check'] : []), ...(targets.length ? [dist, ...targets] : [])];
    return spawnSync(process.execPath, args, {
      cwd: root, encoding: 'utf8', timeout: 10_000,
    });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test('accepts a lazy Builder entry without counting its bytes as initial JS', () => {
  const result = run(fixture());
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /initial chunks: 1/);
  assert.match(result.stdout, /Public initial JS boundary passed/);
});

test('rejects Builder code reached through shared static and CommonJS chunks', () => {
  for (const kind of ['import-statement', 'require-call']) {
    const meta = fixture();
    meta.outputs['main.js'].imports = [{ path: 'shared.js', kind }];
    meta.outputs['shared.js'] = { bytes: 10, inputs: {}, imports: [
      { path: 'feature.js', kind: 'import-statement' },
      { path: 'main.js', kind: 'import-statement' },
    ] };
    const result = run(meta);
    assert.equal(result.status, 1);
    assert.ok(result.stderr.includes(`Forbidden initial input: ${builder}`));
  }
});

test('rejects each editor runtime in an initial shared chunk', () => {
  for (const input of [
    'node_modules/@tiptap/core/dist/index.js',
    'node_modules/prosemirror-view/dist/index.js',
    '/workspace/node_modules/monaco-editor/esm/vs/editor/editor.api.js',
    'C:\\workspace\\node_modules\\jsoneditor\\dist\\jsoneditor.js',
  ]) {
    const meta = fixture();
    meta.outputs['main.js'].inputs[input] = { bytesInOutput: 10 };
    const result = run(meta);
    assert.equal(result.status, 1);
    assert.ok(result.stderr.includes(input));
  }
});

test('accepts removed inputs, unrelated package names and unreachable server outputs', () => {
  const meta = fixture();
  meta.outputs['main.js'].inputs[builder] = { bytesInOutput: 0 };
  meta.outputs['main.js'].inputs['node_modules/not-monaco-editor/index.js'] = { bytesInOutput: 5 };
  meta.outputs['server/main.js'] = meta.outputs['feature.js'];
  const result = run(meta);
  assert.equal(result.status, 0, result.stderr);
});

test('supports browser-prefixed metadata and module preload entries', () => {
  const meta = fixture();
  meta.outputs = Object.fromEntries(Object.entries(meta.outputs)
    .map(([name, output]) => [`browser/${name}`, output]));
  const result = run(meta, "<script src='./main.js'></script><link href='browser/feature.js'>");
  assert.equal(result.status, 1);
  assert.ok(result.stderr.includes(builder));
});

test('rejects missing entry scripts and missing static chunks instead of passing an empty check', () => {
  for (const missing of ['main.js', 'feature.js']) {
    const meta = fixture();
    meta.outputs['main.js'].imports[0].kind = 'import-statement';
    delete meta.outputs[missing];
    const result = run(meta);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /missing/);
  }
  assert.notEqual(run(fixture(), '<html></html>').status, 0);
});

test('keeps the original analysis command advisory', () => {
  const meta = fixture();
  meta.outputs['main.js'].imports[0].kind = 'import-statement';
  const result = run(meta, html, false);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /initial chunks: 2/);
  assert.doesNotMatch(result.stdout, /boundary passed/);
});

test('reports the requested input and its CommonJS importer for an explicit build directory', () => {
  const meta = fixture();
  meta.outputs['main.js'].imports[0].kind = 'require-call';
  meta.inputs['src/main.ts'].imports.push({ path: builder, kind: 'require-call' });
  meta.inputs[builder] = { imports: [] };
  const result = run(meta, html, false, [builder]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /<- src\/main.ts/);
  assert.match(result.stdout, /in eager bundle: true/);
});
