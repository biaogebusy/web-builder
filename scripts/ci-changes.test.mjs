import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import {
  hasApplicationChanges,
  requiresApplicationChecks,
} from './ci-changes.mjs';

test('only known repository documentation can skip application checks', () => {
  const workflow = readFileSync(new URL('../.github/workflows/master.yml', import.meta.url), 'utf8');
  const ignoredPaths = workflow.match(/    paths-ignore:\n((?:      - .+\n)+)/)[1]
    .trim().split('\n').map(line => line.trim().slice(2));
  assert.deepEqual(ignoredPaths, ['README.md', 'AGENTS.md', 'CLAUDE.md', 'docs/README.md']);
  assert.equal(requiresApplicationChecks(ignoredPaths), false);
  assert.equal(requiresApplicationChecks(['README.md', 'AGENTS.md', 'CLAUDE.md', 'docs/README.md']),
    false);
  for (const path of [
    'src/app/example.ts', 'src/assets/prompt.md', 'package-lock.json', 'angular.json',
    'tsconfig.spec.json', 'vitest.config.ts', '.github/workflows/test.yml',
    'scripts/ci-changes.mjs', 'docs/example.ts', 'new-file.md', 'README.md\nsource.ts',
  ]) {
    assert.equal(requiresApplicationChecks(['README.md', path]), true, path);
  }
});

test('deployment compares complete trees across documentation commits, changes and renames', () => {
  const root = mkdtempSync(join(tmpdir(), 'xinshi-ci-changes-'));
  const previousDirectory = process.cwd();
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  const commit = () => {
    git('add', '.');
    git('-c', 'user.name=CI fixture', '-c', 'user.email=ci@example.test',
      '-c', 'core.hooksPath=/dev/null', '-c', 'commit.gpgSign=false', 'commit', '-qm', 'fixture');
    return git('rev-parse', 'HEAD');
  };
  try {
    git('init', '-q');
    mkdirSync(join(root, 'src'));
    writeFileSync(join(root, 'src/app.ts'), 'initial code');
    const built = commit();
    process.chdir(root);
    assert.equal(hasApplicationChanges(built, built), false);
    writeFileSync(join(root, 'README.md'), 'documentation');
    const documentation = commit();
    assert.equal(hasApplicationChanges(built, documentation), false);
    writeFileSync(join(root, 'src/app.ts'), 'new code');
    const changed = commit();
    assert.equal(hasApplicationChanges(built, changed), true);
    git('mv', 'src/app.ts', 'AGENTS.md');
    const renamed = commit();
    assert.equal(hasApplicationChanges(changed, renamed), true);
    assert.throws(() => hasApplicationChanges(built, 'missing-revision'));
  } finally {
    process.chdir(previousDirectory);
    rmSync(root, { recursive: true, force: true });
  }
});
