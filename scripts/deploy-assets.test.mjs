import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  chmodSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readlinkSync,
  rmSync,
  statSync,
  symlinkSync,
  utimesSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';

const workflow = readFileSync(new URL('../.github/workflows/master.yml', import.meta.url), 'utf8');
const uploads = workflow
  .split(/\n      - name:/)
  .filter(step => step.includes('AEnterprise/rsync-deploy'));

test('deployment preserves old imports using the Action source-directory semantics', () => {
  const root = mkdtempSync(join(tmpdir(), 'xinshi-deploy-'));
  const source = join(root, 'source');
  const downloaded = join(root, 'downloaded');
  const target = join(root, 'target');
  const write = (base, path, value) => {
    const file = join(base, path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, value);
    if (base === target) utimesSync(file, new Date(0), new Date(0));
    return file;
  };
  const read = path => readFileSync(join(target, path), 'utf8');
  try {
    const retained = [
      'dist/browser/chunk-AAAAAAAA.js',
      'dist/browser/chunk-AAAAAAAA.js.br',
      'dist/browser/chunk-AAAAAAAA.js.gz',
      'dist/browser/main-AAAAAAAA.js',
      'dist/browser/polyfills-AAAAAAAA.js',
      'dist/browser/styles-AAAAAAAA.css',
      'dist/browser/media/font-AAAAAAAA.woff2',
      'dist/server/chunk-AAAAAAAA.mjs',
    ];
    for (const path of retained) {
      const file = write(target, path, 'old build');
      utimesSync(file, new Date(0), new Date(0));
    }
    write(target, 'logs/spans.db', 'persistent data');
    write(target, 'dist/logs/spans.db', 'persistent data');
    write(target, 'dist/browser/assets/i18n/en.json', 'old translation');
    write(target, 'dist/browser/assets/removed.json', 'removed asset');
    write(target, 'dist/server/server.mjs', 'old server');
    write(source, 'dist/server/server.mjs', 'new server');
    write(source, 'dist/server/chunk-BBBBBBBB.mjs', 'new server import');
    write(source, 'dist/server/node_modules/runtime/index.js', 'runtime dependency');
    const executable = write(source, 'dist/server/runtime-tool', 'runtime executable');
    chmodSync(executable, 0o755);
    symlinkSync('runtime-tool', join(source, 'dist/server/runtime-link'));
    write(source, 'dist/server/.runtime-config', 'hidden runtime file');
    write(source, 'dist/browser/chunk-BBBBBBBB.js', 'new build');
    write(source, 'dist/browser/assets/i18n/en.json', 'new translation');
    const current = write(source, 'dist/browser/chunk-CCCCCCCC.js', 'unchanged current build');
    utimesSync(current, new Date(0), new Date(0));

    const archiveCommand = workflow.match(/run: (tar -czf [^\n]+)/)[1].split(/\s+/);
    const extractCommand = workflow.match(/run: (tar -xzf [^\n]+)/)[1].split(/\s+/);
    execFileSync(archiveCommand[0], archiveCommand.slice(1), { cwd: source });
    mkdirSync(downloaded);
    // Artifact transport only needs to preserve the archive's bytes.
    writeFileSync(join(downloaded, 'dist.tar.gz'), readFileSync(join(source, 'dist.tar.gz')));
    execFileSync(extractCommand[0], extractCommand.slice(1), { cwd: downloaded });

    for (const step of uploads) {
      const args = step.match(/^\s+ARGS: (.+)$/m)[1].split(/\s+/);
      const folder = step.match(/^\s+FOLDER: "([^"]+)"$/m)[1];
      const destination = step.match(/^\s+SERVER_DESTINATION: "([^"]+)"$/m)[1];
      const suffix = destination.includes('${{ env.DEPLOY_ROOT }}')
        ? destination.split('${{ env.DEPLOY_ROOT }}')[1]
        : '';
      // The Action passes FOLDER verbatim, including the absence of a trailing slash.
      execFileSync('rsync', [...args, join(downloaded, folder), `${target}${suffix}`]);
      if (folder === 'dist/browser') {
        assert.equal(read('dist/server/server.mjs'), 'old server');
        assert.equal(read('dist/browser/chunk-BBBBBBBB.js'), 'new build');
      }
    }
    for (const path of retained) assert.equal(read(path), 'old build', path);
    assert.equal(read('dist/browser/chunk-BBBBBBBB.js'), 'new build');
    assert.equal(read('dist/browser/chunk-CCCCCCCC.js'), 'unchanged current build');
    assert.equal(read('dist/browser/assets/i18n/en.json'), 'new translation');
    assert.equal(existsSync(join(target, 'dist/browser/assets/removed.json')), false);
    assert.equal(read('dist/server/server.mjs'), 'new server');
    assert.equal(read('dist/server/.runtime-config'), 'hidden runtime file');
    assert.equal(statSync(join(target, 'dist/server/runtime-tool')).mode & 0o777, 0o755);
    assert.equal(readlinkSync(join(target, 'dist/server/runtime-link')), 'runtime-tool');
    assert.equal(read('logs/spans.db'), 'persistent data');
    assert.equal(read('dist/logs/spans.db'), 'persistent data');
    if (!uploads.at(-1).includes('--exclude=node_modules')) {
      assert.equal(read('dist/server/node_modules/runtime/index.js'), 'runtime dependency');
    }
    assert.equal(uploads.length, 2, 'publish browser assets before replacing the server');
    assert.doesNotMatch(workflow, /-mmin|\bfind\b.*-delete/);
    const [build, deploy] = workflow.split('\n  deploy:\n');
    assert.doesNotMatch(workflow, /^concurrency:/m, 'build cancellation must not cancel deployment');
    assert.match(build, /cancel-in-progress: true/);
    assert.match(deploy, /needs: build/);
    assert.match(deploy, /cancel-in-progress: false/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
