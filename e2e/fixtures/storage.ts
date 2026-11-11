import { readFileSync } from 'node:fs';

/** Resolves storage keys from the application configuration used by this checkout. */
export function storageKey(key: string): string {
  const separator = readFileSync('src/app/app.config.ts', 'utf8')
    .match(/withNgxWebstorageConfig\(\{\s*separator:\s*['"]([^'"]+)['"]/)?.[1];
  if (!separator) throw new Error('Missing storage separator in app configuration');
  return `ngx-webstorage${separator}${key}`;
}
