import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { before, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { mdiAccountFile, mdiAlphaABox, mdiGithub } from '@mdi/js';
import * as mdi from '@mdi/js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(root, 'node_modules/.cache/svg-icons');
const svg = name => readFile(resolve(target, `${name}.svg`), 'utf8');

before(() => {
  execFileSync(process.execPath, [resolve(root, 'scripts/split-svg-icons.mjs')]);
});

test('MDI names and SVGs use the same exact pinned version', async () => {
  const app = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
  const js = JSON.parse(await readFile(resolve(root, 'node_modules/@mdi/js/package.json'), 'utf8'));
  const icons = JSON.parse(await readFile(resolve(root, 'node_modules/@mdi/svg/package.json'), 'utf8'));
  assert.equal(js.version, icons.version);
  assert.equal(app.dependencies['@mdi/js'], js.version);
  assert.equal(app.dependencies['@mdi/svg'], icons.version);
});

test('every selectable icon has its own SVG asset', async () => {
  const names = JSON.parse(await readFile(resolve(target, 'names.json'), 'utf8'));
  const files = new Set(await readdir(target));

  assert(names.length > 7000);
  assert.equal(new Set(names).size, names.length);
  assert.deepEqual(names.filter(name => !files.has(`${name}.svg`)), []);
});

test('new MDI icons and legacy picker spellings resolve to their original paths', async () => {
  assert((await svg('account-file')).includes(`d="${mdiAccountFile}"`));
  assert((await svg('alpha-abox')).includes(`d="${mdiAlphaABox}"`));
  assert((await svg('alpha-a-box')).includes(`d="${mdiAlphaABox}"`));
});

test('all canonical names and legacy picker values use the matching paths', async () => {
  const custom = await readFile(resolve(root, 'src/assets/icons/icons.svg'), 'utf8');
  const overrides = new Set([...custom.matchAll(/<g id="([^"]+)">/g)].map(m => m[1]));
  const source = resolve(root, 'node_modules/@mdi/svg/svg');
  for (const file of await readdir(source)) {
    if (!file.endsWith('.svg') || overrides.has(file.slice(0, -4))) continue;
    assert.equal(await readFile(resolve(target, file), 'utf8'),
      await readFile(resolve(source, file), 'utf8'), file);
  }
  for (const key of Object.keys(mdi).filter(key => key.startsWith('mdi'))) {
    const name = key.slice(3).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    if (!overrides.has(name)) assert((await svg(name)).includes(`d="${mdi[key]}"`), name);
  }
});

test('custom overrides and canonical names remain available', async () => {
  const custom = await readFile(resolve(root, 'src/assets/icons/icons.svg'), 'utf8');
  for (const name of ['github', 'wechat', 'youtube', 'shape', 'wave', 'dark_mode']) {
    const source = custom.match(new RegExp(`<g id="${name}">([\\s\\S]*?)</g>`))[1];
    const output = await svg(name);
    for (const [, path] of source.matchAll(/<path[^>]*\sd="([^"]+)"/g)) {
      assert(output.includes(`d="${path}"`), `${name} must retain its custom path`);
    }
  }
  assert(!(await svg('github')).includes(`d="${mdiGithub}"`));
  assert((await svg('alpha-a-box')).includes('viewBox="0 0 24 24"'));
});
