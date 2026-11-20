import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const script = resolve(root, 'scripts/generate-theme.mjs');
const require = createRequire(import.meta.url);
require('ts-node').register({
  skipProject: true,
  transpileOnly: true,
  compilerOptions: { module: 'CommonJS', moduleResolution: 'node' },
});
const { generateThemeVars } = require('../src/app/core/util/theme-palette.util.ts');

const run = (...args) => spawnSync(process.execPath, [script, ...args], {
  cwd: tmpdir(),
  encoding: 'utf8',
});

async function temporaryDirectory(t) {
  const directory = await mkdtemp(join(tmpdir(), 'xinshi-theme-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

test('both modes compile to the same 49 color tokens as the application for every variant', async t => {
  const directory = await temporaryDirectory(t);
  for (const variant of ['content', 'tonalSpot', 'vibrant']) {
    const output = join(directory, variant);
    const result = run('--name', 'forest-green', '--seed', '#16a34a',
      '--variant', variant, '--directory', output);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual((await readdir(output)).sort(), ['_dark-colors.scss', '_light-colors.scss']);
    for (const mode of ['light', 'dark']) {
      const { css } = sass.compile(join(output, `_${mode}-colors.scss`), {
        loadPaths: [resolve(root, 'node_modules')],
      });
      const expected = generateThemeVars('#16a34a', mode === 'dark', variant);
      assert.equal(Object.keys(expected).length, 49);
      assert(css.includes(`.theme-forest-green.${mode}-theme {`));
      assert(css.includes(`color-scheme: ${mode};`));
      const actual = Object.fromEntries(
        [...css.matchAll(/(--mat-sys-[\w-]+):\s*([^;]+);/g)].map(([, key, value]) => [key, value])
      );
      for (const [key, value] of Object.entries(expected)) {
        assert.equal(actual[key], value, `${variant}/${mode}/${key}`);
      }
    }
  }
});

test('invalid options fail without creating output files', async t => {
  const directory = join(await temporaryDirectory(t), 'output');
  const valid = ['--name', 'green', '--seed', '#16a34a', '--directory', directory];
  for (const args of [
    [],
    ['--name', 'green'],
    [...valid, '--seed', '#gggggg'],
    [...valid, '--seed', '#123'],
    [...valid, '--name', '../escape'],
    [...valid, '--variant', 'unknown'],
    [...valid, '--mode', 'auto'],
    [...valid, '--unknown'],
  ]) {
    const result = run(...args);
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, /theme:generate:/);
    assert.equal(existsSync(directory), false);
  }
});

test('dry-run prints the selected mode without creating its output directory', async t => {
  const directory = join(await temporaryDirectory(t), 'output');
  const result = run('--name', 'green', '--seed', '#16a34a', '--mode', 'dark',
    '--directory', directory, '--dry-run');
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /\.theme-green\.dark-theme/);
  assert.doesNotMatch(result.stdout, /\.light-theme/);
  assert.equal(existsSync(directory), false);
});

test('existing output blocks all writes; force replaces it and mode limits the output', async t => {
  const directory = await temporaryDirectory(t);
  const dark = join(directory, '_dark-colors.scss');
  const light = join(directory, '_light-colors.scss');
  await writeFile(dark, '// Keep this palette.\n');
  const args = ['--name', 'green', '--seed', '#16a34a', '--directory', directory];
  const blocked = run(...args);
  assert.equal(blocked.status, 1);
  assert.match(blocked.stderr, /already exists/);
  assert.equal(await readFile(dark, 'utf8'), '// Keep this palette.\n');
  assert.equal(existsSync(light), false);

  const forced = run(...args, '--force', '--mode', 'dark');
  assert.equal(forced.status, 0, forced.stderr);
  assert.match(await readFile(dark, 'utf8'), /\.theme-green\.dark-theme/);
  assert.equal(existsSync(light), false);
});

test('help works without required options', () => {
  const result = run('--help');
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Usage: npm run theme:generate/);
});
