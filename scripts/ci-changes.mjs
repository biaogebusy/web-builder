import { execFileSync } from 'node:child_process';

// Keep this list aligned with the deployment workflow's paths-ignore entries.
const documentationPaths = new Set(['README.md', 'AGENTS.md', 'CLAUDE.md', 'docs/README.md']);

/** Require application checks for every path outside the documentation allowlist. */
export function requiresApplicationChecks(paths) {
  return paths.some(path => !documentationPaths.has(path));
}

/** Check every PR file, including rename sources; incomplete API results require checks. */
export function requiresPullRequestChecks(files, changedFiles) {
  if (!Number.isInteger(changedFiles) || files.length !== changedFiles) return true;
  return requiresApplicationChecks(files.flatMap(file =>
    [file.filename, file.previous_filename].filter(Boolean)));
}

/** Compare deployment trees without treating documentation-only commits as a new application. */
export function hasApplicationChanges(base, head) {
  const paths = execFileSync('git', ['diff', '--no-renames', '--name-only', '-z', base, head, '--'],
    { encoding: 'utf8' }).split('\0').filter(Boolean);
  return requiresApplicationChecks(paths);
}
